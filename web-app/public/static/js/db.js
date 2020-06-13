const config = {
  apiKey: "AIzaSyDU5vyYKlQeWyJ2wTQCFmaun51w1ChSlIc",
  authDomain: "to-dos-f9e3d.firebaseapp.com",
  databaseURL: "https://to-dos-f9e3d.firebaseio.com",
  projectId: "to-dos-f9e3d"
};

firebase.initializeApp(config);

const db = firebase.firestore();

// function addDummyData(data) {
//   db.collection('users').doc('lastAddedUser').set(data).then(() => {
//     console.log('Document successfully written!');
//   }).catch(e => {
//     console.log('Error writing document: ', e);
//   });
// }

function addUserToDB(userId, userData) {
  console.log('In db.js', userId, userData);
  db.collection("users").doc(userId).set(userData).catch((e) => {
    console.log("Error adding user to the DB: ", e);
  });
}