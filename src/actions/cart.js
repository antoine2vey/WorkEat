import axios from 'axios';

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const GET_CART = 'GET_CART';

export const UPDATE_MAP_ITEM = 'UPDATE_MAP_ITEM';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'UNINCREMENT_QUANTITY';
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
export const DELETE_ITEM = 'DELETE_ITEM';
export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

const addToCartUnsafe = productId => ({
  type: ADD_TO_CART,
  productId,
});
const getCartAction = cart => ({
  type: GET_CART,
  cart,
});

export const getAddedIds = state => state.addedIds;

export const addToCart = productId => (dispatch, getState) => {
  dispatch(addToCartUnsafe(productId));
  const { cart } = getState();
  axios.put('/api/cart', cart)
    .then(res => dispatch(getCartAction(res.data)))
    .catch(err => console.error(err));
};

export const getCart = () => (dispatch) => {
  axios.get('/api/cart')
    .then(res => dispatch(getCartAction(res.data)))
    .catch(err => console.error(err));
};

export const getQuantity = productId => (dispatch, getState) => (
  getState().cart.quantityById[productId]
);
