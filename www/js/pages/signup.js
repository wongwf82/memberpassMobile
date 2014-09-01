$(document).on("pageshow", "#signupPage", function() {
  showMessage();
  showBackButton();
  showHelpButton('help_signup.html');
});

function signup() {
  showSpinner();

  $.post(url('create'),
    $('#signup-form').serialize())
    .done(function(data) {
      if (valid(data)) {
        store_profile(data);
        goTo('signup_register_as.html');  
      }
    });
}