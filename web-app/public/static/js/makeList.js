// Make auth and firestore references
const auth = firebase.auth();

const btnLogout = document.getElementById('btnLogout');
const txtListTitle = document.getElementById('listTitle');
const txtListDesc = document.getElementById('listDescription');
const btnAddList = document.getElementById('submitList');

// Add a realtime listener
auth.onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    userId = firebaseUser.uid;
    console.log(userId);
    // Add logout event
    btnLogout.addEventListener('click', e => {
      auth.signOut().then(() => {
        console.log(`${firebaseUser.email} signed out successfully`);
        sendUserToLogin();
      }).catch(function(e) {
        console.log(e);
      });
    });
    // Add make list event
    btnAddList.addEventListener('click', e => {
      e.preventDefault();
      const listTitle = txtListTitle.value;
      const listDesc = txtListDesc.value;
      listData = {
        listTitle: listTitle,
        description: listDesc,
        timeStamp: Date.now(),
        image: "imgURL",
        geoLoc: "geoCoordNOW"
      }
      console.log("Adding List to DB...")
      addListToDB(userId, listData);
    });
  } else {
    console.log('not logged in');
  }
});

function sendUserToLogin() {
  console.log("Sending User")
  $.ajax({
    type:'get',
    url: window.location.origin + "/makelist",
    success: function() {
      console.log("SUCCESS, user @ login")
      window.location.href = window.location.origin + '/login';
    },
    error: function() {
      alert("Oops, couldn't log in. Please try again!");
    }
  });
}