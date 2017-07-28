document.addEventListener('DOMContentLoaded', function() {
  var register = document.querySelector('.new_user_link')
  var register_form = document.querySelector('.new_user')
  // var xButton = document.querySelectorAll('.close');
  // var login = document.querySelector('.login_link')
  var login_form = document.querySelector('.login')

  // var main = document.querySelector('main')
  document.body.addEventListener('click', function(e) {
    if(e.target && e.target.classList.contains('login_link')) {
      e.preventDefault();
      login_form.style.display = 'block'
    } else if (e.target && e.target.classList.contains('new_user_link')) {
      e.preventDefault();
      login_form.style.display = 'none'
      register_form.style.display = 'block'
    } else if (e.target && e.target.classList.contains('close') && e.target.parentElement.parentElement.className === 'login') {
      login_form.style.display = 'none';
    } else if (e.target && e.target.classList.contains('close') && e.target.parentElement.parentElement.className === 'new_user') {
      register_form.style.display = 'none';
    }

  })
  $('.submit_new_user').removeAttr('data-disable-with');

});
