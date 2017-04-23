import { combineReducers } from 'redux';
// Until it get fixed
// import { routerReducer } from 'react-router-redux';
import products from './products';

const rootReducer = combineReducers({
  products,
  //routing: routerReducer,
});

export default rootReducer;
