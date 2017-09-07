var map;
var markers = [];
var slideVal = 500;


// Initializes map

function initMap() {
  var locations = [];
// Creates map and sets starting view and zoom
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.6532, lng: -79.3832},
    zoom: 11,
    styles: [
    {
        "featureType": "administrative.province",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#434242"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#434242"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#434242"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#0073ff"
            }
        ]
    }
]
  });

  var input = document.getElementById('pac-input');
  var output = document.getElementById('pac-output');
  var submit = document.getElementById('submit');

  var autocompleteA = new google.maps.places.Autocomplete(input);
  var autocompleteB = new google.maps.places.Autocomplete(output);

  // autocompleteA.bindTo('bounds', map);
  // autocompleteB.bindTo('bounds', map);

  // Allows users to select radius range

    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = (slider.value / 1000);
    slider.oninput = function() {
    slideVal = this.value;
    output.innerHTML = (this.value / 1000) ;
    }


  var addressContainer = document.getElementById("address-container");
  var add = document.getElementById("add");
  add.addEventListener("click", function(e){
    var addressList = document.createElement("li");
    var addressInput = document.createElement("input");
    var autocompleteC = new google.maps.places.Autocomplete(addressInput);
    autocomplete(autocompleteC);
    addressList.id = "address"
    addressInput.type = "text";
    addressInput.id = "pac-input";
    addressInput.className = "input-lg";
    addressInput.placeholder = "Add Address";
    addressList.append(addressInput);
    addressContainer.append(addressList);
  });



function autocomplete(autocompleteC) {
  autocompleteC.addListener('place_changed', function() {
    var lonLatC = [];


    var placeC = autocompleteC.getPlace();

    lonLatC.push(placeC.geometry.location.lat());
    lonLatC.push(placeC.geometry.location.lng());

    locations.push(lonLatC);
    var markerC = {lat: lonLatC[0], lng: lonLatC[1]};
    var marker = new google.maps.Marker({
      position: markerC,
      map: map
    });
    markers.push(marker);

    if (placeC.geometry.viewport) {
      map.fitBounds(placeC.geometry.viewport);
    } else {
      map.setCenter(placeC.geometry.viewport);
      map.setZoom(12);
    }
    // createMarker(lonLatC);
    // console.log(locations);
    // 
    // var markers = new google.maps.Marker({
    //   map: map,
    //   position: lonLatC
    // });
    // markers.setPosition(placeC.geometry.location);
    // markers.setVisible(true);

  })
}

