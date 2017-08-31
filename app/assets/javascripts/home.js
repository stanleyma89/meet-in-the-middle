var map;

// Initializes map
function initMap() {

 var bitmaker = {lat: 43.647649, lng: -79.387131};
 // var operaHouse = {lat: 43.659213, lng: -79.348781};
 var brampton = {lat: 43.698739, lng: -79.781257};
 var rich = {lat: 43.887714, lng: -79.438603};
 var markers = [bitmaker, brampton, rich];
 var locations = [
         [43.643482, -79.387143],
        //  [43.659213, -79.348781],
         [43.725611, -79.452116],
         [43.775479, -79.257900]];

// Creates map and sets starting view and zoom
var map = new google.maps.Map(document.getElementById('map'), {
   center: {lat: 43.6532, lng: -79.3832},
   zoom: 11
 });

//  Places markers on all location in 'markers'
// for (var i = 0; i < markers.length; i++) {
//   var marker = new google.maps.Marker({
//      position: markers[i],
//      map: map
//    });
//   };

//  Creates rectangular boundary using all cooridates in 'locations'
  var bound = new google.maps.LatLngBounds();
   for (i = 0; i < locations.length; i++) {
   bound.extend( new google.maps.LatLng(locations[i][0], locations[i][1]) );
 };

// Finds center point of recanglular boundary created above and places marker. Stores center location in 'center'
  var center = { lng: parseFloat(bound.getCenter().lng()), lat: parseFloat(bound.getCenter().lat())};
  var marker = new google.maps.Marker({
    position: center,
    map: map
  });

// Initializes directions services
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;

// Changes display parameters of map (may not need one at start?)
  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var awal = new google.maps.LatLng(center);
    var mapOptions = {
      zoom: 11,
      center: awal
    }
    // map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // directionsDisplay.setMap(map);
    var i;
      directionsServices = [];
      directionsDisplays = [];
      for (i = 0; i < locations.length; i++) {
        directionsServices[i] = new google.maps.DirectionsService();
        var start = new google.maps.LatLng(locations[i][0], locations[i][1]);
        // var end = new google.maps.LatLng(locations[2][0], locations[2][1]);

        var request = {
            origin: start,
            destination: center,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        };

          directionsServices[i].route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplays.push(new google.maps.DirectionsRenderer({preserveViewport:true}));
            directionsDisplays[directionsDisplays.length-1].setMap(map);
            directionsDisplays[directionsDisplays.length-1].setDirections(response);
          } else alert("Directions request failed:"+status);
        });
      }}

      google.maps.event.addDomListener(window, 'load', initialize);

// Takes center point and creates radius as well as searches establishments within radius
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

// Geocoder works, inputing an address will result in longitude and latitude as a return
  var geocoder = new google.maps.Geocoder();
  var address = '27 Garcia Street, Markham ON, Canada L3R 4R8';

  if (geocoder) {
     geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        var address_lng = results[0].geometry.viewport.b.b;
        var address_lat = results[0].geometry.viewport.f.b;
        var address_geo = [address_lat, address_lng];
        // console.log(address_geo);
        var marker = new google.maps.Marker({
          map: map,
          position: address_geo
        });
        }
        else {
           console.log("Geocoding failed: " + status);
        }
     });
  }

}
