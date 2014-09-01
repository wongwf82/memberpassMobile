$(document).on("pageshow", "#providerProfilePage", function() {
  getSellerByAdmin();
  showMessage();
  showBackButton();
  showHelpButton('help_provider_profile.html');
});

function getSellerByAdmin() {
  showSpinner();
  $.getJSON(url('get_seller', load('userId')))
    .done(function(data) {

      store_profile(data);

      store('job_title', data.job_title);
      store('company', data.company);
      store('service_area', data.service_area);
      store('headline', data.headline);
      store('specialties', data.specialties);
      store('qualifications', data.qualifications);

      var html = [];
      html.push('<li style="background-color: #FFF">');
      html.push('<img src="', setImage(data), '"/>');
      html.push('<h2 class="ui-li-heading remove-ellipsis">', data.name, '</h2>');
      html.push('<p class="ui-li-desc remove-ellipsis">', data.job_title, '</p>');
      html.push('</li>');
      html.push('<li>');
      html.push('<a class="btn-more" onclick="goTo(\'edit_profile.html\',\'provider_profile.html\')">Edit Profile</a>');
      html.push('</li>');
      ulUpdate($('#sellerViewAdmin'), html);

      html = [];
      if (data.headline.length) {
        html.push('<li class="ta-center">"', data.headline, '"</li>');
      }
      html.push('<li>');
      html.push('<img src="img/icon-area.png" class="ui-li-icon" />');
      html.push('<span class="desc">Service Area </span><br/>', escape(data.service_area));
      html.push('</li>');
      html.push('<li>');
      html.push('<img src="img/icon-company.png" class="ui-li-icon" />');
      html.push('<span class="desc">Company </span><br/>', data.company);
      html.push('</li>');
      html.push('<li>');
      html.push('<img src="img/icon-specialties.png" class="ui-li-icon" />');
      html.push('<span class="desc">Specialties </span><br/>', escape(data.specialties));
      html.push('</li>');
      html.push('<li>');
      html.push('<img src="img/icon-qualifications.png" class="ui-li-icon" />');
      html.push('<span class="desc">Qualifications </span><br/>', escape(data.qualifications));
      html.push('</li>');
      html.push('<li data-icon="plus">');
      html.push('<a class="btn-more" onclick="goTo(\'edit_profile_more.html\',null,\'slideup\')">Add More Information</a>');
      html.push('</li>');
      ulUpdate($('#sellerMoreViewAdmin'), html);

      hideSpinner();
    });
}