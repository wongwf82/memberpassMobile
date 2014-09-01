$(document).on("pagebeforeshow", "#signupProviderPage", function() {
  $('#username').val(load('username'));
});

$(document).on("pageshow", "#signupProviderPage", function() {
  addFreePackage();
  showMessage();
  showBackButton();
});

function signUpProvider() {
  showSpinner();

  $.post(url('update_profile', load('userId')),
    $('#signupprovider-form').serialize())
    .done(function(data) {
      if (valid(data)) {
        store('username', data.username);
        store('job_title', data.job_title);
        store('service_area', data.service_area);
        setSuccessMessage('Finally, set up your packages to show your clients!');
        goTo('provider_packages.html');
      }
    });
}

function addFreePackage() {
  $.get(url('add_free_package', load('userId')));
}