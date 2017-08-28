import {
  RECEIVE_PRODUCTS,
  REQUEST_PRODUCTS,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SHOW_DETAIL,
  HIDE_DETAIL,
  TRIGGER_FILTER,
  DECREMENT_PRODUCT_QUANTITY,
  INCREMENT_PRODUCT_QUANTITY,
} from '../actions/products';

const initialState = {
  isFetching: false,
  products: [],
  isDetailVisible: false,
  product: {},
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case DECREMENT_PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) => {
          if (action.productId === product._id) {
            return {
              ...product,
              stock: product.stock - 1,
            };
          }

          return product;
        }),
      };
    case INCREMENT_PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) => {
          if (action.productId === product._id) {
            return {
              ...product,
              stock: product.stock + action.quantity,
            };
          }

          return product;
        }),
      };
    case SHOW_DETAIL:
      return {
        ...state,
        isDetailVisible: true,
        product: action.product,
      };
    case HIDE_DETAIL:
      if (state.isDetailVisible && state.product._id !== action.product._id) {
        return {
          ...state,
          product: action.product,
        };
      }

      return {
        ...state,
        isDetailVisible: false,
      };
    case REQUEST_PRODUCTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        isFetching: false,
        products: action.products,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.productId,
        ),
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product],
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) => {
          if (product._id !== action.product._id) {
            return product;
          }

          return {
            ...product,
            ...action.product,
          };
        }),
      };
    case TRIGGER_FILTER:
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.name.toUpperCase().includes(action.str.toUpperCase())) {
            return {
              ...product,
              isHidden: false,
            };
          }

          return {
            ...product,
            isHidden: true,
          };
        }),
      };
    default:
      return state;
  }
};

export const getEntrees = (products, state) => {
  const id = state.auth.user.position._id;
  return products.products
    .filter(product => product.types.indexOf('entree') > -1)
    .filter(product => product.availableAt.some(place => place._id === id));
};
export const getPlats = (products, state) => {
  console.log(products);
  const id = state.auth.user.position._id;
  return products.products
    .filter(product => product.types.indexOf('plat') > -1)
    .filter(product => product.availableAt.some(place => place._id === id));
};
export const getDesserts = (products, state) => {
  const id = state.auth.user.position._id;
  return products.products
    .filter(product => product.types.indexOf('dessert') > -1)
    .filter(product => product.availableAt.some(place => place._id === id));
};
export const getBoissons = (products, state) => {
  const id = state.auth.user.position._id;
  return products.products
    .filter(product => product.types.indexOf('boisson') > -1)
    .filter(product => product.availableAt.some(place => place._id === id));
};

export default products;
