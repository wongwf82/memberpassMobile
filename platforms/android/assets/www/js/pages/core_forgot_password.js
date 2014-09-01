$(document).on("pageshow", "#forgotPasswordPage", function() {
  showMessage();
  showBackButton();
});

function passwordReset() {
  showSpinner();

  $.post(url('reset_password'),
    $('#password-reset-form').serialize())
    .done(function(data) {
      if (valid(data)) {
        setSuccessMessage('Email sent with password reset instructions');
        goBackHistory();
      }
    });
}