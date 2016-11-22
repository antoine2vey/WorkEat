import angular from 'angular';

export default function($scope, $http) {
  $http.get('/')
    .success(res => {
      console.log(res);
      $scope.test = res;
    })
    .error(err => {
      console.log(err);
    });
}
