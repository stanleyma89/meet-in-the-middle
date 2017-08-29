var map;

function initMap() {
 var bitmaker = {lat: 43.647649, lng: -79.387131};
 var operaHouse = {lat: 43.659213, lng: -79.348781};
 var brampton = {lat: 43.698739,lng: -79.781257};
 var rich = {lat: 43.887714,lng: -79.438603}
 var markers=[bitmaker,operaHouse,brampton,rich]
 var locations = [
         [43.647649, -79.387131],
         [43.659213, -79.348781],
         [43.698739, -79.781257],
         [43.887714, -79.438603]]


map = new google.maps.Map(document.getElementById('map'), {
   center: {lat: 43.6532, lng: -79.3832},
   zoom: 15
 });

for (var i = 0; i < markers.length; i++) {

  var marker = new google.maps.Marker({
     position: markers[i],
     map: map
   });
  }

  var bound = new google.maps.LatLngBounds();
   for (i = 0; i < locations.length; i++) {
   bound.extend( new google.maps.LatLng(locations[i][0], locations[i][1]) );
  }

// OTHER CODE
  console.log(parseFloat(bound.getCenter().lng()))
  var center={lng: parseFloat(bound.getCenter().lng()), lat: parseFloat(bound.getCenter().lat())}
  console.log(center)
  var marker = new google.maps.Marker({
    position: center,
    map: map
  });
}
