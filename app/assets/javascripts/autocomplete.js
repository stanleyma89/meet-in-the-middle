function searchBarA() {

  var input = document.getElementById('pac-input');
  var autocompleteA = new google.maps.places.Autocomplete(input);

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

  })
}

function searchBarB() {

  var output = document.getElementById('pac-output');
  var autocompleteB = new google.maps.places.Autocomplete(output);

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

  });

}

function additionalLocationBar() {

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

}

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
