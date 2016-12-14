export default ['$localStorage', '$state', '$http', function ($localStorage, $state, $http) {
  const vm = this;

  vm.submitLogin = () => {
    $http.post('/account/login', {
      username: vm.username,
      password: vm.password,
    })
    .success((user) => {
      $localStorage.status = true;
      $localStorage.user = user;
      $state.go('app.account');
    })
    .error((res) => {
      vm.error = res;
    });
  };
}];
