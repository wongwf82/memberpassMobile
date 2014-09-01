$(document).on("pagebeforeshow", "#editProfilePage", function() {
  getEditProfile();
});

$(document).on("pageshow", "#editProfilePage", function() {
  showMessage();
  showBackButton();
});

function getEditProfile() {
  showSpinner();

  var html = [];
  html.push('<li>');
  html.push('<a onclick="goTo(\'edit_username.html\',null,\'slideup\');">');
  html.push('<h1>Username for web profile link</h1>');
  html.push('<p><span class="desc-small">' + HOST + '</span>' + load('username') + '</p>');
  html.push('</a>');
  html.push('</li>');
  html.push('<li>');
  html.push('<a onclick="goTo(\'edit_contact_details.html\',null,\'slideup\');">');
  html.push('<h1>Contact details</h1>');
  html.push('<p>');
  html.push('<span class="desc-small">Name</span>');
  html.push('<span style="padding-left: 20px;">' + load('name') + '</span><br/>');
  html.push('<span class="desc-small">Email</span>');
  html.push('<span style="padding-left: 22px;">' + load('email') + '</span><br/>');
  html.push('<span class="desc-small">Mobile</span>');
  html.push('<span style="padding-left: 15px;">' + load('mobileNumber') + '</span><br/>');
  html.push('</p>');
  html.push('</a>');
  html.push('</li>');
  html.push('<li>');
  html.push('<a onclick="goTo(\'edit_password.html\',null,\'slideup\')"><h1>Password</h1></a>');
  html.push('</li>');
  html.push('<li>');
  html.push('<a onclick="goTo(\'edit_photo.html\',null,\'slideup\')"><h1>Profile picture</h1></a>');
  html.push('</li>');
  ulUpdate($('#editProfile'), html);

  hideSpinner();
}