$(document).on("pageshow", "#editPasswordPage", function() {
  showMessage();
  showBackButton();
});

function editPassword() {
  showSpinner();

  $.post(url('update_password', load('userId')),
    $('#edit-password-form').serialize())
    .done(function(data) {
      if (valid(data)) {
        setSuccessMessage('Updated!');
        goBackTo('edit_profile.html', null, 'slideup');
      }
    });
}