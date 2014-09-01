$(document).on("pagebeforeshow", "#editPackageDescPage", function() {
  var planPrice = load('planPrice') || '0'
  $('#package-desc').val(getEditableDesc(load('planName')) + ' - $' + planPrice);
});

$(document).on("pageshow", "#editPackageDescPage", function() {
  showMessage();
  showBackButton();
  showHelpButton('help_provider_packages.html');
});

function editPackageDesc() {
  showSpinner();

  $.post(url('edit_package', load('userId')), {
    providerplan_id: load('providerPlanId'),
    plan_id: load('planId'),
    name: load('lockedDesc') + $('#package-desc').val()
  })
    .done(function(data) {
      if (valid(data)) {
        setSuccessMessage('Updated!');
        goBackTo('provider_packages.html', null, 'slideup');
      }
    });
}