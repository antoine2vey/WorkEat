function products(state = [], action) {
  console.log(state, action);
  switch (action.type) {
    case 'RECEIVE_PRODUCTS': {
      console.log('received products');
      break;
    }
    default:
      return state;
  }
}

export default products;
