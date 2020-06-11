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

// Add login event
btnLogin.addEventListener('click', e => {
  // Get email and pass
  const email = txtEmail.value;
  const pass = txtPassword.value;
  // Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => {
    console.log(e.message);
    txtErrMsg.classList.remove('hide');
    txtErrMsg.innerHTML = e.message;
  });

});

// Add Google Sign In Event
btnGoogleSignIn.addEventListener('click', e => {
  const base_provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(base_provider).then(function(result) {
    console.log(result);
    console.log('Success, Google account linked!');
  }).catch(function(e) {
    console.log(e);
    console.log('Failed to link Google account');
  });
});

// Add a realtime listener
auth.onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(`Logged in as (${firebaseUser.email})`);
    firebaseUser.getIdToken().then(function(token) {
      document.cookie = "token=" + token;
    });
    sendUser(firebaseUser);
  } else {
    console.log('not logged in');
  }
});

function sendUser(user) {
  console.log("Sending User")
  $.ajax({
    type:'get',
    url: window.location.origin + "/login",
    data: {
      email: user.email,
      username: user.displayName
    },
    success: function() {
      console.log("SUCCESS")
      window.location.href = window.location.origin + '/home';
    },
    error: function() {
        alert("Oops, couldn't log in. Please try again!");
    }
  });
}