var map;
var markers = [];
var slideVal = 500;


// Initializes map

function initMap() {

  var locations = [];

// Creates map and sets starting view and zoom. Styles allows for custom map styles.
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


  // Creates Point A and B search location bars + autocomple.

  var input = document.getElementById('pac-input');
  var output = document.getElementById('pac-output');
  var submit = document.getElementById('submit');

  var autocompleteA = new google.maps.places.Autocomplete(input);
  var autocompleteB = new google.maps.places.Autocomplete(output);


  // Allows users to select radius range

  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = (slider.value / 1000);
  slider.oninput = function() {
  slideVal = this.value;
  output.innerHTML = (this.value / 1000) ;
  }

  // Allows for adding additional locations bars.

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
      console.log(placeC);
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

  })
}

  // Listens for autocomplete location bar A

  autocompleteA.addListener('place_changed', function() {
    var lonLatA = [];


    var placeA = autocompleteA.getPlace();
    console.log(placeA);
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

  })

  // Listens for autocomplete location bar B

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

    if (placeB.geometry.viewport) {
      map.fitBounds(placeB.geometry.viewport);
    } else {
      map.setCenter(placeB.geometry.viewport);
      map.setZoom(15);
    }


    // Click function for submit button

    submit.addEventListener('click', function(){

      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
      markers = [];

      var center = reload(locations);
      var categories = document.getElementById("categories");
      var categoryValue = categories.options[categories.selectedIndex].value;

      //Ajax call to rails server to get Yelp api info

      $.ajax({
        url: '/map',
        method: 'GET',
        data: { 'lat': center["lat"], 'lng': center["lng"], 'radius': slideVal, 'term': categoryValue},
        dataType: 'json'
      }).always(function(data) {
          console.log(data);

          var businessName = [];
          var businessPic = [];
          var businessId = [];

          // Collects Yelp data and places in DOM elements

          for (var i = 0; i < data.businesses.length; i++) {
            var divYelpInfo = document.querySelector('#yelp_info');
            var divYelpList = document.createElement('div');
            var starContainer = document.createElement('div');
            starContainer.className = 'star-ratings-sprite';
            var stars = document.createElement('span');
            stars.className = 'star-ratings-sprite-rating';

            var img = document.createElement('img');
            img.className = "border";
            var pName = document.createElement('h4');
            var pAddress = document.createElement('p');
            var pPhone = document.createElement('p');
            var pPrice = document.createElement('p');
            var pRating = document.createElement('p');
            var pType = document.createElement('p');
            var pUrl = document.createElement('a');

            divYelpList.className = "yelplistdiv"
            pUrl.href = data.businesses[i].url;
            pUrl.target = "_blank";
            img.width = "300";
            img.height = "300";

            // Replaces blank images locations with default "no image pic"
            if (data.businesses[i].image_url) {
              img.src = data.businesses[i].image_url;
            } else {
              img.src = "http://skolarships.com/admin/scholarship_images/no-img.jpg"
            }
            pName.innerHTML = data.businesses[i].name.bold();
            pName.id = data.businesses[i].id;
            pType.innerHTML = data.businesses[i].categories[0]["title"];
            pAddress.innerHTML = "➤ "+data.businesses[i].location.display_address;
            pPhone.innerHTML = "☎ "+data.businesses[i].display_phone.substr(2);
            pPrice.innerHTML = data.businesses[i].price;
            pRating.innerHTML = data.businesses[i].rating;
            pRating.innerText = (pRating.innerText / 5.0) * 100;
            stars.style.width = pRating.innerText + "%";
            starContainer.append(stars);
            divYelpList.append(img);
            divYelpList.append(pName);
            divYelpList.append(pType);
            divYelpList.append(pPhone);
            divYelpList.append(pAddress);
            divYelpList.append(starContainer);
            pUrl.append(divYelpList);
            divYelpInfo.append(pUrl);

            // Stores Yelp results locations
            var yelpLat = data.businesses[i].coordinates.latitude;
            var yelpLong = data.businesses[i].coordinates.longitude;


            businessName.push(data.businesses[i].name);
            businessPic.push(data.businesses[i].image_url);
            businessId.push(data.businesses[i].id);

            var infowindow = new google.maps.InfoWindow();

            var marker, i;

            // Places markers on map based on Yelp results
            for (i = 0; i < businessName.length; i++) {

              var myLatlng = {lat: yelpLat, lng: yelpLong};
              var marker = new google.maps.Marker({
                  position: myLatlng,
                  map: map,
                });

              marker.setMap(map);

              // Function for adding pics and names to marker infowindow
              google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                  var div = document.createElement('div');
                  var name = document.createElement('p');
                  var img = document.createElement('img');
                  var a = document.createElement('a');

                  if (businessPic[i]) {
                    img.src = businessPic[i];
                  } else {
                    img.src = "http://skolarships.com/admin/scholarship_images/no-img.jpg";
                  }

                  img.align = "left";
                  img.style.width = "150px";
                  img.style.height = "150px";
                  img.border = "2px";
                  name.innerHTML = businessName[i].bold();

                  div.appendChild(name);
                  div.append(img);


                  infowindow.setContent(div.innerHTML);
                  infowindow.open(map, marker);
                  console.log(img, name, a );
                }
              })(marker, i));
            }
        }
    });

    // Places makers on center point of all locations
    var marker = new google.maps.Marker({
      position: center,
      map: map,
    });

    // Places radius around center markers. Radius value is taken from radius slider
    var circle = new google.maps.Circle({
      map: map,
      radius: slideVal * 2,    // 10 miles in metres
      fillOpacity: 0.1,
      fillColor: '#AA0000'
    });
    circle.bindTo('center', marker, 'position');

  })

});


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

}
