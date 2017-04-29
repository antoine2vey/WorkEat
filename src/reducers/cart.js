import values from 'lodash/values';
import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  CHANGE_QUANTITY,
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
      if (state.indexOf(action.product._id) !== -1) {
        return state;
      }
      return [...state, action.product._id];
    default:
      return state;
  }
};

const quantityById = (state = initialState.quantityById, action) => {
  const { productId } = action;
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        [action.product._id]: (state[action.product._id] || 0) + 1,
      };
    case INCREMENT_QUANTITY:
      return {
        ...state,
        [action.product._id]: state[action.product._id] + 1,
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

const cartHandler = (state = initialState.cart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Si l'id est déjà présent dans le cart, on retourne la state
      if (state.filter(i => i._id === action.product._id).length) {
        return state;
      }
      return [
        ...state,
        action.product,
      ];
    default:
      return state;
  }
};

const map = (state = initialState.productsById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (!!state[action.product._id]) {
        return state;
      }
      return {
        ...state,
        [action.product._id]: action.product,
      };
    default:
      return state;
  }
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState;
    case CHECKOUT_FAILURE:
      return action.cart;
    default:
      return {
        cart: cartHandler(state.cart, action),
        productsById: map(state.productsById, action),
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
      };
  }
};

export const getTotal = state => (
  values(state.quantityById).reduce((prev, nxt) => (prev + nxt), 0)
);

export const getTotalPrice = (state) => {
  let price = 0;
  state.addedIds.forEach((id) => {
    price += (state.productsById[id].price * state.quantityById[id]);
  });

  return price;
};

export default cart;
