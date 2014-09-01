$(document).on("pagebeforeshow", "#clientUsagePage", function() {
  getClientOrder();
  getUsageView();
});

$(document).on("pageshow", "#clientUsagePage", function() {
  showMessage();
  showBackButton();
  $('#page-title').html(load('param2'));
});

function getClientOrder() {
  showSpinner();
  $.getJSON(url('get_order', load('param1')))
    .done(function(data) {
      var html = [];
      html.push('<li class="ta-center bg-white">Package</li>');
      html.push('<li>');
      html.push('<img src="', setImage(data.seller), '"/>');
      html.push('<span style="font-size: 12px;">', data.name, '</span>');
      html.push('</li>');
      html.push('<li>');
      html.push('<img src="img/icon-calendar.png" class="ui-li-icon" />');
      html.push('<span class="desc">Purchased on </span>');
      html.push(data.formatted_purchased_at);
      html.push('</li>');
      if (data.formatted_usage_start_date.length) {
        html.push('<li>');
        html.push('<img src="img/icon-valid.png" class="ui-li-icon" />');
        html.push('<span class="desc">Valid from </span>');
        html.push(data.formatted_usage_start_date, ' to ', data.formatted_usage_end_date);
        html.push('</li>');
      }
      html.push('<li>');
      html.push('<img src="img/icon-pay.png" class="ui-li-icon" />');
      html.push('<span class="desc">Amount </span>');
      html.push('<span class="pull-right">', data.locale_amount, '</span>');
      html.push('</li>');
      html.push('<li>');
      html.push('<img src="img/icon-usage.png" class="ui-li-icon" />');
      html.push('<span class="desc">Used </span>');
      html.push('<span>', data.usage_count, "/", data.usage_limit, '</span>');
      html.push('<span class="ui-li-count" style="padding: 0px 6px;">');
      html.push(data.usage_limit - data.usage_count, ' left');
      html.push('</span>');
      html.push('</li>');
      ulUpdate($('#planView'), html);

      html = [];
      html.push('<li class="ta-center bg-white">About ' + data.seller.first_name + '</li>');
      html.push('<li>');
      html.push('<img src="img/icon-phone.png" class="ui-li-icon" />');
      html.push('<span class="desc">Mobile </span>');
      html.push('<span class="pull-right">' + data.seller.mobile_number + '</div>');
      html.push('</li>');
      html.push('<li>');
      html.push('<img src="img/icon-email.png" class="ui-li-icon" />');
      html.push('<span class="desc">Email </span>');
      html.push('<span class="pull-right">' + data.seller.email + '</span>');
      html.push('</li>');
      ulUpdate($('#providerView'), html);
      
      $('#orderStatus').show();

      hideSpinner();
    });
}