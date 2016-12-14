export default ['$http', function ($http) {
  const vm = this;

  $http.get('/api/products').success((res) => {
    vm.products = res;
    console.log(res);
  }).error((err) => {
    console.log(err);
  });
}];
