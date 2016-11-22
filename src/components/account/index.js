import $ from 'jquery';

export default function($scope, $http, $localStorage) {
  $scope.formData = $.extend(true,{},$localStorage.user);
  var hiddenUsername = $scope.formData.username;
  $scope.formData.newUsername = $scope.formData.username;

  $scope.updateAccount = function(){
    if($scope.password !== $scope.passwordVerification){
      $scope.doNotMatch = 'Passwords do not match :-(';
      return;
    }

    $http({
      method: 'POST',
      url: '/account/update',
      data: {
        'newUsername': $scope.formData.newUsername,
        'username': hiddenUsername,
        'password': $scope.password,
        'name': $scope.formData.name,
        'surname': $scope.formData.surname,
        'codePostal': $scope.formData.codePostal,
        'phoneNumber': $scope.formData.phoneNumber,
        'address': $scope.formData.address,
        'town': $scope.formData.town
      }
    })
    .success(function(res){
      $localStorage.user = $scope.formData;
      hiddenUsername = $scope.formData.newUsername;
      $scope.formData.newUsername = hiddenUsername;
      $scope.status = res;
    })
    .error(function(res){
      $scope.error = res;
    });
  };
}
