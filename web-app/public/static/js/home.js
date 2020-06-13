// Make auth and firestore references
const auth = firebase.auth();

const list = document.getElementById('list');

db.collection('users').get().then(snapshot => {
  let html = '';
  snapshot.docs.forEach(doc => {
    const guide = doc.data();
    const li = `
    <li>
      <p>${guide.email}</p>
      <p>${guide.displayName}</p>
    </li>
    `;
    html += li;
  });
  list.innerHTML = html;
});

// Update firestore settings
// db.settings({timestampsInSnapshots: true});

const btnLogout = document.getElementById('btnLogout');

// Add a realtime listener
auth.onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {

    console.log(firebaseUser.providerId);

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
      window.location.href = window.location.origin + '/login';
    },
    error: function() {
      alert("Oops, couldn't log in. Please try again!");
    }
  });
}

// // Firebase Database
// const preObj = document.getElementById('object');

// const dbRefObj = firebase.database().ref().child('collection');

// dbRefObj.on('value', snap => {
//   console.log(snap.val());
// });