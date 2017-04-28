import values from 'lodash/values';
import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  CHANGE_QUANTITY,
  GET_CART,
  getAddedIds
} from '../actions/cart';

const initialState = {
  addedIds: [],
  quantityById: {},
  cart: [],
  productsById: {},
};

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state;
      }
      return [...state, action.productId];
    default:
      return state;
  }
};

const quantityById = (state = initialState.quantityById, action) => {
  const { productId } = action;
  switch (action.type) {
    case ADD_TO_CART:
    case INCREMENT_QUANTITY:
      return {
        ...state,
        [productId]: (state[productId] || 0) + 1,
      };
    case CHANGE_QUANTITY:
      return {
        ...state,
        [productId]: action.quantity,
      };
    case DECREMENT_QUANTITY:
      if (state[productId] > 0) {
        return {
          ...state,
          [productId]: state[productId] - 1,
        };
      }
      return state;
    default:
      return state;
  }
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.cart,
        productsById: {
          ...action.cart.reduce((obj, product) => {
            obj[product._id] = product;
            return obj;
          }, {}),
        },
      };
    case CHECKOUT_REQUEST:
      return initialState;
    case CHECKOUT_FAILURE:
      return action.cart;
    default:
      return {
        cart: state.cart,
        productsById: {},
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
      };
  }
};

export const getTotal = state => (
  values(state.quantityById).reduce((prev, next) => (prev + next), 0)
);

const getProduct = (state, id) => state.productsById[id] || [];

export const getCartProducts = state => (
  getAddedIds(state).map(id => ({
    ...getProduct(state, id),
    quantity: state.quantityById[id] || 0,
  }))
);

export const getTotalPrice = state => (
  getAddedIds(state)
    .reduce((total, id) => (total + getProduct(state, id).price) * state.quantityById[id], 0)
);

export default cart;
