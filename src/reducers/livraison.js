import { RECEIVE_PLACES, REQUEST_PLACES, DELETE_PLACE, CREATE_PLACE } from '../actions/livraison';

const initialState = {
  isFetching: false,
  places: [],
};

const places = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PLACES:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_PLACES:
      return {
        ...state,
        isFetching: false,
        places: action.places,
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place._id !== action.placeId),
      };
    case CREATE_PLACE:
      return {
        ...state,
        places: [
          ...state.places,
          action.place,
        ],
      };
    default:
      return state;
  }
};

export default places;
