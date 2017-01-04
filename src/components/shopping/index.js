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

  return value || 0;
}

export default ['$http', '$localStorage', '$state', function ($http, $localStorage, $state) {
  const vm = this;
  vm.items = $localStorage.cart;
  vm.total = updatePrice(getTotal(vm.items) || [0]);

  vm.updateTotal = (item, amount) => {
    if (isNaN(amount) || amount < 0 || amount === '') {
      return;
    }

    item.amount = amount;
    vm.total = updatePrice(getTotal(vm.items || [0]));
  };

  vm.blurInput = (item) => {
    let { amount } = item;
    if (amount === null || isNaN(amount)) {
      item.amount = 0;
    }
  };

  vm.removeFromCart = (item, index) => {
    vm.items.splice(index, 1);
    vm.total = updatePrice(getTotal(vm.items || [0]));
  };

  $http.get('/api/livraison/places').success((res) => {
    vm.places = res;
  }).error((err) => {
    console.log(err);
  });

  vm.order = () => {
    const idArray = [];
    if (vm.total === 0 || !vm.place) {
      return;
    }

    $http.post('/api/orders', {
      items: vm.items,
      place: vm.place._id,
    }).success((res) => {
      const { PAYMENT_ID, data } = res;
      console.log(data);
      $state.go('app.payment', {
        id: PAYMENT_ID,
      });
    }).error((err) => {
      console.error(err);
    })
  };
}];
