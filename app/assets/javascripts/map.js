document.addEventListener("DOMContentLoaded", function(){

  var token = $('meta[name=csrf-token]').attr('content');
  $.ajaxSetup({
    beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-TOKEN', token);
    }
  });

  // function initMap(){
  window.initMap = function() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 43.6532, lng: -79.3832 },
      zoom: 11
    });
    var infoWindow = new google.maps.InfoWindow;
    var geocoder = new google.maps.Geocoder();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(pos)
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
        var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);

          var marker2 = new google.maps.Marker({
            map: map,
            position: currentLocation,
            icon: '/crown2.png',
            animation: dropdown,
          });

          var options = {
            zoom: 13,
            center: currentLocation,
          }

        map = new google.maps.Map(document.getElementById('map'), options);
      });
    } else {
    // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
      console.log('failed navigator')
    }




    // Note: This example requires that you consent to location sharing when
          // prompted by your browser. If you see the error "The Geolocation service
          // failed.", it means you probably did not give permission for the browser to
          // locate you.
    // var map, infoWindow;
    // function initMap() {
    //   map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: -34.397, lng: 150.644},
    //     zoom: 6
    //   });
    //   infoWindow = new google.maps.InfoWindow;

    // Try geolocation.


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                             'Error: The Geolocation service failed.' :
                             'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }



  // Map options

    function handleSearchResults(results, status){
      console.log(results);

    for(var i = 0; i < results.length; i++){

      var marker = new google.maps.Marker({
        map:map,
        position: results[i].geometry.location,
        icon: '/crown4.png',
      });
    }

    function performSearch(){
      var request = {
        bounds: map.getBounds(),
        name: "parking",
      };
    }
    service.nearbySearch(request, handleSearchResults);
    // this ensures we wait until the map bounds are initialized before we perform the search
    google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);

    // draw circle on map
    var circleOptions = new google.maps.Circle({
      center:currentLocation,
      radius:20000,
      strokeColor:"#0000FF",
      strokeOpacity:0.8,
      strokeWeight:2,
      fillColor:"#0000FF",
      fillOpacity:0.4
    });
    circle = new googlemaps.Circle(circleOptions)
}
    function human_time(hours) {
      var suffix = hours >= 12 ? "PM":"AM";
      var time = ((hours + 11) % 12 + 1) + suffix;
      // console.log("inside human_time" + time)
      return time
    }

    $.ajax({
      url: 'http://localhost:3000/listing_markers',
      method: 'GET',
      dataType: 'json',
    }).done(function(results) {
      // var half = results.splice(5)
      // console.log(results.filter(function(item) {return item.latitude === null}))
      // navigator.geolocation.getCurrentPosition(initialize)

      // var currentLocation = new google.maps.latlng(location.coords.latitude, location.coords.longitude);

        results.filter(function(item) {return item.status === true}).forEach(function(result) {
          var content = '<div id="content">' +
            '<h2 class="listing_heading">' + result.name + '</h2>' +
            '<div class="content_body"><p><b>' + result.address + '</b></p>' +
            '<p><img src="' + result.image + '" alt="Listing Image"></p>' +
            '<p>Posted By: ' + result.user.first_name + ' ' + result.user.last_name + '</p>' +
            '<p>From: ' + human_time(result.start) + ' - ' + human_time(result.end) +
            '<a href="http://localhost:3000/listings/' + result.id + '/bookings/new">Book Now </a>' + '</p>' +
            '</div>';
        // console.log(content);
        var infowindow = new google.maps.InfoWindow({
          content: content
        });
        var marker = new google.maps.Marker({
          map: map,
          position: {lat: result.latitude, lng: result.longitude},
          icon: '/crown4.png'
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      })
    })

  }

});

        // geocoder.geocode({'address': result.address}, function(results, status) {
        //   if (status == 'OK') {
        //     console.log(results[0].geometry.location)
        //     $.ajax({
        //       url: "http://localhost:3000/listings/" + result.id,
        //       method: "PATCH",
        //       data: {
        //         no_turbolink: true,
        //         remote: true,
        //         listing: {
        //           latitude: results[0].geometry.location.lat(),
        //           longitude: results[0].geometry.location.lng()
        //         }
        //       }
        //     }).done(function(couch) {
        //       console.log("george is done" + couch)
        //     })
            // result.latitude = results[0].geometry.location.lat();
            // result.longitude = results[0].geometry.location.lng();
            // map.setCenter(results[0].geometry.location);

            //service = new google.maps.places.PlacesService(map);
          // } else {
          //   console.log('Geocode was not successful for the following reason: ' + status);
          // }
