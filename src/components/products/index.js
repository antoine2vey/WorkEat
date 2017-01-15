export default ['$http', 'Products', 'Tags', function ($http, Products, Tags) {
  const vm = this;
  const { getProducts, createProduct, deleteProduct } = Products;
  const { getTags, createTag, updateTag, deleteTag } = Tags;

  getTags().success((res) => {
    vm.tags = res;
  });

  const displayProducts = () => {
    getProducts().success((res) => {
      vm.products = res;
    });
  };

  displayProducts();

  vm.productForm = () => {
    createProduct({
      file: vm.file,
      title: vm.title,
      description: vm.description,
      preparation: vm.preparation,
      ingredients: vm.ingredients,
      allergics: vm.allergics,
      price: vm.price,
      tag: vm.tag,
      type: vm.type,
    }).success((res) => {
      displayProducts();
    }).error((err) => {
      vm.reqStatus = err;
    });
  };

  vm.removeProduct = (product, index) => {
    deleteProduct(product._id)
    .success((res) => {
      vm.products.splice(index, 1);
    })
    .error((err) => {
      vm.reqStatus = err;
    });
  };
}];
