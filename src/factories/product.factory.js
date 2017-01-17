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

  function _getEntree(products) {
    let arr = [];
    products.filter(product => {
      product.type.filter(_type => {
        if(_type === 'entree') {
          arr.push(product);
        }
      })
    });

    return arr;
  }

  function _getPlat(products) {
    let arr = [];
    products.filter(product => {
      product.type.filter(_type => {
        if(_type === 'plat') {
          arr.push(product);
        }
      })
    });

    return arr;
  }

  function _getDessert(products) {
    let arr = [];
    products.filter(product => {
      product.type.filter(_type => {
        if(_type === 'dessert') {
          arr.push(product);
        }
      })
    });

    return arr;
  }

  return {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    _getEntree,
    _getPlat,
    _getDessert,
  };
});

export default Products;
