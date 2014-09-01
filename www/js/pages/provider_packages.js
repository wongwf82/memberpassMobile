$(document).on("pageshow", "#packagesPage", function() {
  getSellerPackagesByAdmin();
  showMessage();
  showBackButton();
  showHelpButton('help_provider_packages.html');
});

function getSellerPackagesByAdmin() {
  showSpinner();
  $.getJSON(url('get_plans', load('userId')))
    .done(function(data) {

      var html = [];
      html.push('<li class="btn-more bold bg-white">Click on a package to edit</li>');
      $.each(data, function(key, val) {
        html.push('<li data-icon="false">');
        html.push('<a onclick="edit_package(');
        html.push('\'', val.id, '\',\'', val.plan_id, '\',');
        html.push('\'', val.name, '\',\'', val.price, '\')">');
        html.push('<span class="desc remove-ellipsis">', val.name, '</span>');
        html.push('</a>');
        html.push('<span class="ui-li-count">', val.locale_price, '</span>');
        html.push('</li>');
      });
      html.push('<li data-icon="plus">');
      html.push('<a onclick="goTo(\'edit_package_template.html\')" class="btn-more">');
      html.push('Add Package');
      html.push('</a>');
      html.push('</li>');
      ulUpdate($('#packageViewAdmin'), html);

      hideSpinner();
    });
}

function edit_package(providerplan_id, plan_id, plan_name, plan_price) {
  store('providerPlanId', providerplan_id);
  store('planId', plan_id);
  store('planName', plan_name);
  store('planPrice', plan_price);

  goTo('edit_package.html');
}