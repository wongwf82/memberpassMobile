$(document).on("pageshow", "#loginPage", function() {
  showMessage();
  showBackButton();
});

function login() {
  showSpinner();

  $.post(url('login'),
    $('#login-form').serialize())
    .done(function(data) {
      if (valid(data)) {
        store_profile(data);

        if (load('pageFrom') == 'client_seller.html') {
          selectPackage();
        } else {
          goTo('index.html');
        }
      }
    });
}