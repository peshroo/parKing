document.addEventListener('DOMContentLoaded', function() {
  var toggles = document.querySelectorAll('.switch > input[type="checkbox"]')
  toggles.forEach(function(checkbox) {
    if (checkbox.checked) {
      checkbox.parentElement.parentElement.classList.remove('off')
    } else {
      checkbox.parentElement.parentElement.classList.remove('off')
      checkbox.parentElement.parentElement.classList.add('off')
    }
  })

  var listingsDiv = document.querySelector('.userlistings_container')
  document.addEventListener('click', function(e) {
    if ( listingsDiv && e.target.classList.contains('toggler')) {
      if (e.target.checked === false) {

      console.log(e.target.checked)
      $.ajax({
          url: '/listings/' + e.target.parentElement.firstElementChild.value,
          method: 'PATCH',
          data: {
            no_turbolink: true,
            listing: {
              status: false
            }
          }
      }).always(function(response) {
          if (response.responseText === 'ok') {
          console.log('sent false');
          e.target.parentElement.parentElement.classList.toggle('off');
        } else {
          e.target.checked = true
          alert("Request Failed")
        }
      });

    } else {
      $.ajax({
          url: '/listings/' + e.target.parentElement.firstElementChild.value,
          method: 'PATCH',
          data: {
            no_turbolink: true,
            listing: {
              status: true
            }
          }
      }).always(function(response) {
          if (response.responseText === 'ok') {
          console.log('sent true')
          e.target.parentElement.parentElement.classList.toggle('off')
        } else {
          e.target.checked = false
          alert("Request Failed")
        }
      })
    }
  }
})

  $('#new_listing').on('submit', function(e) {
    e.preventDefault();
    var that = this
    var address = document.querySelector('#new_listing input[id="listing_address"]').value
    var geocoder= new google.maps.Geocoder();
    console.log("whatever")

    geocoder.geocode({'address': address}, function(results, status) {
      console.log(results[0].geometry.location.lat())
      if (status === 'OK') {
        console.log('OK')
        document.querySelector('#new_listing input[id="listing_latitude"]').value = results[0].geometry.location.lat()
        document.querySelector('#new_listing input[id="listing_longitude"]').value = results[0].geometry.location.lng()
        $.ajax({
          url: $(that).attr('action'),
          method: $(that).attr('method'),
          data: $(that).serialize(),
        }).done(function(response) {
          console.log(response)
        });
      }
    });
    //   console.log(address)
    //   console.log(results[0].geometry.location.lat() + results[0].geometry.location.lng())
    //   if (status == 'OK') {
    // } else {
    //   console.log('Geocode was not successful for the following reason: ' + status);
    // }
    // })
    //
    //   // .done(function(response) {
    //   //   console.log("DONE" + response)
    //   //   // geocoder.geocode({'address': address}, function(results, status) {
    //   //   //   $.ajax({
    //   //   //        url: "http://localhost:3000/listings/" + listingId,
    //   //   //        method: "PATCH",
    //   //   //        data: {
    //   //   //          no_turbolink: true,
    //   //   //          remote: true,
    //   //   //          listing: {
    //   //   //            latitude: results[0].geometry.location.lat(),
    //   //   //            longitude: results[0].geometry.location.lng()
    //   //   //          }
    //   //   //        }
    //   //   //     }).done(function(reply) {
    //   //   //       console.log(reply)
    //   //   //     }).fail(function() {
    //   //   //       console.log("You broke me dammit")
    //   //   //     });
    //   //   // })
    //   // }).fail(function() {
    //   //   console.log('air roar');
    //   // }).always(function() {
    //   //   console.log('all ways');
    //   // });

    });
});
