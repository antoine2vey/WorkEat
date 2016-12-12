export default ['$localStorage', '$state', '$http', function($localStorage, $state, $http) {
  const vm = this;
  vm.user = $localStorage;

  vm.logout = function(){
    $http.get('/account/logout')
    .success(() => {
      $localStorage.$reset();
      $state.go('app.home');
    })
    .error(() =>{
      $state.go('app.login');
    });
  };
}];
