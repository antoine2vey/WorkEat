// jshint maxlen: false, undef:false, unused: false, camelcase: false

export default ['NgMap', '$http', function (NgMap, $http) {
  const vm = this;
  const tmpMarkers = [];
  const latLng = [];
  vm.googleMapUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD7t9PNgiBnEJ8ne3pVXoRg4U94MZwWy5I';

  /**
   * Set and remove a marker
   * @param { Object } marker
   * @param { Array } array
   */
  const setMarkerAndRemove = (marker, array, event) => {
    array.push(marker);
    latLng.push(event.latLng.lat(), event.latLng.lng());

    // If already a marker
    if (array.length > 1) {
      // Delete the first one
      array[0].setMap(null);
      // Shift from array
      array.shift();
      latLng.splice(0, 2);
    }
  };

  /**
   * Get all places
   * @return {[array]} return all places
   */
  function getPlaces() {
    $http.get('/api/livraison/places').success((res) => {
      vm.markers = res.data;
    });
  }

  getPlaces();
  NgMap.getMap().then((map) => {
    vm.map = map;
  });

  vm.placeMarker = (e) => {
    const marker = new google.maps.Marker({
      position: e.latLng,
      map: vm.map,
    });
    vm.map.panTo(e.latLng);
    setMarkerAndRemove(marker, tmpMarkers, e);

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    vm.geolocation = { lat, lng };

    $http.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}`)
    .then((address) => {
      vm.address = address.data.results[0].formatted_address;
    });
  };

  vm.addPlace = () => {
    $http.post('/api/livraison/places', {
      name: vm.name,
      geolocation: latLng,
      description: vm.description,
    }).success((res) => {
      vm.success = res;
      getPlaces();
    }).error((err) => {
      vm.error = err;
    });
  };

  vm.removeMarker = (marker, index) => {
    const id = marker._id;
    $http.delete(`/api/livraison/places/${id}`)
    .success((res) => {
      vm.markers.splice(index, 1);
      vm.success = res;
    })
    .error((err) => {
      vm.error = err;
    });
  };
}];
