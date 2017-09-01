var map;


  $.ajax({
    url: '/home',
    method: 'GET',
    dataType: 'json'
  }).always(function(data) {
      console.log(data);
      for (var i = 0; i < data.businesses.length; i++) {
      var ul = document.querySelector('ul');
      var li = document.createElement('li');
      var img = document.createElement('img');
      img.src = data.businesses[i].image_url;
      li.append(img);
      ul.append(li);
    }

  });

// Initializes map
function initMap() {

// Creates map and sets starting view and zoom
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.6532, lng: -79.3832},
    zoom: 11
  });

  var input = document.getElementById('pac-input');
  var output = document.getElementById('pac-output');
  var submit = document.getElementById('submit');

  var autocompleteA = new google.maps.places.Autocomplete(input);
  var autocompleteB = new google.maps.places.Autocomplete(output);

  autocompleteA.bindTo('bounds', map);
  autocompleteB.bindTo('bounds', map);

  var locations = [];

  autocompleteA.addListener('place_changed', function() {
    var lonLatA = [];

    var placeA = autocompleteA.getPlace();

    lonLatA.push(placeA.geometry.viewport.f.b);
    lonLatA.push(placeA.geometry.viewport.b.b);

    locations.push(lonLatA);

    if (placeA.geometry.viewport) {
      map.fitBounds(placeA.geometry.viewport);
    } else {
      map.setCenter(placeA.geometry.viewport);
      map.setZoom(17);
    }

    console.log(locations);

  })

  autocompleteB.addListener('place_changed', function() {

  var lonLatB = [];

    var placeB = autocompleteB.getPlace();


    lonLatB.push(placeB.geometry.viewport.f.b);
    lonLatB.push(placeB.geometry.viewport.b.b);


    locations.push(lonLatB);

     console.log(locations);
    //  initMap(locations)
    // reload(locations);

    if (placeB.geometry.viewport) {
      map.fitBounds(placeB.geometry.viewport);
    } else {
      map.setCenter(placeB.geometry.viewport);
      map.setZoom(17);
    }


    submit.addEventListener('click', function(){
      reload(locations);
    })

  });

  function reload(locations) {
    // console.log(locations);
  //  Creates rectangular boundary using all cooridates in 'locations'
    var bound = new google.maps.LatLngBounds();
     for (i = 0; i < locations.length; i++) {
     bound.extend( new google.maps.LatLng(locations[i][0], locations[i][1]) );
   };

  // Finds center point of recanglular boundary created above and places marker. Stores center location in 'center'
    var center = { lng: parseFloat(bound.getCenter().lng()), lat: parseFloat(bound.getCenter().lat())};
    // console.log(center);
    var centerMarker = new google.maps.Marker({
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
          // console.log(results[i]);
        }
      }
    }

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var markers = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(markers, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }

    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }



    // var circle = new google.maps.Circle({
    //   map: map,
    //   radius: 1000,
    //   fillColor: '#AA0000'
    // });
    // circle.bindTo('center', markers, 'position');

    initialize(center, centerMarker);
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
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: center,
      radius: 1000,
      type: ['restaurant'],
    }, callback);


  function callback(results, status) {
    var photos = [];
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        // photos.push(results[i].photos)
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
