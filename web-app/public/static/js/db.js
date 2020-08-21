const config = {
  apiKey: "AIzaSyDU5vyYKlQeWyJ2wTQCFmaun51w1ChSlIc",
  authDomain: "to-dos-f9e3d.firebaseapp.com",
  databaseURL: "https://to-dos-f9e3d.firebaseio.com",
  projectId: "to-dos-f9e3d"
};

firebase.initializeApp(config);

const db = firebase.firestore();

// ------------------------------------------------- Handling Users

async function addUserToDB(userId, userData) {
  console.log('In db.js - addUserToDB() - ', userId, userData);
  try {
    await db
      .collection("users")
      .doc(userId)
      .set(userData);
    console.log("User successfully added to the DB!");
  }
  catch (e) {
    console.log("Error adding user to the DB: ", e);
  }
}

// ------------------------------------------------- Handling Lists

async function addListToDB(userId, listData) {
  console.log("In db.js - addListToDB() - ", userId, listData);
  try {
    await db
      .collection("users").doc(userId)
      .collection("lists").doc(listData.listTitle)
      .set(listData);
    console.log("List successfully added to the DB!");
  }
  catch (e) {
    console.log("Error adding list to the DB: ", e);
  }
}

async function getAllListsFromDB(userId) {
  console.log("In db.js - getAllListsFromDB() - ", userId);
  try {
    const lists = [];
    await db
      .collection("users").doc(userId)
      .collection("lists").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          lists.push(doc);
        });
      }).catch((error) => {
        console.log("Error getting documents: ", error);
      });
    return lists;
  }
  catch (e) {
    console.log("Error getting list from the DB: ", e);
  }
}

async function getListFromDB(userId, listTitle) {
  console.log("In db.js - getListFromDB() - ", userId, listTitle);
  try {
    const list = await db
      .collection("users").doc(userId)
      .collection("lists").doc(listTitle)
      .get().catch((error) => {
        console.log("Error getting document: ", error);
      });
    console.log(list.data());
    return list;
  }
  catch (e) {
    console.log("Error getting list from the DB: ", e);
  }
}

async function deleteListFromDB(userId, listTitle) {
  console.log("In db.js - deleteListFromDB() - ", userId, listTitle);
  try {
    const list = await db
      .collection("users").doc(userId)
      .collection("lists").doc(listTitle)
      .delete().then(() => {
        console.log("Successfully deleted document!");
      }).catch((error) => {
        console.log("Error deleting document: ", error);
      });
  }
  catch (e) {
    console.log("Error getting list from the DB: ", e);
  }
}

// ------------------------------------------------- Handling List Items

async function addItemToDB(userId, listTitle, itemData) {
  console.log("In db.js - addItemToDB() - ", userId, listTitle, itemData);
  try {
    await db
      .collection("users").doc(userId)
      .collection("lists").doc(listTitle)
      .collection("items").doc(itemData.itemTitle)
      .set(itemData);
    console.log("Item successfully added to the DB!");
  }
  catch (e) {
    console.log("Error adding item to the DB: ", e);
  }
}

async function getAllItemsFromDB(userId, listTitle) {
  console.log("In db.js - getAllItemsFromDB() - ", userId, listTitle);
  try {
    const items = [];
    await db
      .collection("users").doc(userId)
      .collection("lists").doc(listTitle)
      .collection("items").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          items.push(doc);
        });
      }).catch((error) => {
        console.log("Error getting items: ", error);
      });
    return items;
  }
  catch (e) {
    console.log("Error getting list from the DB: ", e);
  }
}

async function getItemFromDB(userId, listTitle, listItem) {
  console.log("In db.js - getItemFromDB() - ", userId, listTitle, listItem);
  try {
    const list = await db
      .collection("users").doc(userId)
      .collection("lists").doc(listTitle)
      .collection("items").doc(listItem)
      .get().catch((error) => {
        console.log("Error getting document: ", error);
      });
    console.log(list.data());
    return list;
  }
  catch (e) {
    console.log("Error getting list from the DB: ", e);
  }
}

async function deleteItemFromDB(userId, listTitle, listItem) {
  console.log("In db.js - deleteItemFromDB() - ", userId, listTitle, listItem);
  try {
    const list = await db
      .collection("users").doc(userId)
      .collection("lists").doc(listTitle)
      .collection("items").doc(listItem)
      .delete().then(() => {
        console.log("Successfully deleted document!");
      }).catch((error) => {
        console.log("Error deleting document: ", error);
      });
  }
  catch (e) {
    console.log("Error getting list from the DB: ", e);
  }
}

// ------------------------------------------------- Handling Progress Bar

async function getProgressPercentageFromDB(userId, listTitle) {
  try {
    var totalCount = 0;
    var completedCount = 0;
    await getAllItemsFromDB(userId, listTitle).then((items) => {
      for(item of items) {
        totalCount++;
        if(item.data().doneStatus) {
          completedCount++;
        }
      }
    });
    const percentageDone = (completedCount/totalCount*100).toFixed(0);
    console.log("Percentage = " + percentageDone + "%");
    return percentageDone;
  } catch (e) {
    console.log("Error getting progress percentage from the DB: ", e);
  }
}