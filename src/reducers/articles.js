import { RECEIVE_ARTICLES, REQUEST_ARTICLES, DELETE_ARTICLE, CREATE_ARTICLE, SET_ARTICLE } from '../actions/articles';

const initialState = {
  isFetching: false,
  articles: [],
  currentArticle: {
    banner: '',
  },
};

const articles = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLE:
      return {
        ...state,
        currentArticle: action.article,
      };
    case REQUEST_ARTICLES:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_ARTICLES:
      return {
        ...state,
        isFetching: false,
        articles: action.articles,
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(article => article._id !== action.articleId),
      };
    case CREATE_ARTICLE:
      return {
        ...state,
        articles: [
          ...state.articles,
          action.article,
        ],
      };
    default:
      return state;
  }
};

export default articles;
