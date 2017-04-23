import axios from 'axios';

export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

// Action to receive products
const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS,
  products,
});
const requestProducts = () => ({
  type: REQUEST_PRODUCTS,
});

const deleteProduct = productId => ({
  type: DELETE_PRODUCT,
  productId,
});

// API call to fetch products
const fetchProducts = () => (dispatch) => {
  dispatch(requestProducts());
  axios.get('/api/products')
    .then(products => dispatch(receiveProducts(products.data)))
    .catch(err => console.error(err));
};

const deleteProducts = productId => (dispatch) => {
  console.log('tried to delete product');
  axios.delete(`/api/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
    .then(() => dispatch(deleteProduct(productId)))
    .catch(err => console.error(err));
};

// If nothing in store, fetch products
const shouldFetchProducts = (state) => {
  if (!state.products.length) {
    return true;
  }

  return false;
};

const fetchProductsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchProducts(getState())) {
    // Dispatch action to store if we have products
    console.log('Fetching products from API');
    return dispatch(fetchProducts());
  }

  // Else return a promise with current state for products
  console.log('Fetching from Redux <3');
  return Promise.resolve(getState());
};

export { fetchProductsIfNeeded, deleteProducts };
