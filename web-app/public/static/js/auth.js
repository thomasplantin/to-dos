const config = {
  apiKey: "AIzaSyDU5vyYKlQeWyJ2wTQCFmaun51w1ChSlIc",
  authDomain: "to-dos-f9e3d.firebaseapp.com",
  databaseURL: "https://to-dos-f9e3d.firebaseio.com",
  projectId: "to-dos-f9e3d",
  storageBucket: "to-dos-f9e3d.appspot.com",
  messagingSenderId: "560702819439",
  appId: "1:560702819439:web:546d3a7359b01a91ef119a",
  measurementId: "G-QMTJE3FMT8"
};

firebase.initializeApp(config);

// Get elements
const txtFirstName = document.getElementById('firstName');
const txtLastName = document.getElementById('lastName');
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogIn');
const btnSignUp = document.getElementById('btnSignUp');
const txtErrMsg = document.getElementById('errMsg');
const errMsgBg = document.getElementById('errMsgBg');

const btnGoogleSignIn = document.getElementById('btnSignInGoogle');

// Add login event
btnLogin.addEventListener('click', e => {
  // Get email and pass
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => {
    console.log(e.message);
    errMsgBg.classList.remove('hide');
    txtErrMsg.classList.remove('hide');
    txtErrMsg.innerHTML = e.message;
  });

});

// Add signup event
btnSignUp.addEventListener('click', e => {
  // Get email and pass
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => {
    console.log(e.message);
    errMsgBg.classList.remove('hide');
    txtErrMsg.classList.remove('hide');
    txtErrMsg.innerHTML = e.message;
  });
});

// Add Google Sign In Event
btnGoogleSignIn.addEventListener('click', e => {
  const base_provider = new firebase.auth.GoogleAuthProvider();
  const auth = firebase.auth();
  auth.signInWithPopup(base_provider).then(function(result) {
    console.log(result);
    console.log('Success, Google account linked!');
  }).catch(function(e) {
    console.log(e);
    console.log('Failed to link Google account');
  });
});

// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(`Logged in as ${txtFirstName.value} ${txtLastName.value} (${firebaseUser.email})`);
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
    type:'post',
    url: window.location.origin + "/auth",
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