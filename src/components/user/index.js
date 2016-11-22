export default function($http, $scope, $state) {
  $http({
    method: 'GET',
    url: '/protected'
  })
  .success(res => {
    $scope.message = res;
  })
  .error(() => {
    $state.go('login');
  });
}
