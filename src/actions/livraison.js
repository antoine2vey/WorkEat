import axios from 'axios';

export const RECEIVE_PLACES = 'RECEIVE_PLACES';
export const REQUEST_PLACES = 'REQUEST_PLACES';
export const DELETE_PLACE = 'DELETE_PLACE';
export const CREATE_PLACE = 'CREATE_PLACE';

const receivePlaces = places => ({
  type: RECEIVE_PLACES,
  places,
});
const requestPlaces = () => ({
  type: REQUEST_PLACES,
});

const deletePlace = placeId => ({
  type: DELETE_PLACE,
  placeId,
});

const createPlace = place => ({
  type: CREATE_PLACE,
  place,
});

const fetchPlaces = () => (dispatch) => {
  dispatch(requestPlaces());
  axios.get('/api/places')
    .then(places => dispatch(receivePlaces(places.data)))
    .catch(err => console.error(err));
};

const deletePlaces = placeId => (dispatch) => {
  axios.delete(`/api/places/${placeId}`, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
  .then(() => dispatch(deletePlace(placeId)))
  .catch(err => console.error(err));
};

const createPlaces = place => (dispatch) => {
  axios.post('/api/places', place, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
    .then(place => dispatch(createPlace(place.data)))
    .catch(err => console.error(err));
};

const shouldFetchPlaces = (state) => {
  if (!state.places.places.length) {
    return true;
  }

  return false;
};

const fetchPlacesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchPlaces(getState())) {    
    return dispatch(fetchPlaces());
  }

  return Promise.resolve();
};

export { fetchPlacesIfNeeded, deletePlaces, createPlaces };
