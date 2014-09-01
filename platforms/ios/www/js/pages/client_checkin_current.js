
$(document).on("pageshow", "#clientCheckinCurrentPage", function() {
  showMessage();
  showBackButton();
  getClientCheckInList(url('providers_current', load('userId')), $('#CheckInListCurrent'));
});

function getClientCheckInList(url, ul) {
  showSpinner();
  $.getJSON(url)
    .done(function(data) {
      $('#sessions-none').hide();
      if (data.length) {
        var html = [];
        $.each(data, function(key, val) {
          html.push('<li class="list-item">');
          html.push('<a onclick="goTo(\'client_usage.html\',null,null,');
          html.push('\'', val.id, '\',\'', val.seller.first_name, '\'');
          html.push(')">');
          if (val.status == 'unpaid') {
            html.push('<p class="package-alert ui-li-aside ui-li-desc">- CASH UNPAID -</p>');
          } else if (val.status == 'remove') {
            html.push('<p class="package-alert ui-li-aside ui-li-desc">- REMOVED -</p>');
          }
          html.push('<h2>', val.seller.name, '</h2><p>', val.name, '</p>');
          html.push('<p><b>Date purchased:</b> ', val.formatted_purchased_at, '</p>');
          html.push('<span class="ui-li-count">', val.usage_limit - val.usage_count, ' left</span>');
          html.push('</a>');
          html.push('</li>');
        });
        ulUpdate(ul, html);
      } else {
        $('#sessions-none').show();
      }

      hideSpinner();
    });
}
