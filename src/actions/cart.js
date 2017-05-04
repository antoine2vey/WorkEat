export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'UNINCREMENT_QUANTITY';
export const DELETE_ITEM = 'DELETE_ITEM';
export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

const addToCartUnsafe = product => ({
  type: ADD_TO_CART,
  product,
});

const increment = productId => ({
  type: INCREMENT_QUANTITY,
  productId,
});

const decrement = productId => ({
  type: DECREMENT_QUANTITY,
  productId,
});

const deleteFromCart = productId => ({
  type: DELETE_ITEM,
  productId,
});

const checkoutRequest = () => ({
  type: CHECKOUT_REQUEST,
});

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

export const checkoutCart = cart => dispatch => (
  dispatch(checkoutRequest())
);

export const getQuantity = productId => (dispatch, getState) => (
  getState().cart.quantityById[productId]
);
