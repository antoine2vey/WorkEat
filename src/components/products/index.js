export default ['$http', function($http) {
  const vm = this;

  const getProducts = () => {
    $http.get('/api/products')
    .success(res => {
      vm.products = res;
    })
    .error(err => {
      console.log(err);
    });
  };

  $http.get('/api/tags')
  .success(res => {
    vm.tags = res;
  })
  .error(err => {
    console.log(err);
  });

  getProducts();

  vm.productForm = () => {
    $http.post('/api/products/create', {
      'file': vm.file,
      'title': vm.title,
      'description': vm.description,
      'preparation': vm.preparation,
      'ingredients': vm.ingredients,
      'allergics': vm.allergics,
      'price': vm.price,
      'tag': vm.tag,
      'type': vm.type
    })
    .success(() => {
      getProducts();
    })
    .error(err => {
      console.log(err);
    });
  };

  vm.removeProduct = (product, index) => {
    $http.delete(`/api/products/${product._id}`)
    .success(() => {
      vm.products.splice(index, 1);
    })
    .error(err => {
      console.log(err);
    });
  };
}];
