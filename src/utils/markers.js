function distance(origin, point) {
  // Math.PI / 100
  var p = 0.017453292519943295;
  // On cache Math.cos
  var c = Math.cos;
  var a = 0.5 - c((point[0] - origin[0]) * p)/2 +
          c(origin[0] * p) * c(point[0] * p) *
          (1 - c((origin[1] - point[1]) * p))/2;
  return 12742 * Math.asin(Math.sqrt(a));
}

function getClosestMarker(origin, markers) {
  let result = [];
  markers.forEach(marker => {
    result.push(distance(origin, marker.geolocation));
  });

  const min = Math.min.apply(null, result);
  var pos = result.indexOf(min);
  return markers[pos];
}

export { distance, getClosestMarker };
