$(document).on("pageshow", "#clientCheckinHistoryPage", function() {
  showMessage();
  showBackButton();
  getClientCheckInList(url('providers_history', load('userId')), $('#CheckInListHistory'));
});