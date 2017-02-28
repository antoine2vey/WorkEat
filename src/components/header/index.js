export default ['$localStorage', '$state', '$http', '$timeout', '$rootScope', function ($localStorage, $state, $http, $timeout, $rootScope) {
  const vm = this;
  vm.user = $localStorage;

  vm.clock = "loading clock...";
  vm.tickInterval = 1000;
  const tick = function() {
    vm.clock = Date.now();
      $timeout(tick, vm.tickInterval);
    };
  $timeout(tick, vm.tickInterval);

  vm.logout = () => {
    $http.get('/account/logout').success(() => {
      $localStorage.$reset();
      $state.go('app.home');
    }).error(() => {
      $state.go('app.login');
    });
  };
}];
