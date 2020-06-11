const config = {
  apiKey: "AIzaSyDU5vyYKlQeWyJ2wTQCFmaun51w1ChSlIc",
  authDomain: "to-dos-f9e3d.firebaseapp.com",
  databaseURL: "https://to-dos-f9e3d.firebaseio.com",
  projectId: "to-dos-f9e3d"
};

firebase.initializeApp(config);

// Make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();

// Get elements
const txtFirstName = document.getElementById('firstName');
const txtLastName = document.getElementById('lastName');
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnSignUp = document.getElementById('btnSignUp');
const txtErrMsg = document.getElementById('errMsg');

const btnGoogleSignIn = document.getElementById('btnSignInGoogle');

// Add signup event
btnSignUp.addEventListener('click', e => {
  // Get email and pass
  const firstName = txtFirstName.value;
  const lastName = txtLastName.value;
  const email = txtEmail.value;
  const pass = txtPassword.value;
  console.log(firstName, lastName);
  if(firstName === '' || lastName === '') {
    txtErrMsg.classList.remove('hide');
    txtErrMsg.innerHTML = "Type a first name and a last name.";
  } else {
    // Add info to database
    db.collection('users').doc(email).set({
      firstName: firstName,
      lastName: lastName,
      email: email
    }).then(function() {
      console.log('Document successfully written!');
    }).catch(e => {
      console.log('Error writing document: ', e);
    });
    // Sign up
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => {
      console.log(e.message);
      txtErrMsg.classList.remove('hide');
      txtErrMsg.innerHTML = e.message;
    });
  }
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
    url: window.location.origin + "/signup",
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