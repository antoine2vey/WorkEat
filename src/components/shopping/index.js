function getTotal(array, total = []) {
  if (!Array.isArray(array)) {
    return false;
  }
  array.forEach((node) => {
    total.push(node.amount * node.price);
  });

  return total;
}

function updatePrice(array) {
  if (!Array.isArray(array)) {
    return false;
  }
  return array.reduce((a, b) => {
    return a + b;
  }, 0);
}

export default ['$http', '$localStorage', function ($http, $localStorage) {
  const vm = this;
  vm.items = $localStorage.cart;
  const prices = getTotal(vm.items) || [0];
  vm.total = updatePrice(prices);

  vm.removeFromCart = (item, index) => {
    vm.items.splice(index, 1);
    vm.total -= (item.amount * item.price);
  };
}];

