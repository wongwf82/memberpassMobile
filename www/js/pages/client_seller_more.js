$(document).on("pagebeforeshow", "#clientSellerMorePage", function() {
  $('#first-name').html(load('sellerFirstName'));
});

$(document).on("pageshow", "#clientSellerMorePage", function() {
  getSellerMore();
  showMessage();
  showBackButton();
  $('#page-title').html('About ' + load('sellerFirstName'));
});

function getSellerMore() {
  showSpinner();
  $.getJSON(url('get_seller', load('param1')))
    .done(function(data) {
      if (data) {
        var html = [];
        if (data.headline.length) {
          html.push('<li class="smaller ta-center">"', data.headline, '"</li>');
        }
        if (data.company.length) {
          html.push('<li>');
          html.push('<img src="img/icon-company.png" class="ui-li-icon" />');
          html.push('<span class="desc">Company </span><br/>' + data.company);
          html.push('</li>');
        }
        if (data.specialties.length) {
          html.push('<li>');
          html.push('<img src="img/icon-specialties.png" class="ui-li-icon" />');
          html.push('<span class="desc">Specialties </span><br/>' + escape(data.specialties));
          html.push('</li>');
        }
        if (data.qualifications.length) {
          html.push('<li>');
          html.push('<img src="img/icon-qualifications.png" class="ui-li-icon" />');
          html.push('<span class="desc">Qualifications </span><br/>' + escape(data.qualifications));
          html.push('</li>');
        }
        ulUpdate($('#sellerMoreView'), html);
      } else {
        $('#seller-more-none').show();
      }
      hideSpinner();
    });
}