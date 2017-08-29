import axios from 'axios';

export const RECEIVE_BUNDLES = 'RECEIVE_BUNDLES';
export const REQUEST_BUNDLES = 'REQUEST_BUNDLES';
export const DELETE_BUNDLE = 'DELETE_BUNDLE';
export const CREATE_BUNDLE = 'CREATE_BUNDLE';
export const UPDATE_BUNDLE = 'UPDATE_BUNDLE';

const receiveBundles = bundles => ({
  type: RECEIVE_BUNDLES,
  bundles,
});

const requestBundles = () => ({
  type: REQUEST_BUNDLES,
});

const deleteBundle = bundleId => ({
  type: DELETE_BUNDLE,
  bundleId,
});

const createBundle = bundle => ({
  type: CREATE_BUNDLE,
  bundle,
});

const update = bundle => ({
  type: UPDATE_BUNDLE,
  bundle,
});

const fetchBundles = () => (dispatch) => {
  dispatch(requestBundles());
  axios.get('/api/bundles')
    .then(bundles => dispatch(receiveBundles(bundles.data)))
    .catch(err => console.error(err));
};

const deleteBundles = bundleId => (dispatch) => {
  axios.delete(`/api/bundles/${bundleId}`, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
  .then(() => dispatch(deleteBundle(bundleId)))
  .catch(err => console.error(err));
};

const createBundles = bundle => (dispatch) => {
  axios.post('/api/bundles', bundle, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
    .then(bundle => dispatch(createBundle(bundle.data)))
    .catch(err => console.error(err));
};

const shouldFetchBundles = (state) => {
  if (!state.bundles.bundles.length) {
    return true;
  }

  return false;
};

const fetchBundlesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchBundles(getState())) {
    return dispatch(fetchBundles());
  }

  return Promise.resolve();
};

const updateBundle = bundle => (dispatch) => {
  axios.put(`api/bundles/${bundle._id}`, bundle, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  }).then(({ data }) => {
    dispatch(update(data));
  }).catch(err => console.log(err));
};

export { fetchBundlesIfNeeded, deleteBundles, createBundles, updateBundle };
