import angular from 'angular';
const Products = angular.module('Products', [])
.factory('Products', ($http) => {
  function getProducts() {
    return $http.get('/api/products');
  }

  function createProduct(product) {
    return $http.post('/api/products/create', product);
  }

  function updateProduct(productId) {
    return $http.put(`/api/products/${productId}`, { task: todo.updatedTask });
  }

  function deleteProduct(productId) {
    return $http.delete(`/api/products/${productId}`);
  }

  return {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
  };
});

export default Products;
