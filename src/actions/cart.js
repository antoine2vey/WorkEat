export const ADD_TO_CART = 'ADD_TO_CART';
export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

const addToCartUnsafe = productId => ({
  // TODO: call server side to update in session
  type: ADD_TO_CART,
  productId,
})

export const addToCart = productId => (dispatch) => {
  dispatch(addToCartUnsafe(productId));
};
