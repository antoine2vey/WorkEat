import axios from 'axios';

// Action to receive products
export function receiveProducts(products) {
  return {
    type: 'RECEIVE_PRODUCTS',
    products,
  };
}

// API call to fetch products
export function fetchProducts() {
  return dispatch => (
    axios.get('/api/products')
      .then(products => dispatch(receiveProducts(products.data)))
  );
}

// If nothing in store, fetch products
export function shouldFetchProducts(state) {
  if (!state.products.length) {
    return true;
  }

  return false;
}

export function fetchProductsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchProducts(getState())) {
      // Dispatch action to store if we have products
      return dispatch(fetchProducts());
    }

    // Else return a promise with current state for products
    return Promise.resolve(getState());
  };
}
