// Make auth and firestore references
const auth = firebase.auth();

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
  e.preventDefault();
  // Get email and pass
  const firstName = txtFirstName.value;
  const lastName = txtLastName.value;
  const email = txtEmail.value;
  const pass = txtPassword.value;
  console.log("Sign Up Btn clicked!");
  if(firstName === '' || lastName === '') {
    // Warn the user if firstName or lastName fields are void.
    txtErrMsg.classList.remove('hide');
    txtErrMsg.innerHTML = "Type a first name and a last name.";
  } else {
    // Sign up
    auth.createUserWithEmailAndPassword(email, pass).then(cred => {
      const userId = cred.user.uid;
      const userData = {
        displayName: `${firstName} ${lastName}`,
        email: email,
        provider: "Email & Pass"
      };
      console.log('In signup.js', userId, userData);
      console.log('User created! - ' + userId + ' - adding to DB...');
      return addUserToDB(userId, userData);
    }).then(() => {
      // Send user home
      sendUserHomeFromSignup();
    }).catch(e => {
      console.log(e.message);
      txtErrMsg.classList.remove('hide');
      txtErrMsg.innerHTML = e.message;
    });
  }
});

// Add Google Sign In Event
btnGoogleSignIn.addEventListener('click', e => {
  e.preventDefault();
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
    console.log('At then!');
    sendUserHomeFromSignup();
  }).catch((e) => {
    console.log(e);
    console.log('Failed to link Google account');
  });
});

function sendUserHomeFromSignup() {
  console.log("Sending User Home...")
  $.ajax({
    type:'get',
    url: window.location.origin + "/signup",
    success: () => {
      window.location.href = window.location.origin + '/home';
      console.log("SUCCESS, user @ Home!");
    },
    error: () => {
      alert("Oops, couldn't sign up... Please refresh the page and try again!");
    }
  });
}