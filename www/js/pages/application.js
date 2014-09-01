// var HOST = 'http://localhost:3000/';
var HOST = 'https://www.memberpass.com/';
var FB_PLUGIN;

function url(method_name, param) {
  var url = HOST + 'mobile/' + method_name;
  if (param) {
    url += '/' + param;
  }
  return url + '.json';
}

function showSpinner() {
  $('#page-content').hide();
  $.mobile.loadingMessageTextVisible = true;
  $.mobile.loadingMessage = 'please wait...';
  $.mobile.showPageLoadingMsg();
}

function hideSpinner() {
  $.mobile.hidePageLoadingMsg();
  $('#page-content').show();
}

function store_profile(data) {
  store('userId', data.id);
  store('username', data.username);
  store('name', data.name);
  store('email', data.email);
  store('mobileNumber', data.mobile_number);
  store('memberpassPlan', data.memberpass_plan);
  store('name', data.name);
  store('firstName', data.first_name);
}

function notify(msg) {
  navigator.notification.alert(msg);
}

function store(key, val) {
  sessionStorage.setItem(key, val);
}

function load(key) {
  return sessionStorage.getItem(key);
}

function reset(key) {
  sessionStorage.setItem(key, '');
}

function initHelpDots() {
  $('.dot:eq(0)').addClass('dot-active');
  window.mySwipe = Swipe(document.getElementById('slider'), {
    continuous: false,
    callback: function(index, elem) {
      if (index > 0) $('.dot:eq(' + (index - 1) + ')').removeClass('dot-active');
      if (index < $('.dot').length) $('.dot:eq(' + (index + 1) + ')').removeClass('dot-active');
      $('.dot:eq(' + index + ')').addClass('dot-active');
    }
  });
}

function goTo(pageTo, pageFrom, transition, param1, param2, param3, param4, param5) {
  showSpinner();
  if (pageFrom) {
    store('pageFrom', pageFrom);
    store('transition', transition);
  }
  if (param1) store('param1', param1);
  if (param2) store('param2', param2);
  if (param3) store('param3', param3);
  if (param4) store('param4', param4);
  if (param5) store('param5', param5);
  if (!transition) transition = 'slide';
  $.mobile.changePage(pageTo, {
    transition: transition,
    changeHash: true,
    reloadPage: false
  });
}

function goBackTo(pageTo, pageFrom, transition) {
  store('backClicked', 'true');
  $('#back-button').removeClass('back-button-normal');
  $('#back-button').addClass('back-button-hover');
  if (pageTo == 'cache') {
    pageTo = load('pageFrom');
    transition = load('transition');
    reset('pageFrom');
  }
  if (!transition || transition == 'undefined') {
    transition = 'slide';
  }
  $.mobile.changePage(pageTo, {
    transition: transition,
    changeHash: true,
    reloadPage: false,
    reverse: true
  });
}

function goBackHistory() {
  store('backClicked', 'true');
  $('#back-button').removeClass('back-button-normal');
  $('#back-button').addClass('back-button-hover');
  history.back();
  return false;
}

function ulUpdate(ul, html) {
  ul.html('');
  ul.listview('refresh');
  ul.html(html.join(''));
  ul.listview('refresh');
  ul.trigger('updatelayout');
}

function setImage(user) {
  if (user == undefined) {
    return 'img/default-profile-medium-small.png';
  } else if (user.photo_url_medium_small.indexOf('assets') > 0) {
    return HOST + user.photo_url_medium_small;
  } else {
    return user.photo_url_medium_small;
  }
}

function escape(text) {
  return text.replace(/\r\n/g, '<br />');
}

function valid(data) {
  if (data.error) {
    var error = data.error.toString();
    if (error.length) {
      if (error.indexOf(',') != -1) {
        setErrorMessage(error.split(',')[0]);
      } else {
        setErrorMessage(error);
      }
      return false;      
    }
  }
  return true;
}

function setErrorMessage(message) {
  setSuccessMessage(message);
  showMessage();
}

function setSuccessMessage(message) {
  var lastChar = message.charAt(message.length - 1);
  store('flash', message);
  if (lastChar != '!' && lastChar != '.')
    store('flash', load('flash') + '.');
}

function showMessage() {
  hideSpinner();
  var message = load('flash');
  var type = load('type');
  if (message && message.length) {
    if (!type) type = 'information';
    showNotification({
      message: message,
      type: type
    });
    reset('flash');
    reset('type');
  }
}

function showBackButton() {
  if (load('backClicked') == 'true') {
    reset('backClicked');
    $('#back-button').addClass('back-button-hover');
    setTimeout(function() {
      $('#back-button').removeClass('back-button-hover');
      $('#back-button').addClass('back-button-normal');
    }, 150);
  } else {
    $('#back-button').addClass('back-button-normal');
  }
}

function showHelpButton(url) {
  $('#help-button').click(function() {
    goTo(url, null, 'pop');
  });
  $('#help-button').show();
}