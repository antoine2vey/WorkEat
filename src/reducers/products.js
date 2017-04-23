import { RECEIVE_PRODUCTS, REQUEST_PRODUCTS, DELETE_PRODUCT } from '../actions';

const initialState = {
  isFetching: false,
  products: [],
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PRODUCTS: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case RECEIVE_PRODUCTS: {
      return {
        ...state,
        isFetching: false,
        products: action.products,
      };
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        products: [...state.products.filter(product => product._id !== action.productId)],
      };
    }
    default:
      return state;
  }
};

export default products;
