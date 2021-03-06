import { RECEIVE_TAGS, REQUEST_TAGS, DELETE_TAG, CREATE_TAG, UPDATE_TAG } from '../actions/tags';

const initialState = {
  isFetching: false,
  tags: [],
};

const tags = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TAGS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_TAGS:
      return {
        ...state,
        isFetching: false,
        tags: action.tags,
      };
    case DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filter(tag => tag._id !== action.tagId),
      };
    case CREATE_TAG:
      return {
        ...state,
        tags: [
          ...state.tags,
          action.tag,
        ],
      };
    case UPDATE_TAG:
      return {
        ...state,
        tags: state.tags.map((tag) => {
          if (tag._id !== action.tag._id) {
            return tag;
          }

          return {
            ...tag,
            ...action.tag,
          };
        }),
      };
    default:
      return state;
  }
};

export default tags;
