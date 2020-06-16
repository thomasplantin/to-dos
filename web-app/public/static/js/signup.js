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
        email: email
      };
      console.log('In signup.js', userId, userData);
      console.log('User created! - ' + userId + ' - adding to DB...');
      return addUserToDB(userId, userData);
    }).then(() => {
      // Send user home
      sendUserHome();
    }).catch(e => {
      console.log(e.message);
      txtErrMsg.classList.remove('hide');
      txtErrMsg.innerHTML = e.message;
    });
  }
});

// Add Google Sign In Event
btnGoogleSignIn.addEventListener('click', e => {
  const base_provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(base_provider).then((result) => {
    console.log(result);
    console.log('Success, Google account linked!');
    sendUserHome();
  }).catch((e) => {
    console.log(e);
    console.log('Failed to link Google account');
  });
});

function sendUserHome() {
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