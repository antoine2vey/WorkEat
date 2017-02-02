function getProducts(http) {
  return http.get('/api/products');
}

function createProduct(http, product) {
  return http.post('/api/products/create', product);
}

function updateProduct(http, productId) {
  return http.put(`/api/products/${productId}`, { task: todo.updatedTask });
}

function deleteProduct(http, productId) {
  return http.delete(`/api/products/${productId}`);
}

function _getEntree(products) {
  let arr = [];
  products.filter(product => {
    product.type.filter(_type => {
      if(_type === 'entree') {
        arr.push(product);
      }
    });
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
    });
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
    });
  });

  return arr;
}

export {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  _getDessert,
  _getEntree,
  _getPlat
};
