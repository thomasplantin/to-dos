// Make auth and firestore references
const auth = firebase.auth();

const btnLogout = document.getElementById('btnLogout');
const loadingSpinner = document.getElementById('loadingSpinner');
const topTitle = document.getElementById('topTitle');
const btnAddList = document.getElementById('btnAddList');
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

    // Add list adding event
    btnAddList.addEventListener('click', e => {
      sendUserToMakeList();
    });

    // Get all the lists from the DB and display them on the page
    getAllListsFromDB(userId).then((lists) => {
      var html = "";
      var titleArray = [];
      var gotPercentagesFlag = false;
      var percentageIterCount = 0;
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
      if(titleArray.length === 0) {
        html = `<p class="no-list-msg">Seems like you don't have a list yet... Let's add one!</p>`;
        loadingSpinner.parentNode.removeChild(loadingSpinner);
        topTitle.classList.remove('hide');
        btnAddList.classList.remove('hide');
        listedLists.innerHTML = html;
      } else {
        for(title of titleArray) {
          const listTitle = title.listTitle;
          const listDesc = title.listDesc;
          getProgressPercentageFromDB(userId, listTitle).then((percentageCompletion) => {
            console.log(percentageIterCount, titleArray);
            percentageIterCount++;
            if(!isNaN(percentageCompletion)) {
              html += 
                `<a href="./listview/title=${listTitle}">
                  <div class="listed-list">
                    <p>${listTitle}</p>
                    <p class="list-description">${listDesc}</p>
                    <p class="list-description">${percentageCompletion}% completed</p>
                  </div>
                </a>`;
            } else {
              html += 
                `<a href="./listview/title=${listTitle}">
                  <div class="listed-list">
                    <p>${listTitle}</p>
                    <p class="list-description">${listDesc}</p>
                    <p class="list-description">0% completed</p>
                  </div>
                </a>`;
            }
            console.log(html);
            if(percentageIterCount === titleArray.length) {
              loadingSpinner.parentNode.removeChild(loadingSpinner);
              topTitle.classList.remove('hide');
              btnAddList.classList.remove('hide');
              listedLists.innerHTML = html;
            }
          });
          // html += 
          // `<a href="./listview/title=${title.listTitle}">
          //   <div class="listed-list">
          //     <p>${title.listTitle}</p>
          //     <p class="list-description">${title.listDesc}</p>
          //   </div>
          // </a>`;
        }
      }
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

function sendUserToMakeList() {
  console.log("Sending User")
  $.ajax({
    type:'get',
    url: window.location.origin + "/mylists",
    success: function() {
      console.log("SUCCESS, user @ login")
      window.location.href = window.location.origin + '/makelist';
    },
    error: function() {
      alert("Oops, couldn't log in. Please try again!");
    }
  });
}