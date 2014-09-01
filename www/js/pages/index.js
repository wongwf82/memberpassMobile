window.onload = function() {
  document.addEventListener('deviceready', init, false);
}

function init() {
  try {
    FastClick.attach(document.body);

    FB_PLUGIN = new CC.CordovaFacebook();
    FB_PLUGIN.init('166657946843271', 'MemberPass', ['public_profile','email', 'publish_actions']);

    PICTURE_SOURCE = navigator.camera.PictureSourceType;
    DESTINATION_TYPE = navigator.camera.DestinationType;

    checkEmailService();
  } catch (e) {
    // alert(e);
  }
}

$(document).on("pageshow", "#indexPage", function() {      
  showMessage();
  showBackButton();

  var memberpassPlan = load('memberpassPlan');
  if (memberpassPlan && memberpassPlan.length) {
    if (memberpassPlan == 'client') {
      $('#client-checkin').show();
      $('#provider-checkin').hide();
      $('#profile-setup').hide();
      $('#tour').show();
      $('#setting-setup').show();
      $('#login').hide();
      $('#signup').hide();
    } else {
      $('#client-checkin').show();
      $('#provider-checkin').show();
      $('#profile-setup').show();
      $('#tour').show();
      $('#setting-setup').show();
      $('#login').hide();
      $('#signup').hide();
    }
  } else {
    $('#client-checkin').hide();
    $('#provider-checkin').hide();
    $('#profile-setup').hide();
    $('#tour').show();
    $('#setting-setup').hide();
    $('#login').show();
    $('#signup').show();
  }
});

$(document).on("pageshow", "#helpPage", function() {
  initHelpDots();
});