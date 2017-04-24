import { combineReducers } from 'redux';
// Until it get fixed
// import { routerReducer } from 'react-router-redux';
import products from './products';
import auth from './auth';
import tags from './tags';
import places from './livraison';
import bundles from './bundles';

const rootReducer = combineReducers({
  auth,
  products,
  tags,
  places,
  bundles,
  //routing: routerReducer,
});

export default rootReducer;
