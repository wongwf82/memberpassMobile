var PICTURE_SOURCE; // picture source
var DESTINATION_TYPE; // sets the format of returned value

$(document).on("pageshow", "#photoPage", function() {
  showMessage();
  showBackButton();
  showHelpButton('help_signup_photo_client.html');
});

function photo() {
  if (load('pageFrom') == 'client_seller.html') {
    selectPackage();
  } else if (load('memberpassPlan') == 'provider') {
    goTo('signup_provider.html');
  } else {
    setSuccessMessage('Welcome! Find a provider and make contact!');
    goTo('index.html');
  }
}

function showPhoto(imageURI) {
  if (load('photoSource') == "album") {
    var largeImage = document.getElementById('largeImage');
    largeImage.src = imageURI;
    largeImage.style.display = 'block';
  } else {
    var smallImage = document.getElementById('smallImage');
    smallImage.src = imageURI;
    smallImage.style.display = 'block';
  }
}

function uploadPhoto(imageURI) {

  showPhoto(imageURI);

  var options = new FileUploadOptions();
  options.fileKey = "file";
  options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
  options.chunkedMode = false;
  options.mimeType = "image/jpeg";
  options.params = {};

  var ft = new FileTransfer();
  ft.upload(imageURI, encodeURI(url('photo_upload', load('userId'))), win, fail, options);
}

function win(r) {
  console.log("Code = " + r.responseCode);
  console.log("Response = " + r.response);
  console.log("Sent = " + r.bytesSent);
}

function fail(error) {
  console.log("upload error source " + error.source);
  console.log("upload error target " + error.target);
}

// A button will call this function

function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
    quality: 50,
    destinationType: DESTINATION_TYPE.DATA_URL
  });
}

// A button will call this function

function capturePhotoEdit() {
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
  store('photoSource', 'camera');
  navigator.camera.getPicture(uploadPhoto, onFail, {
    quality: 20,
    allowEdit: true,
    destinationType: DESTINATION_TYPE.FILE_URI
  });
}

// A button will call this function

function getPhoto(source) {
  // Retrieve image file location from specified source
  store('photoSource', 'album')
  navigator.camera.getPicture(uploadPhoto, onFail, {
    quality: 20,
    destinationType: DESTINATION_TYPE.FILE_URI,
    sourceType: source
  });
}

// Called if something bad happens.

function onFail(message) {
  //    alert('Failed because: ' + message);
}