$(document).on("pagebeforeshow", "#editProfileMorePage", function() {
  $('#edit-job-title').val(load('job_title'));
  $('#edit-company').val(load('company'));
  $('#edit-service-area').val(load('service_area'));
  $('#edit-headline').val(load('headline'));
  $('#edit-specialties').val(load('specialties'));
  $('#edit-qualifications').val(load('qualifications'));
});

$(document).on("pageshow", "#editProfileMorePage", function() {
  showMessage();
  showBackButton();
});

function editProfileMorePage() {
  showSpinner();

  $.post(url('update_profile', load('userId')),
    $('#edit-profile-more-form').serialize())
    .done(function(data) {
      if (valid(data)) {
        setSuccessMessage('Updated!');
        goBackTo('provider_profile.html', null);
      }
    });
}