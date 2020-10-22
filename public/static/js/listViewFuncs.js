function checkboxClick(listTitle, item) {
  listTitle = listTitle.replace(/-/g, "'");
  item = item.replace(/-/g, "'");
  console.log("checkbox clicked on " + item);
  const cssInput = spacesToColons(item);
  const inputDiv = document.getElementById(`div-${cssInput}`);
  const inputLabel = document.getElementById(`label-${cssInput}`);
  const inputState = document.getElementById(`check-${cssInput}`);
  const auth = firebase.auth();
  auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      const userId = firebaseUser.uid;
      var doneStatus = false;
      var timeStamp = 0;
      getItemFromDB(userId, listTitle, item).then((myItem) => {
        timeStamp = myItem.data().timeStamp;
        if(inputState.checked) {
          console.log('checked!');
          doneStatus = true;
          inputDiv.classList.remove("single-item");
          inputLabel.classList.remove("item-txt");
          inputDiv.classList.add("single-item-crossed");
          inputLabel.classList.add("item-txt-crossed");
        } else {
          console.log('not checked!');
          inputDiv.classList.remove("single-item-crossed");
          inputLabel.classList.remove("item-txt-crossed");
          inputDiv.classList.add("single-item");
          inputLabel.classList.add("item-txt");
        }
        itemData = {
          itemTitle: item,
          doneStatus: doneStatus,
          timeStamp: timeStamp
        }
        addItemToDB(userId, listTitle, itemData).then(() => {
          console.log('Item Changed!', itemData);
          getProgressPercentageFromDB(userId, listTitle).then((percentageCompletion) => {
            if(!isNaN(percentageCompletion)) {
              progressBar.innerHTML = `
                <p>List ${percentageCompletion}% Completed</p>
                <progress value="${percentageCompletion}" max="100"> ${percentageCompletion}% </progress>
              `;
            }
          });
        });
      });
    }
  });
}

function trashClick(listTitle, item) {
  listTitle = listTitle.replace(/-/g, "'");
  item = item.replace(/-/g, "'");
  console.log("trash clicked on " + item);
  const auth = firebase.auth();
  auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      const userId = firebaseUser.uid;
      deleteItemFromDB(userId, listTitle, item).then(() => {
        const cssInput = spacesToColons(item);
        const inputDiv = document.getElementById(`div-${cssInput}`);
        inputDiv.parentNode.removeChild(inputDiv);
        getProgressPercentageFromDB(userId, listTitle).then((percentageCompletion) => {
          if(!isNaN(percentageCompletion)) {
            progressBar.innerHTML = `
              <p>List ${percentageCompletion}% Completed</p>
              <progress value="${percentageCompletion}" max="100"> ${percentageCompletion}% </progress>
            `;
          }
        });
      });
    }
  });
}

// function addPercentageBarToPage(listTitle) {

// }

function addItemToPage(listTitle, itemData) {
  const item = itemData.itemTitle;
  const state = itemData.doneStatus;
  console.log(item, state);
  if(state) {
    return `
      <div id="div-${spacesToColons(item)}" class="single-item-crossed">
        <label id="label-${spacesToColons(item)}" class="item-txt-crossed">
          <input id="check-${spacesToColons(item)}" onclick="checkboxClick('${listTitle.replace(/'/g, "-")}', '${item.replace(/'/g, "-")}')" class="check" type="checkbox" checked/> ${item}
          <button id="trash-${spacesToColons(item)}" onclick="trashClick('${listTitle.replace(/'/g, "-")}', '${item.replace(/'/g, "-")}')" type="button" class="btn btn-secondary btn-item-margin">
            <div class="tiny-trash-div">
              <i class="fas fa-trash-alt trash-font"></i>
            </div>
          </button>
        </label>
      </div>
    `;
  } else {
    return `
      <div id="div-${spacesToColons(item)}" class="single-item">
        <label id="label-${spacesToColons(item)}" class="item-txt">
          <input id="check-${spacesToColons(item)}" onclick="checkboxClick('${listTitle.replace(/'/g, "-")}', '${item.replace(/'/g, "-")}')" class="check" type="checkbox"/> ${item}
          <button id="trash-${spacesToColons(item)}" onclick="trashClick('${listTitle.replace(/'/g, "-")}', '${item.replace(/'/g, "-")}')" type="button" class="btn btn-secondary btn-item-margin">
            <div class="tiny-trash-div">
              <i class="fas fa-trash-alt trash-font"></i>
            </div>
          </button>
        </label>
      </div>
    `;
  }
}