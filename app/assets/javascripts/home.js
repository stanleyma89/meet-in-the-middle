var map;

function initMap() {
 var bitmaker = {lat: 43.647649, lng: -79.387131};
 var operaHouse = {lat: 43.659213, lng: -79.348781};
 var brampton = {lat: 43.698739, lng: -79.781257};
 var rich = {lat: 43.887714, lng: -79.438603};
 var markers = [bitmaker, operaHouse, brampton, rich];
 var locations = [
         [43.647649, -79.387131],
         [43.659213, -79.348781],
         [43.698739, -79.781257],
         [43.887714, -79.438603]];

var map = new google.maps.Map(document.getElementById('map'), {
   center: {lat: 43.6532, lng: -79.3832},
   zoom: 11
 });

for (var i = 0; i < markers.length; i++) {

  var marker = new google.maps.Marker({
     position: markers[i],
     map: map
   });
  };

  var bound = new google.maps.LatLngBounds();
   for (i = 0; i < locations.length; i++) {
   bound.extend( new google.maps.LatLng(locations[i][0], locations[i][1]) );
 };

// OTHER CODE
  console.log(parseFloat(bound.getCenter().lng()))
  var center = { lng: parseFloat(bound.getCenter().lng()), lat: parseFloat(bound.getCenter().lat())};
  console.log(center)
  var marker = new google.maps.Marker({
    position: center,
    map: map
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: center,
      radius: 1000,
      type: ['restaurant'],
    }, callback);

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

  var circle = new google.maps.Circle({
    map: map,
    radius: 1000,    // 10 miles in metres
    fillColor: '#AA0000 '
  });
  circle.bindTo('center', marker, 'position');

}
