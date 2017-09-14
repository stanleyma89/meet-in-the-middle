function submitButton() {

  var submit = document.getElementById('submit');

  submit.addEventListener('click', function() {

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
}
