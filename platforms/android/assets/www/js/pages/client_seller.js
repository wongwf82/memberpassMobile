$(document).on("pageshow", "#clientSellerPage", function() {
  getSeller();
  showMessage();
  showBackButton();
  showHelpButton('help_client_seller.html');
});

function getSeller() {
  showSpinner();
  $.getJSON(url('get_seller', load('param1')))
    .done(function(data) {
      store('sellerName', data.name);
      store('sellerFirstName', data.first_name);
      store('sellerUsername', data.username);

      $('#page-title').html(load('sellerFirstName'));

      var html = [];
      html.push('<li style="background-color: #FFF">');
      html.push('<img src="', setImage(data), '"/>');
      html.push('<h2 class="ui-li-heading remove-ellipsis">', data.name, '</h2>');
      html.push('<p class="ui-li-desc remove-ellipsis">', data.job_title, '</p>');
      html.push('</li>');
      if (data.service_area.length) {
        html.push('<li>');
        html.push('<img src="img/icon-area.png" class="ui-li-icon"/><span class="desc">Service Area </span><br/>');
        html.push(escape(data.service_area));
        html.push('</li>');
      }
      if (data.headline.length || data.company.length || data.specialties.length || data.qualifications.length) {
        html.push('<li>');
        html.push('<a class="btn-more" onclick="goTo(\'client_seller_more.html\')">More Information</a>');
        html.push('</li>');
      }
      ulUpdate($('#sellerView'), html);

      getSellerPackages();

      hideSpinner();
    });
}

function getSellerPackages() {
  $.getJSON(url('get_plans', load('param1')))
    .done(function(data) {
      if (data.length) {

        var html = [];
        html.push('<li class="ta-center bg-white">Select a package</li>');
        $.each(data, function(key, val) {
          html.push('<li data-icon="false">');
          html.push('<a href="client_select_package.html" class="select-package"');
          html.push('data-providerplan_id="', val.id, '" ');
          html.push('data-plan_name="', val.name, '" ');
          html.push('data-role="button" data-corners="false" data-theme="a" data-rel="dialog">');
          html.push('<span class="desc remove-ellipsis">', val.name, '</span></a>');
          html.push('<span class="ui-li-count">', val.locale_price, '</span>');
          html.push('</li>');
        });
        ulUpdate($('#packageView'), html);
      }
    });
}

$(document).on("click", '.select-package', function(e) {
  // Prevent default action. we dont want it to redirect. Just yet. 
  e.preventDefault();

  // Set item in localStorage.
  store('sellerPlanId', $(this).data("providerplan_id"));
  store('sellerPlanName', $(this).data("plan_name"));

  // Then use changePage to redirect 
  $.mobile.changePage(this.href, {
    transition: 'pop',
    role: 'dialog'
  });
});