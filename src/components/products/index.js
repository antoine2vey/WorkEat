import { getProducts, deleteProduct, createProduct } from '../../utils/product.js';
import { getTags } from '../../utils/tag.js';

export default ['$http', function ($http) {
  const vm = this;

  getTags($http).success((res) => {
    vm.tags = res;
  });

  const displayProducts = () => {
    getProducts($http).success((res) => {
      vm.products = res;
    });
  };

  displayProducts();

  $http.get('/api/livraison/places')
  .success(places => {
    vm.places = places;
  })
  .error(err => {
    console.log(err);
  });

  vm.productForm = () => {
    createProduct($http, {
      file: vm.file,
      name: vm.name,
      description: vm.description,
      preparation: vm.preparation,
      allergics: vm.allergics,
      price: vm.price,
      tag: vm.tag,
      type: vm.type,
      places: vm.selectedPlaces
    }).success((res) => {
      displayProducts();
    }).error((err) => {
      vm.reqStatus = err;
    });
  };

  vm.removeProduct = (product, index) => {
    deleteProduct($http, product._id)
    .success((res) => {
      vm.products.splice(index, 1);
    })
    .error((err) => {
      vm.reqStatus = err;
    });
  };
}];
