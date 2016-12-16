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
  const value = array.reduce((a, b) => {
    return a + b;
  }, 0);

  return value;
}

export default ['$http', '$localStorage', function ($http, $localStorage) {
  const vm = this;
  vm.items = $localStorage.cart;
  vm.total = updatePrice(getTotal(vm.items) || [0]);

  vm.updateTotal = (item, amount) => {
    if (isNaN(amount) || amount < 0 || amount !== '') {
      return;
    }

    item.amount = amount;
    vm.total = updatePrice(getTotal(vm.items || [0]));
  };

  vm.blurInput = (item) => {
    let { amount } = item;
    if (amount === null || amount < 0 || isNaN(amount)) {
      amount = 0;
    }
  };

  vm.removeFromCart = (item, index) => {
    vm.items.splice(index, 1);
    vm.total = updatePrice(getTotal(vm.items || [0]));
  };
}];

