$(document).on("pagebeforeshow", "#providerUsagePage", function() {
  getClientOrderForProvider();
  getOrderStatusView();
  getUsageView();
});

function getOrderStatusView() {
  var html = [];
  html.push('<fieldset id="orderStatus" data-role="controlgroup" data-type="horizontal" data-mini="true" style="display: none;">');
  html.push('<input type="radio" id="paid" value="paid" onclick="updateOrderStatus(this);">');
  html.push('<label for="paid">Paid</label>');
  html.push('<input type="radio" id="unpaid" value="unpaid" onclick="updateOrderStatus(this);">');
  html.push('<label for="unpaid">Unpaid</label>');
  html.push('<input type="radio" id="remove" value="removed" onclick="updateOrderStatus(this);">');
  html.push('<label for="remove">Remove</label>');
  html.push('</fieldset>');
  $('#orderStatusView').html(html.join(''));
  $('#orderStatusView').trigger('create');
}

$(document).on("pageshow", "#providerUsagePage", function() {
  getOrderStatus();
  showMessage();
  showBackButton();
  showHelpButton('help_provider_usage.html');
  $('#page-title').html(load('param2'));
});

function getOrderStatus() {
  if (load('orderStatus') == 'paid')
    $('#paid').attr("checked", "checked").checkboxradio("refresh");
  else if (load('orderStatus') == 'unpaid')
    $('#unpaid').attr("checked", "checked").checkboxradio("refresh");
  else if (load('orderStatus') == 'remove')
    $('#remove').attr("checked", "checked").checkboxradio("refresh");
}

function getClientOrderForProvider() {
  showSpinner();
  $.getJSON(url('get_order', load('param1')))
    .done(function(data) {

      store('orderStatus', data.status);

      var html = [];
      html.push('<li class="ta-center bg-white">Package</li>');
      html.push('<li>');
      html.push('<img src="', setImage(data.buyer), '"/>');
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
      html.push('<li class="ta-center bg-white">About ', data.buyer_first_name, '</li>');
      html.push('<li>');
      html.push('<img src="img/icon-phone.png" class="ui-li-icon" />');
      html.push('<span class="desc">Mobile </span>');
      html.push('<span class="pull-right">', data.buyer_mobile_number, '</span>');
      html.push('</li>');
      html.push('<li>');
      html.push('<img src="img/icon-email.png" class="ui-li-icon" />');
      html.push('<span class="desc">Email </span>');
      html.push('<span class="pull-right">', data.buyer_email, '</span>');
      html.push('</li>');
      ulUpdate($('#clientView'), html);

      $('#orderStatus').show();
      
      hideSpinner();
    });
}

function getUsageView() {

  $.getJSON(url('get_usage', load('param1')))
    .done(function(data) {
      var html = [];
      if (data.length) {
        html.push('<li class="ta-center bg-white">Usage history</li>');
        $.each(data, function(key, val) {
          html.push('<li class="desc">');
          html.push(val.formatted_created_at);
          html.push('</li>');
        });
        ulUpdate($('#usageView'), html);
      }
    });
}

function use() {
  $.getJSON(url('use', load('param1')))
    .done(function(data) {
      setSuccessMessage(data.buyer_name + ' checked in');    
      goBackHistory();  
    });
}

function gift() {
  $.getJSON(url('gift', load('param1')))
    .done(function(data) {
      setSuccessMessage(data.buyer_name + ' gifted');
      goBackHistory();
    });
}

function updateOrderStatus(radio) {

  store('orderStatus', radio.id);

  $.post(url('update_order_status', load('param1')), {
    order_status: radio.id
  })
    .done(function(data) {
      setSuccessMessage(load('param2') + "'s session package is now " + radio.value);
      goBackHistory();
    });
}