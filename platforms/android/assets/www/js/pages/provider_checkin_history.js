$(document).on("pageshow", "#providerCheckinHistoryPage", function() {
  showMessage();
  showBackButton();
  getProviderCheckInList(url('members_history', load('userId')), $('#CheckInListHistory'));
});