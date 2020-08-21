// Make auth and firestore references
const auth = firebase.auth();

const btnLogout = document.getElementById('btnLogout');
const btnListDel = document.getElementById('btnListDel');
const btnListDelDiv = document.getElementById('btnListDelDiv');
const btnAddItem = document.getElementById('btnAddItem');
const loadingSpinner = document.getElementById('loadingSpinner');

const progressBar = document.getElementById('progressBar');
const listedItems = document.getElementById('listedItems');
const itemForm = document.getElementById('itemForm');

const titleTxt = document.getElementById('title');
const descTxt = document.getElementById('description');

const doneBool = document.getElementById('done');
const itemTxt = document.getElementById('item');
const txtErrMsg = document.getElementById('errMsg');

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

    // On page load
    const urlString = window.location.href;
    const parts = urlString.split("title=");
    const listTitleRaw = parts[1];
    const listTitle = listTitleRaw.replace(/%20/g, " ");
    var itemArray = [];
    getListFromDB(userId, listTitle).then((list) => {
      titleTxt.innerHTML = list.data().listTitle;
      descTxt.innerHTML = list.data().description;
    });
    getProgressPercentageFromDB(userId, listTitle).then((percentageCompletion) => {
      if(!isNaN(percentageCompletion)) {
        progressBar.innerHTML = `
          <p>List ${percentageCompletion}% Completed</p>
          <progress value="${percentageCompletion}" max="100"> ${percentageCompletion}% </progress>
        `;
      }
    });
    getAllItemsFromDB(userId, listTitle).then((items) => {
      var html = "";
      for(item of items) {
        itemArray.push({
          itemTitle: item.data().itemTitle,
          doneStatus: item.data().doneStatus,
          timeStamp: item.data().timeStamp
        });
      }
      itemArray.sort((a, b) => {
        return a.timeStamp - b.timeStamp;
      });
      console.log("Array of items is sorted by date: ", itemArray);
      for(itemData of itemArray) {
        html += addItemToPage(listTitle, itemData);
      }
      loadingSpinner.parentNode.removeChild(loadingSpinner);
      btnListDelDiv.classList.remove('hide');
      itemForm.classList.remove('hide');
      listedItems.innerHTML = html;
    });

    // Add List Delete event
    btnListDel.addEventListener('click', e => {
      if(confirm(`Click OK to delete ${listTitle}.`)) {
        deleteListFromDB(userId, listTitle).then(() => {
          sendUserToMyLists(listTitleRaw);
        });
      } else {
        console.log("Cancelled the list deletion.");
      }
    });

    // Add item submit event
    btnAddItem.addEventListener("click", e => {
      e.preventDefault();
      const item = itemTxt.value;
      const done = doneBool.checked;
      if(!isNullOrWhitespace(item)) {
        txtErrMsg.classList.add('hide');
        itemData = {
          itemTitle: item,
          doneStatus: done,
          timeStamp: Date.now()
        }
        addItemToDB(userId, listTitle, itemData).then(() => {
          console.log('Item Added!', itemData);
          listedItems.innerHTML += addItemToPage(listTitle, itemData);
          // Reset input fields
          itemTxt.value = '';
          doneBool.checked = false;
        }).catch((e) => {
          console.log(e);
        });
        getProgressPercentageFromDB(userId, listTitle).then((percentageCompletion) => {
          if(!isNaN(percentageCompletion)) {
            progressBar.innerHTML = `
              <p>List ${percentageCompletion}% Completed</p>
              <progress value="${percentageCompletion}" max="100"> ${percentageCompletion}% </progress>
            `;
          }
        });
      } else {
        txtErrMsg.classList.remove('hide');
        txtErrMsg.innerHTML = "Please specify an item before adding";
      }
    });

    // Add "Enter" key event
    itemTxt.addEventListener("keyup", (event) => {
      if(event.code === "Enter") { // "Enter" key on the keyboard
        btnAddItem.click();
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

function sendUserToMyLists(listTitle) {
  console.log("Sending User")
  $.ajax({
    type:'get',
    url: window.location.origin + `/listview/title=${listTitle}`,
    success: function() {
      console.log("SUCCESS, user @ login")
      window.location.href = window.location.origin + '/mylists';
    },
    error: function() {
      alert("Oops, couldn't log in. Please try again!");
    }
  });
}