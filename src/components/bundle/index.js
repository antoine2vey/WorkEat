function filterId(items) {
  items.forEach((item, idx) => {
    if(item == null) {
      items.splice(idx, 1);
    }
  });

  return items.map(item => item._id);
}

export default ['$http', 'Products', function($http, Products) {
  const vm = this;
  const { getProducts, _getPlat, _getEntree, _getDessert } = Products;

  getProducts()
  .success((products) => {
    vm.plat = _getPlat(products);
    vm.entree = _getEntree(products);
    vm.dessert = _getDessert(products);
  });

  vm.bundleForm = () => {
    $http.post('/api/bundles', {
      name: vm.name,
      description: vm.description,
      price: vm.price,
      reduction: vm.reduction,
      itemsId: filterId([
        vm.selectedEntree,
        vm.selectedPlat,
        vm.selectedDessert,
      ]),
    }).success(res => {
      vm.reqStatus = res;
    }).error(err => {
      vm.reqStatus = res;
    });
  }
}];
