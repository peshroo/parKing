document.addEventListener("DOMContentLoaded", function(){

  var token = $('meta[name=csrf-token]').attr('content');
  $.ajaxSetup({
    beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-TOKEN', token);
    }
});
  // function initMap(){
  window.initMap = function() {
    if (document.getElementById('map')) {

  // Map options
    var options = {
      zoom: 13,
      center: {lat: 43.6532, lng: -79.3832}
    }

    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);
    var infoWindow = new google.maps.InfoWindow;
    var geocoder= new google.maps.Geocoder();

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
      results.filter(function(item) {return item.status === true}).forEach(function(result) {
        var content = '<div id="content">' +
          '<h2 class="listing_heading">' + result.name + '</h2>' +
          '<div class="content_body"><p><b>' + result.address + '</b></p>' +
          '<p><img src="' + result.image + '" alt="Listing Image" height="150" width="250"></p>' +
          '<p>Posted By: ' + result.user.first_name + ' ' + result.user.last_name + '</p>' +
          '<p>From: ' + human_time(result.start) + ' - ' + human_time(result.end) +
          '<a href="/listings/' + result.id + '">Book Now </a>' + '</p>' +
          '</div>';
        // console.log(content);
        var infowindow = new google.maps.InfoWindow({
          content: content
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
            var marker = new google.maps.Marker({
              map: map,
              position: { lat: result.latitude, lng: result.longitude }
              // position: results[0].geometry.location
            });
            marker.addListener('click', function() {
              infowindow.open(map, marker);
            });
          // } else {
          //   console.log('Geocode was not successful for the following reason: ' + status);
          // }
        // })
        })
      })
    }
    }
});
    // var script = document.createElement('script');
    // // This example uses a local copy of the GeoJSON stored at
    // // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    // script.src = 'localhost:3000/listing_markers.json';
    // document.getElementsByTagName('head')[0].appendChild(script);
    // // Listen for click on map
    // google.maps.event.addListener(map, 'click',
    // function(event){
    //
    // // Add marker
    //   addMarker({coords:event.latlng});
    // });

    // Add marker
    // var marker = new google.maps.Marker({
    // position:{lat:43.6532,lng:-79.3832},
    // map: map,
    // icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    // });
    // //
    // var infoWindow = new google.maps.InfoWindow({
    //   content:'<h1>Greatest City In The World</h1>'
    // });
    //
    // marker.addListener('click', function(){
    //   infoWindow.open(map, marker)
    // });


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
    // var markers = [
    //   {
    //     coords:{lat:43.6472,lng:-79.3872},
    //     iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    //     content:'<h1>Bitmaker</h1>',
    //   },
    //   {
    //     coords:{lat:43.6426,lng:-79.3871},
    //     content:'<h1>CN Tower</h1>',
    //   },
    //   {
    //     coords:{lat:43.6452,lng:-79.3806},
    //     content:'<h1>Union Station</h1>',
    //   },
    //   {
    //     coords:{lat:43.6560,lng:-79.3802},
    //     content:'<h1>Dundas Square</h1>',
    //   }
    // ];
    //
    // Loop through markers.
    // geocoder.geocode({'address': '422 Bathurst St, Toronto, ON, Canada'}, function(results, status) {
    //   map.setCenter(results[0].geometry.location);
    //   var marker = new google.maps.Marker({
    //     map: map,
    //     position: results[0].geometry.location
    //   });
    //   console.log(results)
    // })
    //
    // window.eqfeed_callback = function(results) {
    //        for (var i = 0; i < results.length; i++) {
    //          var coords = results.features[i].geometry.coordinates;
    //          var latLng = new google.maps.LatLng(coords[1],coords[0]);
    //          var marker = new google.maps.Marker({
    //            position: latLng,
    //            map: map
    //          });
    //        }
    //      }
    // Check for custom icon
    // if(props.iconImage){
    //   // set icon image
    //   marker.setIcon(props.iconImage);
    // }
    //
    // // Check content
    // if(props.content){
    //   var infoWindow = new google.maps.InfoWindow({
    //     content:props.content
    //   });
    //
    //   marker.addListener('click', function(){
    //     infoWindow.open(map, marker)
    //   });
    // }
