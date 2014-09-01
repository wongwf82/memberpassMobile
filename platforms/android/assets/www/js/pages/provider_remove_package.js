$(document).on("pagebeforeshow", "#providerRemovePackagePage", function() {
  $('#package-desc').html(load('planName') + ' - $' + load('planPrice'));
});

function removePackage() {
  $.getJSON(url('deactivate_package', load('providerPlanId')))
    .done(function(data) {
      setSuccessMessage('Package removed');
      goBackHistory();
    });
}