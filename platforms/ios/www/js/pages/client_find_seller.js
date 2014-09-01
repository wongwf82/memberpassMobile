$(document).on("pagebeforeshow", "#clientFindSellerPage", function() {
  getSellerList();
});

$(document).on("pageshow", "#clientFindSellerPage", function() {
  showMessage();
  showBackButton();
  showHelpButton('help_find_seller.html');  
});

function getSellerList() {
  $("#sellerList").on("listviewbeforefilter", function(e, data) {
    var keyword = $(data.input).val();

    $('#search').hide();
    $('#search-none').hide();
    if (keyword && keyword.length > 1) {

      $.getJSON(url('get_sellers', keyword))
        .done(function(data) {
          if (data.length) {
            var html = [];
            $.each(data, function(key, val) {

              $('<img/>')[0].src = setImage(val); // Preload

              html.push('<li>');
              html.push('<a onclick="goTo(\'client_seller.html\',null,null,\'' + val.id + '\')">');
              html.push('<img src="', setImage(val), '"/>');
              html.push('<h2 class="ui-li-heading" style="margin-top: -5px;">', val.name, '</h2>');
              html.push('<p class="ui-li-desc" style="line-height: 12px; padding-bottom: 6px;"><b>', val.job_title, '</b></p>');
              html.push('<p class="ui-li-desc" style="line-height: 14px; color: #666;">', val.service_area, '</p>');
              html.push('</a>');
              html.push('</li>');
            });
            ulUpdate($('#sellerList'), html);
          } else {
            $('#keyword').html(keyword);
            $('#search').hide();
            $('#search-none').show();
          }
        });
    } else {
      $('#search').show();
      $('#search-none').hide();
    }
  });
}