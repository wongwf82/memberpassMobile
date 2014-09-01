$(document).on("pageshow", "#providerChangePlanPage", function() {
  showMessage();
  showBackButton();
});

function showInterest() {
  $.getJSON(url('show_interest', load('userId')))
    .done(function(data) {
      setSuccessMessage('Thanks! We\'ll let you know when it\'s ready');
      goBackHistory();
    });
}