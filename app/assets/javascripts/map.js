var map;
var markers = [];
var slideVal = 500;
var locations = [];

// Initializes map

function initMap() {

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

  // Creates Point A and B search location bars + autocomplete.

  // Listens for autocomplete location bar A
  searchBarA();

  // Listens for autocomplete location bar B
  searchBarB();

  // Allows users to select radius range
  radiusSlider();

  // Allows for adding additional locations bars.
  additionalLocationBar();

  // Click function for submit button
  submitButton();

  // Creates a rectangular bound of all given locations, then finds center point and places a marker
  reload(locations);

  google.maps.event.addDomListener(window, 'load', initialize);

}
