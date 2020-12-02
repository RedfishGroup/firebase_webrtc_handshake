import firebase from 'firebase/app'

var defaultFBConfig = {
  apiKey: "AIzaSyBEbLlzJmmOC7CVfbeZs_HQBWia_xSb4sA",
  authDomain: "https://torrid-torch-716.firebaseio.com/",
  databaseURL: "https://torrid-torch-716.firebaseio.com/",
  projectId: "torrid-torch-716"
};

var database;

export function getDatabase() {
  if (database) return database;
  firebase.initializeApp(defaultFBConfig);
  database = firebase
    .database()
    .ref("/")
    .child("peers");
  return database;
}

export { firebase }