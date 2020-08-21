// Make auth and firestore references
const auth = firebase.auth();

const loadingSpinner = document.getElementById('loadingSpinner');
const centralMenu = document.getElementById('centralMenu');
const greeting = document.getElementById('greeting');
const btnMakeList = document.getElementById('btnMakeList');
const btnGetLists = document.getElementById('btnGetLists');
const list = document.getElementById('list');
const btnLogout = document.getElementById('btnLogout');

// Add a realtime listener
auth.onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    db.collection('users').doc(firebaseUser.uid).get().then(doc => {
      greeting.innerHTML = `Alright ${firstNameOnly(doc.data().displayName)}, let's get to it!`;
      loadingSpinner.parentNode.removeChild(loadingSpinner);
      centralMenu.classList.remove('hide');
    });
    // Add make list event
    btnMakeList.addEventListener('click', () => {
      sendUserToMakeList();
    });
    // Add get lists event
    btnGetLists.addEventListener('click', () => {
      sendUserToMyLists();
    });
    // Add logout event
    btnLogout.addEventListener('click', e => {
      auth.signOut().then(() => {
        console.log(`${firebaseUser.email} signed out successfully`);
        sendUserToLogin();
      }).catch(function(e) {
        console.log(e);
      });
    });
  } else {
    console.log('not logged in');
  }
});

function sendUserToLogin() {
  console.log("Sending User")
  $.ajax({
    type:'get',
    url: window.location.origin + "/home",
    success: function() {
      console.log("SUCCESS, user @ login")
      window.location.href = window.location.origin + '/login';
    },
    error: function() {
      alert("Oops, couldn't log in. Please try again!");
    }
  });
}

function sendUserToMakeList() {
  console.log("Sending User")
  $.ajax({
    type:'get',
    url: window.location.origin + "/makelist",
    success: function() {
      console.log("SUCCESS, user @ makelist")
      window.location.href = window.location.origin + '/makelist';
    },
    error: function() {
      alert("Oops, couldn't log in. Please try again!");
    }
  });
}

function sendUserToMyLists() {
  console.log("Sending User")
  $.ajax({
    type:'get',
    url: window.location.origin + "/mylists",
    success: function() {
      console.log("SUCCESS, user @ mylists")
      window.location.href = window.location.origin + '/mylists';
    },
    error: function() {
      alert("Oops, couldn't log in. Please try again!");
    }
  });
}