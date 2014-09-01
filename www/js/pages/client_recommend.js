$(document).on("pagebeforeshow", "#recommendPage", function() {
    store('promoName', load('sellerName'));
    store('promoFirstName', load('sellerFirstName'));
    store('promoUsername', load('sellerUsername'));
});

$(document).on("pageshow", "#recommendPage", function() {
    showRecommendPage();
    showMessage();
    showBackButton();
    $('#page-title').html('Recommend ' + load('sellerFirstName'));
});

function showRecommendPage() {
    showSpinner();

    var html = [];
    if (load('facebookLoggedIn') == "true") {
        html.push('<li id="shareFacebook">');
        html.push('<a onclick="facebookWallPost();">');
        html.push('<img src="img/facebook.png" class="share-icon"><h1 style="padding-top: 10px">Facebook</h1>');
        html.push('</a>');
        html.push('</li>');
    }
    html.push('<li id="shareSms">');
    html.push('<a onclick="sendSms();">');
    html.push('<img src="img/sms.png" class="share-icon"><h2 style="padding-top: 10px">SMS</h2>');
    html.push('</a>');
    html.push('</li>');
    if (load('emailAvailable') == "true") {
        html.push('<li id="shareEmail">');
        html.push('<a onclick="sendEmail();">');
        html.push('<img src="img/email.png" class="share-icon"><h2 style="padding-top: 10px">Email</h2>');
        html.push('</a>');
        html.push('</li>');
    }
    html.push('<li id="shareLink">');
    html.push('<a onclick="copyProfileLink();">');
    html.push('<img src="img/copy.png" class="share-icon"><h2 style="padding-top: 10px">Copy download link</h2>');
    html.push('</a>');
    html.push('</li>');
    ulUpdate($('#recommendView'), html);

    hideSpinner();
}

function facebookWallPost() {
    var name = load('promoName') + ' - now available on MemberPass';
    var url = HOST;
    var logoUrl = HOST + 'assets/favicon.png';
    var caption = HOST;
    var description = 'Find, Connect and Track your sessions easily. ' +
        'Download the mobile app and find ' + load('promoName') + ' there!';
    var success = function() {
        setSuccessMessage('Posted on your Facebook wall successfully!');
        showMessage();
    };
    var error = function(e) {};

    FB_PLUGIN.share(name, url, logoUrl, caption, description, success, error);
}

function checkEmailService() {
    window.plugin.email.isServiceAvailable(
        function(isAvailable) {
            if (isAvailable) {
                store('emailAvailable', 'true');
            }
        }
    );
}

function sendEmail() {
    var subject = load('promoName') + ' is now using Memberpass';
    var body = 'Find service providers in your area, Connect and Track your sessions easily with Memberpass.<br/><br/>' +
        'Download the mobile app and find ' + load('promoName') + ' and many other service providers<br/><br/>.' +
        'Go to https://www.memberpass.com/ or go to the app store and search for Memberpass.'

    window.plugin.email.open({
        subject: subject,
        body: body,
        isHtml: true
    });
}

function sendSms() {
    var number = '';
    var message = load('promoName') + ' and many other service providers are using MemberPass. ' +
        'Use MemberPass to Find service providers, Connect and Track your sessions easily. ' +
        'Simply download the Memberpass app and find ' + load('promoName') +
        ' there. Visit https://www.memberpass.com/';
    var intent = "INTENT"; //leave empty for sending sms using default intent  
    var success = function() {};
    var error = function(e) {};

    sms.send(number, message, intent, success, error);
}

function copyProfileLink() {
    cordova.plugins.clipboard.copy(HOST);
    setSuccessMessage('Link copied and ready to be pasted!');
    showMessage();
}