export default function($scope, $http, $state) {
  $scope.submitForm = function(){
    $http({
      method: 'POST',
      url: '/account/create',
      data: {
        'username': $scope.newUser.username,
        'password': $scope.newUser.password,
        'name' : $scope.newUser.name,
        'surname': $scope.newUser.surname,
        'codePostal': $scope.newUser.codePostal,
        'town': $scope.newUser.town,
        'address': $scope.newUser.address,
        'phoneNumber': $scope.newUser.phoneNumber
      }
    })
    .success(res => {
      $state.go('app.account');
    })
    .error(function(err){
      console.log(err);
    });
  };
}