////////////////////////////////////////////////////old code
// function initMap() {
//
// // Creates map and sets starting view and zoom
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 43.6532, lng: -79.3832},
//     zoom: 11
//   });
//
//   var input = document.getElementById('pac-input');
//   var output = document.getElementById('pac-output');
//   var submit = document.getElementById('submit');
//
//   var autocompleteA = new google.maps.places.Autocomplete(input);
//   var autocompleteB = new google.maps.places.Autocomplete(output);
//
//   // autocompleteA.bindTo('bounds', map);
//   // autocompleteB.bindTo('bounds', map);
//
//   var locations = [];
//
//   // Allows users to select radius range
//
//   var slider = document.getElementById("myRange");
//   var output = document.getElementById("demo");
//   output.innerHTML = slider.value;
//   slider.oninput = function() {
//   output.innerHTML = this.value;
//   slideVal = this.value;
//   }
//
///////////////////////////////////////////////////////////////old code
  autocompleteA.addListener('place_changed', function() {
    var lonLatA = [];


    var placeA = autocompleteA.getPlace();

    lonLatA.push(placeA.geometry.location.lat());
    lonLatA.push(placeA.geometry.location.lng());

    locations.push(lonLatA);
    var markerA = {lat: lonLatA[0], lng: lonLatA[1]};
    var marker = new google.maps.Marker({
      position: markerA,
      map: map
    });
    markers.push(marker);

    if (placeA.geometry.viewport) {
      map.fitBounds(placeA.geometry.viewport);
    } else {
      map.setCenter(placeA.geometry.viewport);
      map.setZoom(15);
    }

    console.log(locations);

  })

  autocompleteB.addListener('place_changed', function() {

  var lonLatB = [];

    var placeB = autocompleteB.getPlace();


    lonLatB.push(placeB.geometry.location.lat());
    lonLatB.push(placeB.geometry.location.lng());


    locations.push(lonLatB);

    var markerB = {lat: lonLatB[0], lng: lonLatB[1]};
    var marker = new google.maps.Marker({
      position: markerB,
      map: map
    });
    markers.push(marker);
    //  console.log(locations);
    //  initMap(locations)
    // reload(locations);

    if (placeB.geometry.viewport) {
      map.fitBounds(placeB.geometry.viewport);
    } else {
      map.setCenter(placeB.geometry.viewport);
      map.setZoom(15);
    }




    submit.addEventListener('click', function(){

      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
      markers = [];

      var center = reload(locations);
      var categories = document.getElementById("categories");
      var categoryValue = categories.options[categories.selectedIndex].value;


      $.ajax({
        url: '/home',
        method: 'GET',
        data: { 'lat': center["lat"], 'lng': center["lng"], 'radius': slideVal, 'term': categoryValue},
        dataType: 'json'
      }).always(function(data) {
          console.log(data);

          var businessName = [];
          var businessPic = [];

          for (var i = 0; i < data.businesses.length; i++) {
          var ul = document.querySelector('#yelp_info');
          var li = document.createElement('li');
          var img = document.createElement('img');
          var pName = document.createElement('p');
          var pAddress = document.createElement('p');
          var pPhone = document.createElement('p');
          var pPrice = document.createElement('p');
          var pRating = document.createElement('p');
          var pType = document.createElement('p');
          var pUrl = document.createElement('p');
          img.src = data.businesses[i].image_url;
          pName.innerHTML = data.businesses[i].name;
          pType.innerHTML = data.businesses[i].categories[0]["title"];
          pAddress.innerHTML = data.businesses[i].location.display_address;
          pPhone.innerHTML = data.businesses[i].display_phone;
          pUrl.innerHTML = data.businesses[i].url;
          pPrice.innerHTML = data.businesses[i].price;
          pRating.innerHTML = data.businesses[i].rating;
          li.append(img);
          ul.append(li);
          ul.append(pName);
          ul.append(pType);
          ul.append(pPhone);
          ul.append(pAddress);
          ul.append(pUrl);
          ul.append(pPrice);
          ul.append(pRating);

          var yelpLat = data.businesses[i].coordinates.latitude;
          var yelpLong = data.businesses[i].coordinates.longitude;


          businessName.push(data.businesses[i].name);
          businessPic.push(data.businesses[i].image_url);


          var infowindow = new google.maps.InfoWindow();

          var marker, i;

          for (i = 0; i < businessName.length; i++) {

            var myLatlng = {lat: yelpLat, lng: yelpLong};

            var marker = new google.maps.Marker({
              position: myLatlng,
              map: map,
            });

            marker.setMap(map);

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent('<p><strong>' + businessName[i] + '</strong></p><br><IMG BORDER="0" ALIGN="Left" WIDTH="150px" SRC="' + businessPic[i] + '">');
                infowindow.open(map, marker);
              }
            })(marker, i));
          }

          // console.log(yelpBusinessName);

        }

    });

    var marker = new google.maps.Marker({
      position: center,
      map: map,
    });

    var circle = new google.maps.Circle({
      map: map,
      radius: slideVal * 2,    // 10 miles in metres
      fillColor: '#AA0000'
    });
    circle.bindTo('center', marker, 'position');

  })

});


  function reload(locations) {
    // console.log(locations);
  //  Creates rectangular boundary using all cooridates in 'locations'
    var bound = new google.maps.LatLngBounds();
     for (i = 0; i < locations.length; i++) {
     bound.extend( new google.maps.LatLng(locations[i][0], locations[i][1]) );
     map.fitBounds(bound);
   };

  // Finds center point of recanglular boundary created above and places marker. Stores center location in 'center'
    var center = { lng: parseFloat(bound.getCenter().lng()), lat: parseFloat(bound.getCenter().lat())};
    // console.log(center);
    var centerMarker = new google.maps.Marker({
      position: center,
      map: map

    });

    // infowindow = new google.maps.InfoWindow();
    // var service = new google.maps.places.PlacesService(map);
    //   service.nearbySearch({
    //     location: center,
    //     radius: 1000,
    //     type: ['restaurant'],
    //   }, callback);
    //
    // function callback(results, status) {
    //   if (status === google.maps.places.PlacesServiceStatus.OK) {
    //     for (var i = 0; i < results.length; i++) {
    //       createMarker(results[i]);
    //       // console.log(results[i]);
    //     }
    //   }
    // }
    //
    // function createMarker(place) {
    //   var placeLoc = place.geometry.location;
    //   var markers = new google.maps.Marker({
    //     map: map,
    //     position: place.geometry.location
    //   });
    //
    //   google.maps.event.addListener(markers, 'click', function() {
    //     infowindow.setContent(place.name);
    //     infowindow.open(map, this);
    //   });
    // }
    //
    // function setMapOnAll(map) {
    //   for (var i = 0; i < markers.length; i++) {
    //     markers[i].setMap(map);
    //   }
    // }



    initialize(center, centerMarker);
    return center;
}


