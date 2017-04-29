export const ADD_TO_CART = 'ADD_TO_CART';

export const UPDATE_MAP_ITEM = 'UPDATE_MAP_ITEM';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'UNINCREMENT_QUANTITY';
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
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
  productId
});

const decrement = productId => ({
  type: DECREMENT_QUANTITY,
  productId,
})

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

export const getQuantity = productId => (dispatch, getState) => (
  getState().cart.quantityById[productId]
);
