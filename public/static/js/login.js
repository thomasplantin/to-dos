// Make auth and firestore references
const auth = firebase.auth();

// Get elements
const txtFirstName = document.getElementById('firstName');
const txtLastName = document.getElementById('lastName');
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogIn');
const txtErrMsg = document.getElementById('errMsg');

const btnGoogleSignIn = document.getElementById('btnSignInGoogle');
const btnFBSignIn = document.getElementById('btnSignInFB');

// Add login event
btnLogin.addEventListener('click', e => {
  // Get email and pass
  const email = txtEmail.value;
  const pass = txtPassword.value;
  // Sign in
  auth.signInWithEmailAndPassword(email, pass).then(() => {
    sendUserHomeFromLogin();
  }).catch(e => {
    console.log(e.message);
    txtErrMsg.classList.remove('hide');
    txtErrMsg.innerHTML = e.message;
  });

});

// Add Google Log In Event
btnGoogleSignIn.addEventListener('click', e => {
  const base_provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(base_provider).then((result) => {
    const user = result.user;
    const isNewUser = result.additionalUserInfo.isNewUser;
    if(isNewUser) {
      // Add user to DB
      console.log('We got a new user!!');
      const userId = result.user.uid;
      const userData = {
        displayName: result.user.displayName,
        email: result.user.email,
        provider: "Google"
      };
      console.log('User created with Google! - ' + userId + ' - adding to DB...');
      return addUserToDB(userId, userData);
    } else {
      // your sign in flow
      console.log('user ' + user.email + ' already exists');
      console.log('Success, Google account linked!');
      return;
    }
  }).then(() => {
    // Send User Home
    sendUserHomeFromLogin();
  }).catch((e) => {
    console.log(e);
    console.log('Failed to link Google account');
  });
});

// Add FB Log In Event
btnFBSignIn.addEventListener('click', e => {
  const base_provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(base_provider).then((result) => {
    const user = result.user;
    const isNewUser = result.additionalUserInfo.isNewUser;
    if(isNewUser) {
      // Add user to DB
      console.log('We got a new user!!');
      const userId = result.user.uid;
      const userData = {
        displayName: result.user.displayName,
        email: result.user.email,
        provider: "Google"
      };
      console.log('User created with Google! - ' + userId + ' - adding to DB...');
      return addUserToDB(userId, userData);
    } else {
      // your sign in flow
      console.log('user ' + user.email + ' already exists');
      console.log('Success, Google account linked!');
      return;
    }
  }).then(() => {
    // Send User Home
    sendUserHomeFromLogin();
  }).catch((e) => {
    console.log(e);
    console.log('Failed to link Google account');
  });
});

function sendUserHomeFromLogin() {
  console.log("Sending User Home...")
  $.ajax({
    type:'get',
    url: window.location.origin + "/login",
    success: () => {
      window.location.href = window.location.origin + '/home';
      console.log("SUCCESS, user @ Home!");
    },
    error: () => {
      alert("Oops, couldn't sign up... Please refresh the page and try again!");
    }
  });
}