// moved inside initialize function()
// var directionsDisplay;
// var directionsService = new google.maps.DirectionsService();


// Changes display parameters of map (may not need one at start?)
  function initialize(center, centerMarker) {

  // Initializes directions services
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();

    directionsDisplay = new google.maps.DirectionsRenderer();

    var awal = new google.maps.LatLng(center);
    var mapOptions = {
      zoom: 11,
      center: awal
    };
    // map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // directionsDisplay.setMap(map);
    //function clearMarkers() {



    var i;
      directionsServices = [];
      directionsDisplays = [];
      for (i = 0; i < locations.length; i++) {
        directionsServices[i] = new google.maps.DirectionsService();
        var start = new google.maps.LatLng(locations[i][0], locations[i][1]);

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
  // infowindow = new google.maps.InfoWindow();
  // var service = new google.maps.places.PlacesService(map);
  //   service.nearbySearch({
  //     location: center,
  //     radius: 1000,
  //     type: ['restaurant'],
  //   }, callback);
  //
  //
  // function callback(results, status) {
  //   var photos = [];
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     for (var i = 0; i < results.length; i++) {
  //       createMarker(results[i]);
  //       // photos.push(results[i].photos)
  //     }
  //   }
  // }
  //
  //
  // function createMarker(place) {
  //   var placeLoc = place.geometry.location;
  //   var marker = new google.maps.Marker({
  //     map: map,
  //     position: place.geometry.location
  //   });
  //
  //   google.maps.event.addListener(marker, 'click', function() {
  //     infowindow.setContent(place.name);
  //     infowindow.open(map, this);
  //   });
  // }
  //
  // var circle = new google.maps.Circle({
  //   map: map,
  //   radius: 1000,    // 10 miles in metres
  //   fillColor: '#AA0000 '
  // });
  // circle.bindTo('center', marker, 'position');

// Geocoder works, inputing an address will result in longitude and latitude as a return
  // var geocoder = new google.maps.Geocoder();
  // var address = '27 Garcia Street, Markham ON, Canada L3R 4R8';
  //
  // if (geocoder) {
  //    geocoder.geocode({ 'address': address }, function (results, status) {
  //       if (status == google.maps.GeocoderStatus.OK) {
  //       var address_lng = results[0].geometry.viewport.b.b;
  //       var address_lat = results[0].geometry.viewport.f.b;
  //       var address_geo = [address_lat, address_lng];
  //       var marker = new google.maps.Marker({
  //         map: map,
  //         position: address_geo
  //       });
  //       }
  //       else {
  //          console.log("Geocoding failed: " + status);
  //       }
  //    });
  // }

  // $.ajax({
  //   url: "https://api.yelp.com/oauth2/token",
  //   method: 'POST',
  //   data: {
  //     grant_type: "client_credentials",
  //     client_id: "MzSVn3KS16HXnD_sGY76-A",
  //     client_secret: "J3Zebm26hesPxF8qPtXhcpoflu4Xfu5vO0D1Wd2uDvn1IeQHB0Sie8ta6VTl6G4E"
  //   },
  //   dataType: 'json'
  // }).always(function(data) {
  //     console.log('Hello');
  //     console.log(data);
  // });
// var access_token ="dq3yg5i2xGXpNc20jpr9aLkt7VFIyXnIM4srHkgs52DnLL14ZVHEmc4uf03Kzd8iJ3GbeJ-go4A7PsUlCnyEg3EfamrgXuznWaVykxtUCCuXV53GZlQqSsFfIV-oWXYx"



}
