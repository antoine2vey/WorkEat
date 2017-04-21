import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const defaultState = {
  products: [],
};

const store = createStore(
  rootReducer,
  defaultState,
  applyMiddleware(
    thunkMiddleware,
  ),
);

export default store;
