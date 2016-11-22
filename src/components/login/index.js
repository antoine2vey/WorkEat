export default function($scope, $localStorage, $state, $http) {
  $scope.submitLogin = function(){
    $http({
      method: 'POST',
      url: '/account/login',
      data: {
        'username': $scope.loginForm.username,
        'password': $scope.loginForm.password
      }
    })
    .success(function(response){
      $localStorage.status = true;
      $localStorage.user = response;
      $state.go('app.account');
    })
    .error(function(res){
      $scope.error = res;
    });
  };
}
