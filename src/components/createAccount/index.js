export default ['$scope', '$http', '$state', function ($scope, $http, $state) {
  const vm = this;
  let geolocation;
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      geolocation = [
        latitude,
        longitude
      ];
    });
  } else {
      alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
  }
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
      position: geolocation
    })
    .success(() => {
      $state.go('app.login');
    })
    .error((err) => {
      console.log(err);
    });
  };
}];
