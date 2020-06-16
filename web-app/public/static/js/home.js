// Make auth and firestore references
const auth = firebase.auth();

const greeting = document.getElementById('greeting');
const list = document.getElementById('list');
const btnLogout = document.getElementById('btnLogout');

// Add a realtime listener
auth.onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    db.collection('users').doc(firebaseUser.uid).get().then(doc => {
      greeting.innerHTML = `Welcome ${doc.data().displayName}!`;
      const html = `
      <li>
        <p>email = ${doc.data().email}</p>
        <p>name = ${doc.data().displayName}</p>
        <p>provider = ${doc.data().provider}</p>
      </li>
      `;
      list.innerHTML = html;
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