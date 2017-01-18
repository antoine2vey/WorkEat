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

  function getBundles() {
    $http.get('/api/bundles')
    .success(bundles => {
      vm.bundles = bundles;
    })
    .error(err => {
      console.log(err);
    })
  }

  getBundles();

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
      getBundles();
    }).error(err => {
      vm.reqStatus = res;
    });
  };

  vm.removeBundle = (bundle, index) => {
    $http.delete(`/api/bundles/${bundle._id}`)
    .success(res => {
      vm.reqStatus = res;
      vm.bundles.splice(index, 1);
    })
    .error(err => {
      vm.reqStatus = err;
    })
  };
}];
