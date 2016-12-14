import $ from 'jquery';

export default ['$http', '$localStorage', '$state', function ($http, $localStorage, $state) {
  const vm = this;
  vm.formData = $.extend(true, {}, $localStorage.user);

  vm.updateAccount = () => {
    if (vm.password !== vm.passwordVerification) {
      vm.doNotMatch = 'Passwords do not match :-(';
      return;
    }

    $http.put('/account/update', {
      username: vm.formData.username,
      password: vm.password,
      name: vm.formData.name,
      surname: vm.formData.surname,
      codePostal: vm.formData.codePostal,
      phoneNumber: vm.formData.phoneNumber,
      address: vm.formData.address,
      town: vm.formData.town,
    })
    .success((res) => {
      $localStorage.user = vm.formData;
      vm.status = res.status;
    })
    .error((err) => {
      vm.error = err;
    });
  };


  vm.deleteAccount = () => {
    $http.delete('/account/delete', {
      username: vm.formData.username,
    })
    .success(() => {
      $state.go('app.home');
      $localStorage.$reset();
    })
    .error((err) => {
      vm.doNotMatch = err;
    });
  };
}];
