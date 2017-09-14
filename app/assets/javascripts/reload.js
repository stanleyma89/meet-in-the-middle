function reload(locations) {

//  Creates rectangular boundary using all cooridates in 'locations'
  var bound = new google.maps.LatLngBounds();
   for (i = 0; i < locations.length; i++) {
   bound.extend( new google.maps.LatLng(locations[i][0], locations[i][1]) );
   map.fitBounds(bound);
 };

// Finds center point of recanglular boundary created above and places marker. Stores center location in 'center'
  var center = { lng: parseFloat(bound.getCenter().lng()), lat: parseFloat(bound.getCenter().lat())};

  var centerMarker = new google.maps.Marker({
    position: center,
    map: map

  });

  initialize(center, centerMarker);
  return center;
}
