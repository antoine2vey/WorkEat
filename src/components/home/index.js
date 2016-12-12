export default ['$http', function($http) {
  const vm = this;

  $http.get('/protected')
  .success(res => {
    vm.info = res;
  });
}];
