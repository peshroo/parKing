document.addEventListener('DOMContentLoaded', function() {
  var register = document.querySelector('.new_user_link')
  var register_form = document.querySelector('.new_user')
  var xButton = document.querySelectorAll('.close');
  // var login = document.querySelector('.login_link')
  var login_form = document.querySelector('.login')


  document.addEventListener('click', function(e) {
    if(e.target && e.target.classList.contains('login_link')) {
      e.preventDefault();
      login_form.style.display = 'block'
    }
  })
  //
  // // document.addEventListener('click', function(e) {
  //     e.preventDefault();
  //     dashBoardList.style.display = 'block'
  // })

  document.addEventListener('click', function(e) {
    if(e.target && e.target.classList.contains('new_user_link')) {
      e.preventDefault();
      register_form.style.display = 'block'
    }
  })


  xButton.forEach(function(button) {
    button.addEventListener('click', function(e) {
    register_form.style.display = 'none';
    login_form.style.display = 'none';
    })
  });



});
