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
  if (document.querySelector('.user_partial')) {

  var listingsDiv = document.querySelector('.user_partial')
  listingsDiv.addEventListener('click', function(e) {
    if ( e.target.classList.contains('toggler')) {
      if (e.target.checked === false) {

        e.target.parentElement.parentElement.classList.toggle('off');
      console.log(e.target.checked)
      $.ajax({
          url: '/listings/' + e.target.parentElement.firstElementChild.value,
          method: 'PATCH',
          data: {
            no_turbolink: true,
            listing: {
              status: false
            }
          },
          dataType: "json",
      }).always(function(response) {
          if (response.responseText === 'ok') {
            console.log('successfully disabled')
        } else {
          e.target.parentElement.parentElement.classList.toggle('off');
          e.target.checked = true
          alert("Request Failed")
        }
      });

    } else {
      e.target.parentElement.parentElement.classList.toggle('off')
      $.ajax({
          url: '/listings/' + e.target.parentElement.firstElementChild.value,
          method: 'PATCH',
          data: {
            no_turbolink: true,
            listing: {
              status: true
            }
          },
          dataType: "json",
        }).always(function(response) {
          if (response.responseText === 'ok') {
          console.log('successfully enabled')
        } else {
          e.target.parentElement.parentElement.classList.toggle('off')
          e.target.checked = false
          alert("Request Failed")
        }
      })
    }
  }
})
}

  $('#new_listing').on('submit', function(e) {
    e.preventDefault();
    var that = this
    var address = document.querySelector('#new_listing input[id="listing_address"]').value
    var geocoder= new google.maps.Geocoder();
    console.log("about to request geocoder")

    geocoder.geocode({'address': address}, function(results, status) {
      console.log(results[0].geometry.location.lat())
      if (status === 'OK') {
        document.querySelector('#new_listing input[id="listing_latitude"]').value = results[0].geometry.location.lat()
        document.querySelector('#new_listing input[id="listing_longitude"]').value = results[0].geometry.location.lng()
        $.ajax({
          url: $(that).attr('action'),
          method: $(that).attr('method'),
          data: $(that).serialize(),
        }).done(function(response) {
          console.log('geocoder OK')
          window.location.href = '/user_listings'
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
  $('span.stars').stars();
});
