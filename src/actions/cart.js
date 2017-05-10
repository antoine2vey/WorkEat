import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import history from '../utils/history';

export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_ORDER = 'GET_ORDER';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'UNINCREMENT_QUANTITY';
export const DELETE_ITEM = 'DELETE_ITEM';
export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
export const CHECKOUT_HANDSHAKE = 'CHECKOUT_HANDSHAKE';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

const addToCartUnsafe = product => {
  return { type: ADD_TO_CART, product };
};
const increment = productId => ({ type: INCREMENT_QUANTITY, productId });
const decrement = productId => ({ type: DECREMENT_QUANTITY, productId });
const deleteFromCart = productId => ({ type: DELETE_ITEM, productId });
const checkoutRequest = id => ({ type: CHECKOUT_REQUEST, id });
const checkoutHandshake = () => ({ type: CHECKOUT_HANDSHAKE });
const checkoutSuccess = order => ({ type: CHECKOUT_SUCCESS, order });
const checkoutFailed = () => ({ type: CHECKOUT_FAILURE });
const setLastOrder = order => ({ type: GET_ORDER, order });

export const getAddedIds = state => state.addedIds;

export const addToCart = product => (dispatch) => {
  dispatch(addToCartUnsafe(product));
};

export const incrementQuantity = productId => dispatch => (
  dispatch(increment(productId))
);

export const decrementQuantity = productId => dispatch => (
  dispatch(decrement(productId))
);

export const deleteProduct = productId => dispatch => (
  dispatch(deleteFromCart(productId))
);

export const checkoutReq = (cart, quantites) => (dispatch) => {
  axios.post('/api/orders', { cart, quantites }, {
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
  if (method === 'STRIPE') {
    return axios.post(`/payment/${orderId}`, { token })
      .then((res) => {
        const { order } = res.data;
        dispatch(checkoutSuccess(order));
        history.push(`/paiement-confirmation/${order._id}`, { order });
      })
      .catch(() => dispatch(checkoutFailed()));
  } else if (method === 'SOLDE') {
    return axios.post(`/payment/${orderId}?method=solde`)
      .then((res) => {
        const { order } = res.data;
        dispatch(checkoutSuccess(order));
        history.push(`/paiement-confirmation/${order._id}`, { order });
      })
      .catch(() => dispatch(checkoutFailed()));
  } else if (method === 'PAYPAL') {
    return axios.post(`/payment/${orderId}?method=paypal`)
      .then((res) => {
        const { order } = res.data;
        dispatch(checkoutSuccess(order));
        history.push(`/paiement-confirmation/${order._id}`, { order });
      })
      .catch(() => dispatch(checkoutFailed()));
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
