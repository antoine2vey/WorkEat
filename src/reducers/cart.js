import values from 'lodash/values';
import omit from 'lodash/omit';
import {
  ADD_TO_CART,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  DELETE_ITEM,
  GET_ORDER,
  DELETE_CART,
} from '../actions/cart';

const initialState = {
  addedIds: [],
  quantityById: {},
  cart: {
    products: [],
    bundles: [],
  },
  productsById: {},
  order: {},
  instanciateCartAt: null,
};

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case DELETE_ITEM:
      return state.filter(id => id !== action.productId);
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
    case DELETE_ITEM:
      // Deletes the product from object, thanks to lodash
      return omit(state, productId);
    case ADD_TO_CART:
      return {
        ...state,
        [action.product._id]: (state[action.product._id] || 0) + 1,
      };
    case INCREMENT_QUANTITY:
      return {
        ...state,
        [productId]: state[productId] + 1,
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
    case DELETE_ITEM:
      if (action.productType === 'bundle') {
        return {
          ...state,
          products: state.bundles.filter(i => i._id !== action.productId),
        };
      }

      return {
        ...state,
        products: state.products.filter(i => i._id !== action.productId),
      };
    case ADD_TO_CART:
      // Si l'id est déjà présent dans le cart, on retourne la state
      if (action.productType === 'bundle') {
        if (state.bundles.filter(i => i._id === action.product._id).length) {
          return state;
        }
        return {
          ...state,
          bundles: [
            ...state.products,
            action.product,
          ],
        };
      }

      if (state.products.filter(i => i._id === action.product._id).length) {
        return state;
      }
      return {
        ...state,
        products: [
          ...state.products,
          action.product,
        ],
      };
    default:
      return state;
  }
};

// Un niveau avant pour acceder au autre states du reducer
// Le reducer là est illisible, mais marche + pure
const map = (state = initialState, action) => {
  switch (action.type) {
    // Sur l'increment
    case INCREMENT_QUANTITY:
      return {
        // Spread les items
        ...state.productsById,
        // Pour ce produit avec l'id
        [action.productId]: {
          // Spread l'item
          ...state.productsById[action.productId],
          // Incrémente la qte selon l'id
          quantity: state.quantityById[action.productId] + 1,
        },
      };
    case DECREMENT_QUANTITY:
      return {
        ...state.productsById,
        [action.productId]: {
          ...state.productsById[action.productId],
          quantity: state.quantityById[action.productId] - 1,
        },
      };
    case DELETE_ITEM:
      return omit(state.productsById, action.productId);
    case ADD_TO_CART:
      // Si mon produit est présent, qte+1
      if (!!state.productsById[action.product._id]) {
        return {
          ...state.productsById,
          [action.product._id]: {
            ...action.product,
            quantity: state.quantityById[action.product._id] + 1,
          },
        };
      }

      // Sinon qte = 1
      if (action.productType === 'bundle') {
        return {
          ...state.productsById,
          [action.product._id]: {
            ...action.product,
            quantity: 1,
            isBundle: true,
          },
        };
      }

      return {
        ...state.productsById,
        [action.product._id]: {
          ...action.product,
          quantity: 1,
        },
      };
    default:
      return state.productsById;
  }
};

const handleExpiration = (state = initialState, action) => {
  switch (action.type) {
    // If any type of action concerning cart is fired, we update
    // instanciation timestamp
    case ADD_TO_CART:
    case DELETE_ITEM:
    case INCREMENT_QUANTITY:
    case DECREMENT_QUANTITY:
      return +new Date();
    default:
      return state.instanciateCartAt;
  }
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_FAILURE:
    case CHECKOUT_SUCCESS:
      return state;
    case DELETE_CART:
      return initialState;
    case GET_ORDER:
      return {
        ...initialState,
        order: action.order,
      };
    default:
      return {
        cart: cartHandler(state.cart, action),
        productsById: map(state, action),
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
        order: {},
        instanciateCartAt: handleExpiration(state, action),
      };
  }
};

export const getTotal = state => values(state.quantityById).reduce((prev, nxt) => (prev + nxt), 0);
export const getProducts = state => values(state.productsById);
export const getAllQuantities = state => state.quantityById;
export const getTotalPrice = state =>
  state.addedIds.reduce((prev, acc) => (prev + (state.productsById[acc].price * state.quantityById[acc])), 0);

export default cart;
