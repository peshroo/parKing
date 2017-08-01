document.addEventListener("DOMContentLoaded", function(){

  var token = $('meta[name=csrf-token]').attr('content');
  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-CSRF-TOKEN', token);
    }
  });
  function getAvg(array) {
    return array.reduce(function (p, c) {
      return p + c;
    }) / array.length;
  }
  $.fn.stars = function() {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        val = Math.round(val * 2) / 2; /* To round to nearest half */
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
  }

  // function initMap(){
  window.initMap = function() {
    if (document.getElementById('map')) {
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
      //
      // // Map options
      // var options = {
      //   zoom: 13,
      //   center: {lat: 43.6532, lng: -79.3832}
      // }
      //
      // // New map
      // var map = new google.maps.Map(document.getElementById('map'), options);
      // var infoWindow = new google.maps.InfoWindow;
      // var geocoder= new google.maps.Geocoder();

      function human_time(hours) {
        var suffix = hours >= 12 ? "PM":"AM";
        var time = ((hours + 11) % 12 + 1) + suffix;
        // console.log("inside human_time" + time)
        return time
      }

      $.ajax({
        url: '/listing_markers',
        method: 'GET',
        dataType: 'json',
      }).done(function(results) {
        // var half = results.splice(5)
        // console.log(results.filter(function(item) {return item.latitude === null}))

        results.filter(function(item) {return item.status === true}).forEach(function(result) {
          var ratingArray = result.reviews.map(function(review) {
            return review.rating
          })
          if (ratingArray.length) {
            var theAvg = getAvg(ratingArray)
          } else {
            var theAvg = 0
          }
          var content = '<div id="content">' +
          '<h2 class="listing_heading">' + result.name + '</h2>' +
          '<div class="content_body"><p><b>' + result.address + '</b></p>' +
          '<p>Rating: <span class="stars">' + theAvg + '</span></p>' +
          // '<p><img src="' + result.image.url(:medium) + '" alt="Listing Image" height="150" width="250"></p>' +
          '<p>Posted By: ' + result.user.first_name + ' ' + result.user.last_name + '</p>' +
          '<p>From: ' + human_time(result.start) + ' - ' + human_time(result.end) +
          '<a href="/listings/' + result.id + '">Book Now </a>' + '</p>' +
          '</div>';
          $('span.stars').stars();
          console.log(ratingArray)
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
              position: { lat: result.latitude, lng: result.longitude },
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
    } else if (document.getElementById('new_listing_map')) {
      var options = {
        zoom: 13,
        center: {lat: 43.6532, lng: -79.3832}
      }
      var map = new google.maps.Map(document.getElementById('new_listing_map'), options);
      var listingAddress = document.getElementById('listing_address')
      var input = document.getElementById('pac-input');
      var card = document.getElementById('pac-card');
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
      var infowindow = new google.maps.InfoWindow();

      var infowindowContent = document.getElementById('infowindow-content');

      var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo('bounds', map);
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });
        autocomplete.addListener('place_changed', function() {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
          if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
          }
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }
          console.log('Hi');
          listingAddress.value = address;
          // var addressField = document.querySelector('#listing_address').value
          // geocoder.geocode({'address': address}, function(results, status) {
          //     console.log(results[0].geometry.location.lat())
          //     if (status === 'OK') {
          //       document.querySelector('#new_listing input[id="listing_latitude"]').value = results[0].geometry.location.lat()
          //       document.querySelector('#new_listing input[id="listing_longitude"]').value = results[0].geometry.location.lng()
          //     }
          //   })
          infowindowContent.children['place-icon'].src = place.icon;
          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-address'].textContent = address;
          infowindowContent.style.display = 'block'
          infowindow.setContent(infowindowContent);
          infowindow.open(map, marker);
        });
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
