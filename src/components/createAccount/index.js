export default function($scope, $http, $state) {
  const vm = this;

  vm.createAccount = () => {
    $http.post('/account/create', {
      'username': vm.username,
      'password': vm.password,
      'name' : vm.name,
      'surname': vm.surname,
      'codePostal': vm.codePostal,
      'town': vm.town,
      'address': vm.address,
      'phoneNumber': vm.phoneNumber
    })
    .success(res => {
      $state.go('app.account');
    })
    .error(err => {
      console.log(err);
    });
  };
}
