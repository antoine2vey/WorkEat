export default function($localStorage, $scope, $state, $http) {
  $scope.user = $localStorage;
  $scope.logout = function(){
    $http({
      method: 'GET',
      url: '/account/logout'
    })
    .success(() => {
      $localStorage.$reset();
      $state.go('app.home');
    })
    .error(() =>{
      $state.go('app.login');
    });
  };
}
