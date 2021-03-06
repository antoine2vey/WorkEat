import axios from 'axios';
import * as io from 'socket.io-client';
import history from '../utils/history';

const socket = io.connect('http://localhost:3005');

export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_ORDER = 'GET_ORDER';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_CART = 'DELETE_CART';
export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
export const CHECKOUT_HANDSHAKE = 'CHECKOUT_HANDSHAKE';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

const addToCartUnsafe = (product, isBundle, index) => {
  // In any case, update cart to server.
  socket.emit('CART_UPDATE', { product });

  if (isBundle === true) {
    return {
      type: ADD_TO_CART,
      product,
      productType: 'bundle',
    };
  }

  // But if our product is not a bundle, connect stock to
  // streaming pipeline
  socket.emit('DECREMENT_QUANTITY', product._id);
  return {
    type: ADD_TO_CART,
    index,
    product,
  };
};
const increment = (productId) => {
  socket.emit('DECREMENT_QUANTITY', productId);

  return {
    type: INCREMENT_QUANTITY,
    productId,
  };
};
const decrement = (productId) => {
  socket.emit('INCREMENT_QUANTITY', {
    id: productId,
    quantity: 1,
  });

  return {
    type: DECREMENT_QUANTITY,
    productId,
  };
};
const deleteFromCart = (product) => {
  const { _id, quantity } = product;

  socket.emit('CART_UPDATE', { product, deleted: true });
  socket.emit('INCREMENT_QUANTITY', {
    id: _id,
    quantity,
  });

  return {
    type: DELETE_ITEM,
    productId: _id,
  };
};
const checkoutRequest = id => ({ type: CHECKOUT_REQUEST, id });
const checkoutHandshake = () => ({ type: CHECKOUT_HANDSHAKE });
const checkoutSuccess = (method, order) => ({ type: CHECKOUT_SUCCESS, method, order });
const checkoutFailed = () => ({ type: CHECKOUT_FAILURE });
const setLastOrder = order => ({ type: GET_ORDER, order });

export const getAddedIds = state => state.addedIds;

export const addToCart = (product, isBundle, index) => (dispatch) => {
  dispatch(addToCartUnsafe(product, isBundle, index));
};

export const incrementQuantity = productId => dispatch => (
  dispatch(increment(productId))
);
export const decrementQuantity = product => (dispatch) => {
  if (product.quantity === 1) {
    return dispatch(deleteFromCart(product));
  }
  dispatch(decrement(product._id));
};

export const deleteProduct = productId => dispatch => (
  dispatch(deleteFromCart(productId))
);

export const checkoutReq = (cart, quantites, placeId) => (dispatch) => {
  axios.post('/api/orders', { cart, quantites, placeId }, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
    .then((res) => {
      const { id } = res.data;
      dispatch(checkoutRequest(id));
      history.push(`/paiement/${id}`);
    })
    .catch(err => console.error(err));
};

export const checkoutCart = (method, orderId, token = '') => (dispatch) => {
  dispatch(checkoutHandshake());
  switch (method) {
    case 'STRIPE':
      return axios.post(`/payment/${orderId}`, { token })
        .then((res) => {
          const { order } = res.data;
          dispatch(checkoutSuccess(method, order));
          history.push(`/paiement-confirmation/${order._id}`, { order });
        })
        .catch(() => dispatch(checkoutFailed()));
    case 'SOLDE':
      return axios.post(`/payment/${orderId}?method=solde`)
        .then((res) => {
          const { order } = res.data;
          dispatch(checkoutSuccess(method, order));
          history.push(`/paiement-confirmation/${order._id}`, { order });
        })
        .catch(() => dispatch(checkoutFailed()));
    case 'PAYPAL':
      return axios.post(`/payment/${orderId}?method=paypal`)
        .then((res) => {
          const { order } = res.data;
          dispatch(checkoutSuccess(method, order));
          history.push(`/paiement-confirmation/${order._id}`, { order });
        })
        .catch(() => dispatch(checkoutFailed()));
    default:
      return dispatch(checkoutFailed());
  }
};

export const getOrderById = orderId => (dispatch) => {
  axios.get(`/api/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
    .then(res => dispatch(setLastOrder(res.data)))
    .catch(err => console.error(err));
};
