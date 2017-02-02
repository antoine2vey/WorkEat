import $ from 'jquery';
import { distance, getClosestMarker } from '../../utils/markers.js';

export default ['$http', '$localStorage', '$state', 'NgMap', function ($http, $localStorage, $state, NgMap) {
  const vm = this;
  vm.googleMapUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDjuB1ZL7AReWzNv1ZaEw1nTMR4s74vd_E';
  vm.formData = $.extend(true, {}, $localStorage.user);

  $http.get('/api/livraison/places')
  .success((places) => {
    vm.places = places;
    const closestMarker = getClosestMarker(vm.formData.position, places);
    vm.path = [vm.formData.position, closestMarker.geolocation];
    vm.closestMarker = closestMarker;
  })
  .error(e => console.log(e));

  vm.updateLivraison = () => {
    const { geolocation } = vm.selectedPlace;
    $http.put(`/account/update/`, {
      position: geolocation
    })
    .success((res) => {
      $localStorage.user.position = geolocation;
      vm.status = res.status;
    })
    .error(err => console.log(err));
  };

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
