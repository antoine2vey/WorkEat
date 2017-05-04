import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { loadState } from './utils/persistState';
import rootReducer from './reducers';

const persistedState = loadState();
const loggerMiddleware = createLogger();

let middlewares;
if (process.env.NODE_ENV !== 'production') {
  middlewares = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  );
} else {
  middlewares = applyMiddleware(
    thunkMiddleware,
  );
}

const store = createStore(
  rootReducer,
  persistedState,
  middlewares,
);

export default store;
