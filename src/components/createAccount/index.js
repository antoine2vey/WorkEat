export default ['$scope', '$http', '$state', function ($scope, $http, $state) {
  const vm = this;

  vm.createAccount = () => {
    $http.post('/account/create', {
      username: vm.username,
      password: vm.password,
      name: vm.name,
      surname: vm.surname,
      codePostal: vm.codePostal,
      town: vm.town,
      address: vm.address,
      phoneNumber: vm.phoneNumber,
    })
    .success(() => {
      $state.go('app.login');
    })
    .error((err) => {
      console.log(err);
    });
  };
}];
