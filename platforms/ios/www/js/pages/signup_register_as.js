$(document).on("pagebeforeshow", "#signupRegisterAsPage", function() {
  if (load('pageFrom') == 'client_seller.html') {
    $("input[name='memberpass_plan']:eq(1)").attr("checked", "checked");
    $("input[name='memberpass_plan']").checkboxradio("refresh");
  }  
});

$(document).on("pageshow", "#signupRegisterAsPage", function() {
  showMessage();
  showBackButton();
});

function registerAs() {
  $.post(url('update_profile', load('userId')),
    $('#registeras-form').serialize())
    .done(function(data) {
      if (valid(data)) {
        store('mobileNumber', data.mobile_number);
        if ($('input[name=memberpass_plan]:checked').val() == 'client') {
          store('memberpassPlan', 'client');
        } else {
          store('memberpassPlan', 'provider');
        }
        goTo('signup_photo.html');
      }
    }
  );
}