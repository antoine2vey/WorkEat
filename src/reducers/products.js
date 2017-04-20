function products(state = [], action) {
  console.log(state, action);
  switch (action.type) {
    case 'RECEIVE_PRODUCTS': {
      return [
        ...state,
        ...action.products,
      ];
    }
    default:
      return state;
  }
}

export default products;
