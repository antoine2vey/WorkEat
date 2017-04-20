import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const products = [{ _id: '58f685ca7bd7f941ec48919c', file: 'uploads/rJMCSbVAl.1492551114359.png', name: 'Kebab', description: 'Un delicieux kebab de ses morts', preparation: 'Une préparation de kebs', price: 5, __v: 0, availableAt: ['58906a08f068bb434b0483d7'], stock: 0, votesNumber: 0, starsNumber: 0, types: ['entree', 'plat'], tags: [{ _id: '586e4e5c2ab0ff94f48777d1', name: 'Peu chero', __v: 0 }], allergics: ['allergics', 'one', 'two'] }, { _id: '58f8b37374fb05a645fee781', file: 'uploads/BkoOQN8Re.1492693875002.png', name: 'Ping', description: 'pokfezfezfzefez', preparation: 'io', price: 54234, __v: 0, availableAt: ['588fab0bbafc1c3268c48945', '58906a08f068bb434b0483d7'], stock: 0, votesNumber: 0, starsNumber: 0, types: ['dessert', 'boisson'], tags: [{ _id: '586e4e512ab0ff94f48777d0', name: 'Cherrr', __v: 0 }, { _id: '586e4e5c2ab0ff94f48777d1', name: 'Peu chero', __v: 0 }, { _id: '58f771644b5e0a708e040699', name: 'slt', __v: 0 }], allergics: ['oji'] }];

const defaultState = {
  products,
};

const store = createStore(
  rootReducer,
  defaultState,
  applyMiddleware(
    thunkMiddleware,
  ),
);

export default store;
