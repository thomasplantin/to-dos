// Make auth and firestore references
const auth = firebase.auth();

const btnLogout = document.getElementById('btnLogout');
const txtListTitle = document.getElementById('listTitle');
const txtListDesc = document.getElementById('listDescription');
const txtErrMsg = document.getElementById('errMsg');
const btnAddList = document.getElementById('submitList');

// Add a realtime listener
auth.onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    const userId = firebaseUser.uid;
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
      if(!isNullOrWhitespace(listTitle)) {
        getAllListsFromDB(userId).then((lists) => {
          var uniqueTitle = true;
          for(list of lists) {
            if(list.data().listTitle === listTitle) {
              console.log("Error - List title already exists.");
              uniqueTitle = false;
            }
          }
          if(uniqueTitle) {
            listData = {
              listTitle: listTitle,
              description: listDesc,
              timeStamp: Date.now(),
              image: "imgURL",
              geoLoc: "geoCoordNOW"
            }
            console.log("Adding List to DB...");
            txtErrMsg.classList.add('hide');
            addListToDB(userId, listData).then(() => {
              console.log(listTitle, listDesc);
              sendUserToListView(listTitle, listDesc);
            }).catch((e) => {
              console.log(e);
            });
          } else {
            txtErrMsg.classList.remove('hide');
            txtErrMsg.innerHTML = "This list title is already used by another list. Please change the title of the list or delete the already existing list.";
          }
        });
      } else {
        txtErrMsg.classList.remove('hide');
        txtErrMsg.innerHTML = "Please enter a list title";
      }
    });
  } else {
    console.log('not logged in');
  }
});

function sendUserToLogin() {
  console.log("Sending User to login")
  $.ajax({
    type:'get',
    url: window.location.origin + "/makelist",
    success: function() {
      console.log("SUCCESS, user @ login");
      window.location.href = window.location.origin + '/login';
    },
    error: function() {
      alert("Oops, couldn't send to login. Please try again!");
    }
  });
}

function sendUserToListView(listTitle, listDesc) {
  console.log("Sending User to list view - ", listTitle, listDesc);
  $.ajax({
    type:'post',
    url: window.location.origin + "/makelist",
    data: {
      listTitle: listTitle,
      listDesc: listDesc
    },
    success: function() {
      console.log("SUCCESS, user @ list view");
      window.location.href = window.location.origin + `/listview/title=${listTitle}`;
    },
    error: function() {
      alert("Oops, couldn't send to list view. Please try again!");
    }
  });
}