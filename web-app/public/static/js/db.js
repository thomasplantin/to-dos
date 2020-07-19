const config = {
  apiKey: "AIzaSyDU5vyYKlQeWyJ2wTQCFmaun51w1ChSlIc",
  authDomain: "to-dos-f9e3d.firebaseapp.com",
  databaseURL: "https://to-dos-f9e3d.firebaseio.com",
  projectId: "to-dos-f9e3d"
};

firebase.initializeApp(config);

const db = firebase.firestore();

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
    console.log(list);
    return list;
  }
  catch (e) {
    console.log("Error getting list from the DB: ", e);
  }
}