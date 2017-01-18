export default ['$http', '$localStorage', function ($http, $localStorage) {
  const vm = this;

  $http.get('/api/products').success((res) => {
    vm.products = res;
  }).error((err) => {
    console.log(err);
  });

  $http.get('/api/bundles').success(res => {
    vm.bundles = res;
  }).error(err => {
    console.log(err);
  })

  vm.addToCart = (product) => {
    const { _id, name, price, description, file } = product;
    const obj = {
      _id,
      name,
      price,
      description,
      file,
      amount: 1,
    };

    /**
     * Si le produit est un bundle, on lui rajoute le champ
     */
    if(product.isBundle) {
      obj.isBundle = true
    }

    let found = false;

    /**
     * Si pas de cart, on crée un array avec l'objet
     */
    if (!$localStorage.cart) {
      $localStorage.cart = [obj];
    } else {
      for (let i = 0; i < $localStorage.cart.length; i++) {
        if (_id === $localStorage.cart[i]._id) {
          found = true;
          const obj = $localStorage.cart[i];
          obj.amount = obj.amount + 1;
          break;
        }
      }

      if (!found) {
        $localStorage.cart.push(obj);
      }
    }
  };
}];
