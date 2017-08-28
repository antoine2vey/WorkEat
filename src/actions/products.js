import axios from 'axios';
import * as io from 'socket.io-client';

export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SHOW_DETAIL = 'SHOW_DETAIL';
export const HIDE_DETAIL = 'HIDE_DETAIL';
export const TRIGGER_FILTER = 'TRIGGER_FILTER';
export const DECREMENT_PRODUCT_QUANTITY = 'DECREMENT_PRODUCT_QUANTITY';
export const INCREMENT_PRODUCT_QUANTITY = 'INCREMENT_PRODUCT_QUANTITY';
const socket = io.connect('http://localhost:3005');

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

const showProductDetail = (product) => {
  window.scrollTo(0, 0);
  return {
    type: SHOW_DETAIL,
    product,
  };
};

const hideProductDetail = product => ({
  type: HIDE_DETAIL,
  product,
});

const triggerFilter = str => ({
  type: TRIGGER_FILTER,
  str,
});

const decrement = id => ({
  type: DECREMENT_PRODUCT_QUANTITY,
  productId: id,
});

const increment = (id, quantity) => ({
  type: INCREMENT_PRODUCT_QUANTITY,
  productId: id,
  quantity,
});

const update = product => ({
  type: UPDATE_PRODUCT,
  product,
});

// API call to fetch products
const fetchProducts = () => (dispatch) => {
  dispatch(requestProducts());
  axios.get('/api/products')
    .then(products => dispatch(receiveProducts(products.data)))
    .catch(err => console.error(err));
};

const deleteProducts = productId => (dispatch) => {

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
  }).then(product => dispatch(addProduct(product.data)));
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

const hideProduct = product => dispatch => (
  dispatch(hideProductDetail(product))
);

const getFilteredProducts = str => (dispatch, getState) => (
  dispatch(triggerFilter(str))
);

const addListener = key => (dispatch) => {
  socket.on(key, ({ id, quantity }) => {
    switch (key) {
      case 'DECREMENT_QUANTITY':
        return dispatch(decrement(id));
      case 'INCREMENT_QUANTITY':
        return dispatch(increment(id, quantity));
      default:
        return false;
    }
  });
};

const updateProduct = product => (dispatch) => {
  axios.put(`api/products/${product._id}`, product, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  }).then(({ data }) => {
    dispatch(update(data));
  });
};

export { fetchProductsIfNeeded, deleteProducts, createProduct, showProduct, hideProduct, getFilteredProducts, addListener, updateProduct };
