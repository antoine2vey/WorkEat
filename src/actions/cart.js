import axios from 'axios';

export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_MAP_ITEM = 'UPDATE_MAP_ITEM';
export const INCREMENT_ITEM = 'INCREMENT_ITEM';
export const UNINCREMENT_ITEM = 'UNINCREMENT_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

const addToCartUnsafe = productId => ({
  type: ADD_TO_CART,
  productId,
});
const updateMap = map => ({
  type: UPDATE_MAP_ITEM,
  map,
});

export const addToCart = productId => (dispatch, getState) => {
  dispatch(addToCartUnsafe(productId));
  const { cart } = getState();
  axios.put('/api/cart', cart)
    .then(res => dispatch(updateMap(res.data)))
    .catch(err => console.error(err));
};
