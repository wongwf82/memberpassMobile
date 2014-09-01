$(document).on("pagebeforeshow", "#clientSelectPackagePage", function() {
  $('#package-desc').html(load('sellerPlanName'));
});

function checkLoggedIn() {
  var memberPass = load('memberpassPlan');
  if (memberPass && memberPass.length) {
    selectPackage();
  } else {
    // get user to login or signup first
    setSuccessMessage('Please login or sign-up to proceed');
    goTo('login.html', 'client_seller.html');
  }
}

function selectPackage() {
  $.post(url('select_package'), {
    user_id: load('userId'),
    providerplan_id: load('sellerPlanId'),
    name: load('name'),
    email: load('email'),
    mobile_number: load('mobileNumber')
  })
    .done(function(data) {
      reset('pageFrom');
      setSuccessMessage('Finally, contact your provider to book an appointment');
      goTo('client_checkin_current.html');
    });
}