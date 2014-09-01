$(document).on("pageshow", "#providerCheckinCurrentPage", function() {
  if (load('first_load') == null) {
    setSuccessMessage('Tap and hold to check in!'); 
    store('first_load','done');     
  }
  showMessage();
  showBackButton();
  getProviderCheckInList(url('members_current', load('userId')), $('#CheckInListCurrent'));
});

function getProviderCheckInList(url, ul) {
  showSpinner();
  $.getJSON(url)
    .done(function(data) {
      $('#sessions-none').hide();
      if (data.length) {
        var html = [];
        $.each(data, function(key, val) {
          html.push('<li class="list-item" data-order_id="', val.id, '" data-buyer_name="', val.buyer_name, '">');
          html.push('<a onclick="goTo(\'provider_usage.html\',null,null,');
          html.push('\'', val.id, '\',\'', val.buyer_name, '\'');
          html.push(')">');
          if (val.status == 'unpaid') {
            html.push('<p class="package-alert ui-li-aside ui-li-desc">- CASH UNPAID -</p>');
          } else if (val.status == 'remove') {
            html.push('<p class="package-alert ui-li-aside ui-li-desc">- REMOVED -</p>');
          }
          html.push('<h2>', val.buyer_name, '</h2><p>', val.name, '</p>');
          html.push('<p><b>Date purchased:</b> ', val.formatted_purchased_at, '</p>');
          html.push('<span class="ui-li-count">', val.usage_limit - val.usage_count, ' left</span>');
          html.push('</a>');
          html.push('</li>');
        });
        ulUpdate(ul, html);
      } else {
        $('#sessions-none').show();
      }

      $('.list-item').taphold(function() {  
        confirmCheckIn($(this));
      });  
      hideSpinner();   
    });
}

function confirmCheckIn(listitem) {
  store('param1', listitem.data('order_id')); 

  navigator.notification.confirm(
    listitem.data('buyer_name'),        
    onCheckInConfirm,
    'Check in client?',
    ['OK','Cancel']
  );   
}

function onCheckInConfirm(buttonIndex) {
  if(device.platform==="Android"){ 
    goBackHistory();
  }
  if (buttonIndex == 1) {
    $.getJSON(url('use', load('param1')))
      .done(function(data) {
        setSuccessMessage(data.buyer_name + ' checked in');    
        getProviderCheckInList(url('members_current', load('userId')), $('#CheckInListCurrent'));   
        showMessage();
      });
  }
}