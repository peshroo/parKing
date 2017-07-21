document.addEventListener("DOMContentLoaded", function(){

  // function initMap(){
  window.initMap = function() {
  // Map options
    var options = {
      zoom: 14,
      center: {lat: 43.6532, lng: -79.3832}
    }

    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Listen for click on map
    google.maps.event.addListener(map, 'click',
    function(event){

    // Add marker
      addMarker({coords:event.latlng});
    });

    // // Add marker
    // var marker = new google.maps.Marker({
    // position:{lat:43.6532,lng:-79.3832},
    // map:map,
    // icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    // });
    //
    // var infoWindow = new google.maps.InfoWindow({
    //   content:'<h1>Greatest City In The World</h1>'
    // });
    //
    // marker.addListener('click', function(){
    //   infoWindow.open(map, marker)
    // });

    infoWindow = new google.maps.InfoWindow;

    // // Try HTML5 geolocation.
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //       var pos = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //       };
    //
    //       infoWindow.setPosition(pos);
    //       infoWindow.setContent('Location found.');
    //       infoWindow.open(map);
    //       map.setCenter(pos);
    //     }, function() {
    //       handleLocationError(true, infoWindow, map.getCenter());
    //     });
    //   } else {
    //     // Browser doesn't support Geolocation
    //     handleLocationError(false, infoWindow, map.getCenter());
    //   }
    // }
    //
    // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    //   infoWindow.setPosition(pos);
    //   infoWindow.setContent(browserHasGeolocation ?
    //                         'Error: The Geolocation service failed.' :
    //                         'Error: Your browser doesn\'t support geolocation.');
    //   infoWindow.open(map);
    //

    // Array of markers
    var markers = [
      {
        coords:{lat:43.6472,lng:-79.3872},
        iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        content:'<h1>Bitmaker</h1>',
      },
      {
        coords:{lat:43.6426,lng:-79.3871},
        content:'<h1>CN Tower</h1>',
      },
      {
        coords:{lat:43.6452,lng:-79.3806},
        content:'<h1>Union Station</h1>',
      },
      {
        coords:{lat:43.6560,lng:-79.3802},
        content:'<h1>Dundas Square</h1>',
      }
    ];

    // Loop through markers
    for(var i = 0; i< markers.length; i++){
      // Add marker
      addMarker(markers[i]);
    };

    // Add marker function
    function addMarker(props){
      var marker = new google.maps.Marker({
      position:props.coords,
      icon: '/assets/crown4.png',
      map:map,
      // icon:props.iconImage
    });

    // Check for custom icon
    if(props.iconImage){
      // set icon image
      marker.setIcon(props.iconImage);
    }

    // Check content
    if(props.content){
      var infoWindow = new google.maps.InfoWindow({
        content:props.content
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker)
      });
    }
  }
}
});
