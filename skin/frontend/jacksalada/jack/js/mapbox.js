function initialize() {
  var rio = new google.maps.LatLng(-22.9394884,-43.2179575);

  var blueEssence = [
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e0efef"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#1900ff"
            },
            {
                "color": "#c0e8e8"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 700
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#7dcdcd"
            }
        ]
    }
  ];

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(blueEssence,
    {name: "Blue Essence"});

  var mapOptions = {
    zoom: 12,
    center: rio,
    mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style'],
      position: google.maps.ControlPosition.TOP_LEFT
    },
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.LEFT_CENTER
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
    }
  }
  var map = new google.maps.Map(document.getElementById('map'),
    mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  setMarkers(map, stores);
}

/**
 * Data for the markers consisting of a name, a LatLng and a zIndex for
 * the order in which these markers should display on top of each
 * other.
 */
var stores = [
  ['Jack Salada - São José', -22.905166, -43.174810, 4],
  ['Jack Salada - Copacabana', -22.971280, -43.189140, 5],
  ['Jack Salada - Ipanema', -22.983291, -43.203860, 3],
  ['Jack Salada - Botafogo', -22.947215, -43.184205, 2]
];

function setMarkers(map, locations) {
  // Add markers to the map

  // Marker sizes are expressed as a Size of X,Y
  // where the origin of the image (0,0) is located
  // in the top left of the image.

  // Origins, anchor positions and coordinates of the marker
  // increase in the X direction to the right and in
  // the Y direction down.
  var image = {
    url: './assets/images/marker.svg',
    // This marker is 20 pixels wide by 32 pixels tall.
    //size: new google.maps.Size(20, 32),
    // The origin for this image is 0,0.
    //origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    //anchor: new google.maps.Point(0, 32)
  };
  // Shapes define the clickable region of the icon.
  // The type defines an HTML &lt;area&gt; element 'poly' which
  // traces out a polygon as a series of X,Y points. The final
  // coordinate closes the poly by connecting to the first
  // coordinate.
  var shape = {
      coords: [1, 1, 1, 20, 18, 20, 18 , 1],
      type: 'poly'
  };



  function convertToSlug(textConvert) {
    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
      textConvert = textConvert
      .replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
      .toLowerCase()
      .replace(/ /g,'-')
      .replace(/-+/g, '-');
    }

    // textConvert = textConvert.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    //   .replace(/\s+/g, '-') // collapse whitespace and replace by -
    //   .replace(/-+/g, '-'); // collapse dashes

    return textConvert;
  }

  for (var i = 0; i < locations.length; i++) {
    var store = locations[i];
    var myLatLng = new google.maps.LatLng(store[1], store[2]);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image,
        shape: shape,
        title: store[0],
        zIndex: store[3]
    });

    //var titleMarker = this.getTitle();

    google.maps.event.addListener(marker, 'click', function() {
      $('.modal-push:visible').slideUp();
      $('#modal-' + convertToSlug(this.getTitle())).not(':visible').slideDown();
      $('#footer').toggleClass('hidden-tmp');
      // console.log('#modal-' + convertToSlug(this.getTitle()));

      // Center the map when click on Marker
      map.panTo(this.getPosition());;
      map.setZoom(17);
    });

    // do something only the first time the map is loaded
    google.maps.event.addListenerOnce(map, 'idle', function() {
      setTimeout(function(){
        $('body').addClass('map-loaded');
      }, 3000);
    });
  }
}

$('#map').css({
  height: heightDocument
});
$('#filter-stores').css({
  top: heightHeader
});

google.maps.event.addDomListener(window, 'load', initialize);
