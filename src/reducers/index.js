import { combineReducers } from 'redux';
// Until it get fixed
// import { routerReducer } from 'react-router-redux';
import products from './products';
import auth from './auth';

const rootReducer = combineReducers({
  products,
  auth,
  //routing: routerReducer,
});

export default rootReducer;
