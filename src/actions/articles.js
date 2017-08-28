import axios from 'axios';

export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';
export const REQUEST_ARTICLES = 'REQUEST_ARTICLES';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const CREATE_ARTICLE = 'CREATE_ARTICLE';
export const SET_ARTICLE = 'SET_ARTICLE';

const receiveArticles = articles => ({
  type: RECEIVE_ARTICLES,
  articles,
});
const requestArticles = () => ({
  type: REQUEST_ARTICLES,
});

const deleteArticle = articleId => ({
  type: DELETE_ARTICLE,
  articleId,
});

const createArticle = article => ({
  type: CREATE_ARTICLE,
  article,
});

const setCurrentArticle = article => ({
  type: SET_ARTICLE,
  article,
});

const fetchArticles = () => (dispatch) => {
  dispatch(requestArticles());
  axios.get('/api/articles')
    .then(articles => dispatch(receiveArticles(articles.data)))
    .catch(err => console.error(err));
};

const deleteArticles = articleId => (dispatch) => {
  axios.delete(`/api/articles/${articleId}`, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
  .then(() => dispatch(deleteArticle(articleId)))
  .catch(err => console.error(err));
};

const createArticles = article => (dispatch) => {
  axios.post('/api/articles', article, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
    .then(article => dispatch(createArticle(article.data)))
    .catch(err => console.error(err));
};

const shouldFetchArticles = (state) => {
  if (!state.articles.articles.length) {
    return true;
  }

  return false;
};

const fetchArticlesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchArticles(getState())) {
    return dispatch(fetchArticles());
  }

  return Promise.resolve();
};

const getArticleBySlug = slug => (dispatch) => {
  axios.get(`/api/articles/${slug}`, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
  .then(({ data }) => dispatch(setCurrentArticle(data)))
  .catch(err => console.error(err));
};

export { fetchArticlesIfNeeded, deleteArticles, createArticles, getArticleBySlug };
