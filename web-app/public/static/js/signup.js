// const info = require('./../../../config.js');

// console.log(info.FIREBASE_API_KEY);

const config = {
  // apiKey: info.FIREBASE_API_KEY,
  // authDomain: info.FIREBASE_AUTH_DOMAIN,
  // databaseURL: info.FIREBASE_DATABASE_URL,
  // storageBucket: info.FIREBASE_STORAGE_BUCKET,
  apiKey: "AIzaSyDU5vyYKlQeWyJ2wTQCFmaun51w1ChSlIc",
  authDomain: "to-dos-f9e3d.firebaseapp.com",
  databaseURL: "https://to-dos-f9e3d.firebaseio.com",
  storageBucket: "to-dos-f9e3d.appspot.com",
};

firebase.initializeApp(config);

// Get elements
const txtFirstName = document.getElementById('firstName');
const txtLastName = document.getElementById('lastName');
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogIn');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');
const txtErrMsg = document.getElementById('errMsg');
const errMsgBg = document.getElementById('errMsgBg');

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

// Add logout event
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(firebaseUser);
    errMsgBg.classList.add('hide');
    txtErrMsg.classList.add('hide');
    btnLogout.classList.remove('hide');
  } else {
    console.log('not logged in');
    btnLogout.classList.add('hide');
  }
});

// function onGoogleSignIn(googleUser) {
//   const profile = googleUser.getBasicProfile();
//   // window.location.replace('/home');
//   console.log(window.location.pathname);
//   console.log("Google User = " + JSON.stringify(googleUser));
//   document.querySelector("#content").innerText = profile.getName();
//   document.querySelector("#avatar").setAttribute('src', profile.getImageUrl());
// }

// function signOut() {
//   gapi.auth2.getAuthInstance().signOut().then( function() {
//     console.log('User signed out');
//   });
// }