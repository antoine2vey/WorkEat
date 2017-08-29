import { RECEIVE_BUNDLES, REQUEST_BUNDLES, DELETE_BUNDLE, CREATE_BUNDLE, UPDATE_BUNDLE } from '../actions/bundles';

const initialState = {
  isFetching: false,
  bundles: [],
  bundlesById: {},
};

const bundles = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_BUNDLES:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_BUNDLES:
      return {
        ...state,
        isFetching: false,
        bundles: action.bundles,
      };
    case DELETE_BUNDLE:
      return {
        ...state,
        bundles: state.bundles.filter(bundle => bundle._id !== action.bundleId),
      };
    case CREATE_BUNDLE:
      return {
        ...state,
        bundles: [
          ...state.bundles,
          action.bundle,
        ],
      };
    case UPDATE_BUNDLE:
      return {
        ...state,
        bundles: state.bundles.map((bundle) => {
          if (bundle._id !== action.bundle._id) {
            return bundle;
          }

          return {
            ...bundle,
            ...action.bundle,
          };
        }),
      };
    default:
      return state;
  }
};

export default bundles;
