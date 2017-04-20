import axios from 'axios';

export function receiveProducts(products) {
  return {
    type: 'RECEIVE_PRODUCTS',
    products: products.data,
  };
}

export function fetchProducts() {
  return dispatch => axios.get('/api/products')
    .then(products => dispatch(receiveProducts(products)));
}

export function shouldFetchProducts(state) {
  if (!state.products) {
    console.info('We are fetching products!');
    return true;
  }

  console.info('We are not fecthing products');
  return false;
}

export function fetchProductsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchProducts(getState)) {
      return dispatch(fetchProducts());
    }
  };
}
