$(document).on("pageshow", "#editPackageTemplatePage", function() {
  showMessage();
  showBackButton();
  getEditPackageList();
});

function getEditPackageList() {
  showSpinner();
  $.getJSON(url('get_packages'))
    .done(function(data) {
      var html = [];
      $.each(data, function(key, val) {
        html.push('<li data-icon="false">');
        html.push('<a onclick="editPackageTemplate(\'', val.id, '\',\'', val.name, '\');" ');
        if (val.id == load('planId')) {
          html.push('style="text-shadow:none; background-color:#999;">');
          html.push('<span class="desc remove-ellipsis" style="color:#fff;">', val.name, '</span>')
        } else {
          html.push('>');
          html.push('<span class="desc remove-ellipsis">', val.name, '</span>');
        }
        html.push('</a>');
        html.push('</li>');
      });
      ulUpdate($('#editPackageList'), html);
      hideSpinner();
    });
}

function editPackageTemplate(planId, planName) {
  store('planId', planId);
  store('planName', planName);
  goTo('edit_package_desc.html');
}