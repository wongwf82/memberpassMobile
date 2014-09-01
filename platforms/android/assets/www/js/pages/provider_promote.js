$(document).on("pagebeforeshow", "#providerPromotePage", function() {
  store('promoName', load('name'));
  store('promoFirstName', load('firstName'));
  store('promoUsername', load('username'));
  showRecommendPage();
});

$(document).on("pageshow", "#providerPromotePage", function() {
  showMessage();
  showBackButton();
});

