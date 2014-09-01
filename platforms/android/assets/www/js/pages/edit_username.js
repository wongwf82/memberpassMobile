$(document).on("pagebeforeshow", "#editUsernamePage", function() {
  $('#edit-username').val(load('username'));
});

$(document).on("pageshow", "#editUsernamePage", function() {
  showMessage();
  showBackButton();
  showHelpButton('help_signup_provider.html');
});

function editUsername() {
  showSpinner();

  $.post(url('update_profile', load('userId')),
    $('#edit-username-form').serialize())
    .done(function(data) {
      if (valid(data)) {
        store('username', data.username);
        setSuccessMessage('Updated!');
        goBackTo('edit_profile.html', null, 'slideup');
      }
    });
}