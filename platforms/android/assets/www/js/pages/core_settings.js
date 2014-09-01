$(document).on("pagebeforeshow", "#settingsPage", function() {
  if (load('memberpassPlan') == 'client') {
    $('#change-memberpass-plan').val('client').slider('refresh');
  }
});

$(document).on("pageshow", "#settingsPage", function() {
  showMessage();
  showBackButton();
});

function updateRegisterAs() {
  $.post(url('update_profile', load('userId')),
    $('#registeras-form').serialize())
    .done(function(data) {
      if ($('#change-memberpass-plan').val() == 'client') {
        store('memberpassPlan', 'client');
        setSuccessMessage('Below are your client menu options');
      } else {
        store('memberpassPlan', 'provider');
        setSuccessMessage('Below are your provider menu options');
      }
      goTo('index.html');
    });
}