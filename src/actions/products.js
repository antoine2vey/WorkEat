import axios from 'axios';

export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const SHOW_DETAIL = 'SHOW_DETAIL';
export const HIDE_DETAIL = 'HIDE_DETAIL';

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

const addProduct = product => ({
  type: CREATE_PRODUCT,
  product,
});

const showProductDetail = product => ({
  type: SHOW_DETAIL,
  product,
});

const hideProductDetail = () => ({
  type: HIDE_DETAIL,
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

const createProduct = product => (dispatch) => {
  axios.post('/api/products', product, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
    .then(product => dispatch(addProduct(product.data)))
    .catch(err => console.log(err));
};

// If nothing in store, fetch products
const shouldFetchProducts = (state) => {
  if (!state.products.products.length) {
    return true;
  }

  return false;
};

const fetchProductsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchProducts(getState())) {
    // Dispatch action to store if we have products
    return dispatch(fetchProducts());
  }

  // Else return a promise so our view doesnt throw
  // error
  return Promise.resolve();
};

const showProduct = product => dispatch => (
  dispatch(showProductDetail(product))
);

const hideProduct = () => dispatch => (
  dispatch(hideProductDetail())
);

export { fetchProductsIfNeeded, deleteProducts, createProduct, showProduct, hideProduct };
