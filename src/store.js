import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { loadState } from './utils/persistState';
import rootReducer from './reducers';

const persistedState = loadState();
const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunkMiddleware, loggerMiddleware),
);

export default store;
