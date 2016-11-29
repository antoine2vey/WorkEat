//jshint maxlen: false, undef:false, unused: false, camelcase: false
export default function(NgMap, $http, $scope) {
  const vm = this;
  let tmpMarkers = [];
  let latLng = [];
  vm.googleMapUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD7t9PNgiBnEJ8ne3pVXoRg4U94MZwWy5I';

  /**
   * Set and remove a marker
   * @param { Object } marker
   * @param { Array } array
   */
  const setMarkerAndRemove = (marker, array, event) => {
    array.push(marker);
    latLng.push(event.latLng.lat(), event.latLng.lng());

    if(array.length > 1) {
      array[0].setMap(null);
      array.shift();
      latLng.splice(0,2);
    }
  };

  $http.get('/api/livraison/places').then(res => {
    vm.markers = res.data;
  });

  NgMap.getMap().then(map => {
    vm.map = map;
  });

  vm.placeMarker = e => {
    let marker = new google.maps.Marker({
      position: e.latLng,
      map: vm.map
    });
    vm.map.panTo(e.latLng);
    setMarkerAndRemove(marker, tmpMarkers, e);

    let lat = e.latLng.lat();
    let lng = e.latLng.lng();

    vm.geolocation = {
      lat: lat,
      lng: lng
    };

    $http.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}`)
    .then(address => {
      $scope.address = address.data.results[0].formatted_address;
    });
  };

  vm.addPlace = () => {
    $http.post('/api/livraison/places', {
      name: vm.name,
      geolocation: latLng,
      description: vm.description
    }).success(res => {
      vm.success = res;
    }).error(err => {
      vm.error = err;
    });
  };

  vm.removeMarker = (marker, index) => {
    let id = marker._id;
    $http.delete(`/api/livraison/places/${id}`)
    .success(res => {
      vm.markers.splice(index, 1);
      vm.success = res;
    })
    .error(err => {
      vm.error = err;
    });
  };
}
