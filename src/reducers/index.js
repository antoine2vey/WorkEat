import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import products from './products';

const rootReducer = combineReducers({
  products,
  routing: routerReducer,
});

export default rootReducer;
