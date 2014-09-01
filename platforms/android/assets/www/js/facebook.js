
function loginMemberpassFB() {
  FB_PLUGIN.info(function(response) {
    $.post(url('login_fb'), {
      access_token: load('fbAccessToken'),
      username: response.first_name + response.last_name,
      identifier: response.id,
      name: response.name,
      email: response.email,
      gender: response.gender,
      age_range: response.age_range
    })
      .done(function(data) {
        store('facebookLoggedIn', 'true');
        store_profile(data);

        if (data.isNew == 'false') {
          if (load('pageFrom') == 'client_seller.html') {
            selectPackage();
          }
          else {
            goTo('index.html');
          }          
        } else {
          goTo('signup_register_as.html', null, 'fade');
        }
      });      
    }, 
    function(e) { 
      //alert(JSON.stringify(e)); 
    }
  );
}

function loginFB() {
  showSpinner();

  FB_PLUGIN.login(
    function(response) {
      store('fbAccessToken', response.accessToken);
      loginMemberpassFB();
    },
    function(e) {
      goBackHistory();
    }
  );  
}

function logout() {
  setSuccessMessage('Logged out successfully');
  if (load('facebookLoggedIn') == "true") {
    FB_PLUGIN.logout(
      function(response) {
        clearSession();
        goBackTo('index.html');
      }
    );
  } else {
    clearSession();
    goBackTo('index.html');
  }
}

function clearSession() {
  reset('facebookLoggedIn');
  reset('memberpassPlan');
  reset('userId');
}
