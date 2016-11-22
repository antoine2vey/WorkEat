export default function($scope, $http) {
  function getProducts(){
    $http.get('/api/products')
    .success(function(res) {
      $scope.products = res;
      console.log(res);
    })
    .error(function(err) {
      console.log(err);
    });
  }

  $http.get('/api/tags')
  .success(function(res) {
    $scope.tags = res;
  })
  .error(function(err) {
    console.log(err);
  });

  getProducts();

  $scope.productForm = function(){
    $http({
      method: 'POST',
      url: '/api/products/create',
      data : {
        'file': $scope.file,
        'title': $scope.addProduct.title,
        'description': $scope.addProduct.description,
        'preparation': $scope.addProduct.preparation,
        'ingredients': $scope.addProduct.ingredients,
        'allergics': $scope.addProduct.allergics,
        'price': $scope.addProduct.price,
        'tag': $scope.addProduct.tag,
        'type': $scope.addProduct.type
      }
    })
    .success(function(){
      getProducts();
    })
    .error(function(err){
      console.log(err);
    });
  };

  $scope.removeProduct = function(product, index) {
    $http({
      method:'DELETE',
      url:'/api/products/'+product._id
    })
    .success(function() {
      $scope.products.splice(index, 1);
    })
    .error(function(err) {
      console.log(err);
    });
  };
}
