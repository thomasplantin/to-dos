// Make auth and firestore references
const auth = firebase.auth();

const btnLogout = document.getElementById('btnLogout');
const listedLists = document.getElementById('listed-lists');

// Add a realtime listener
auth.onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    const userId = firebaseUser.uid;
    // Add logout event
    btnLogout.addEventListener('click', e => {
      auth.signOut().then(() => {
        console.log(`${firebaseUser.email} signed out successfully`);
        sendUserToLogin();
      }).catch(function(e) {
        console.log(e);
      });
    });
    getAllListsFromDB(userId).then((lists) => {
      var html = "";
      var titleArray = [];
      for(list of lists) {
        titleArray.push({
          listTitle: list.data().listTitle,
          listDesc: list.data().description,
          listTimeStamp: list.data().timeStamp
        });
      }
      titleArray.sort((a, b) => {
        return a.listTitle.toLowerCase().localeCompare(b.listTitle.toLowerCase());
      });
      console.log("Sorted => ", titleArray);
      for(title of titleArray) {
        html += 
        `<a href="./listview/${title.listTitle}">
          <div class="listed-list">
            <p>${title.listTitle}</p>
            <p class="list-description">${title.listDesc}</p>
          </div>
        </a>`;
      }
      listedLists.innerHTML = html;
    });
  } else {
    console.log('not logged in');
  }
});

function sendUserToLogin() {
  console.log("Sending User")
  $.ajax({
    type:'get',
    url: window.location.origin + "/mylists",
    success: function() {
      console.log("SUCCESS, user @ login")
      window.location.href = window.location.origin + '/login';
    },
    error: function() {
      alert("Oops, couldn't log in. Please try again!");
    }
  });
}