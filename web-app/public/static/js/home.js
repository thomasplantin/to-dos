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

// Update firestore settings
// db.settings({timestampsInSnapshots: true});

const btnLogout = document.getElementById('btnLogout');

// Add a realtime listener
auth.onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {

    document.getElementById('greeting').innerHTML = `Welcome ${firebaseUser.displayName}!`;

    // Add logout event
    btnLogout.addEventListener('click', e => {
      auth.signOut().then(function() {
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

// Firebase Database
const preObj = document.getElementById('object');

const dbRefObj = firebase.database().ref().child('collection');

dbRefObj.on('value', snap => {
  console.log(snap.val());
});