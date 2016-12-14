export default ['$http', '$state', function ($http, $state) {
  const vm = this;

  $http.get('/protected')
  .success((res) => {
    vm.user = res;
  })
  .error(() => {
    $state.go('login');
  });
}];
