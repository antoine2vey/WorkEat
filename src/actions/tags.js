import axios from 'axios';

export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const REQUEST_TAGS = 'REQUEST_TAGS';
export const DELETE_TAG = 'DELETE_TAG';
export const CREATE_TAG = 'CREATE_TAG';

const receiveTags = tags => ({
  type: RECEIVE_TAGS,
  tags,
});
const requestTags = () => ({
  type: REQUEST_TAGS,
});

const deleteTag = tagId => ({
  type: DELETE_TAG,
  tagId,
});

const createTag = tag => ({
  type: CREATE_TAG,
  tag,
});

const fetchTags = () => (dispatch) => {
  dispatch(requestTags());
  axios.get('/api/tags')
    .then(tags => dispatch(receiveTags(tags.data)))
    .catch(err => console.error(err));
};

const deleteTags = tagId => (dispatch) => {
  axios.delete(`/api/tags/${tagId}`, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
  .then(() => dispatch(deleteTag(tagId)))
  .catch(err => console.error(err));
};

const createTags = name => (dispatch) => {
  axios.post('/api/tags', { name }, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
    .then(tag => dispatch(createTag(tag.data)))
    .catch(err => console.error(err));
};

const shouldFetchTags = (state) => {
  if (!state.tags.tags.length) {
    return true;
  }

  return false;
};

const fetchTagsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchTags(getState())) {    
    return dispatch(fetchTags());
  }

  return Promise.resolve();
};

export { fetchTagsIfNeeded, deleteTags, createTags };
