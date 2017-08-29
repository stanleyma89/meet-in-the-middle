function initMap() {
 var bitmaker = {lat: 43.647649, lng: -79.387131};
 // var operaHouse = {lat: 43.659213, lng: -79.348781};
 var brampton = {lat: 43.698739, lng: -79.781257};
 var rich = {lat: 43.887714, lng: -79.438603};
 var markers = [bitmaker, brampton, rich];
 var locations = [
         [43.647649, -79.387131],
        //  [43.659213, -79.348781],
         [43.698739, -79.781257],
         [43.887714, -79.438603]];

var map = new google.maps.Map(document.getElementById('map'), {
   center: {lat: 43.6532, lng: -79.4832},
   zoom: 10
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

  //=======================================================
  var Center = new google.maps.LatLng(43.647649, -79.387131);
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;

  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var properties = {
      center: Center,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // map = new google.maps.Map(document.getElementById("map"), properties);
    directionsDisplay.setMap(map);

    var marker = new google.maps.Marker({
      position: Center,
      // animation: google.maps.Animation.BOUNCE,
    });

    marker.setMap(map);
    Route();
  }

  function Route() {

    // var start = new google.maps.LatLng(18.210885, -67.140884);
    // var end = new google.maps.LatLng(18.211685, -67.141684);
    var request = {
      origin: bitmaker,
      destination: rich,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      } else {
        alert("couldn't get directions:" + status);
      }
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);
}
