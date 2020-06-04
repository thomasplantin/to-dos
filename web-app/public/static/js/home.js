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

const btnLogout = document.getElementById('btnLogout');

// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    // Add logout event
    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut().then(function() {
        console.log(`${firebaseUser.email} signed out successfully`);
        sendUserToOrigin();
      }).catch(function(e) {
        console.log(e);
      });
    });
  } else {
    console.log('not logged in');
  }
});

function sendUserToOrigin() {
  console.log("Sending User")
  $.ajax({
    type:'get',
    url: window.location.origin + "/home",
    success: function() {
      console.log("SUCCESS")
      window.location.href = window.location.origin + '/auth';
    },
    error: function() {
      alert("Oops, couldn't log in. Please try again!");
    }
  });
}