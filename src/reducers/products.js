import { RECEIVE_PRODUCTS, REQUEST_PRODUCTS, DELETE_PRODUCT, CREATE_PRODUCT, SHOW_DETAIL, HIDE_DETAIL } from '../actions/products';

const initialState = {
  isFetching: false,
  products: [],
  isDetailVisible: false,
  product: {},
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DETAIL:
      return {
        ...state,
        isDetailVisible: true,
        product: action.product,
      };
    case HIDE_DETAIL:
      if (state.isDetailVisible && (state.product._id !== action.product._id)) {
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
        products: state.products.filter(product => product._id !== action.productId),
      };
    case CREATE_PRODUCT:
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

export const getEntrees = state => state.products.filter(product => product.types.indexOf('entree') > -1);
export const getPlats = state => state.products.filter(product => product.types.indexOf('plat') > -1);
export const getDesserts = state => state.products.filter(product => product.types.indexOf('dessert') > -1);
export const getBoissons = state => state.products.filter(product => product.types.indexOf('boisson') > -1);

export default products;
