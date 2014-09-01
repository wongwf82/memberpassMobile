$(document).on("pagebeforeshow", "#editContactDetailsPage", function() {
  $('#name').val(load('name'));
  $('#email').val(load('email'));
  $('#mobile-number').val(load('mobileNumber'));
});

$(document).on("pageshow", "#editContactDetailsPage", function() {
  showMessage();
  showBackButton();
  showHelpButton('help_signup.html');
});

function editContactDetails() {
  showSpinner();

  $.post(url('update_profile', load('userId')),
    $('#edit-contact-details-form').serialize())
    .done(function(data) {
      if (valid(data)) {
        store('name', data.name);
        store('email', data.email);
        store('mobileNumber', data.mobile_number);
        setSuccessMessage('Updated!');
        goBackTo('edit_profile.html', null, 'slideup');
      }
    });
}