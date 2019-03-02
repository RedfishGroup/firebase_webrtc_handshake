import * as firebase2 from "firebase/dist/index.esm";
console.log("firebase,", firebase);
var firebase = firebase2.default;

var defaultFBConfig = {
  apiKey: "AIzaSyBEbLlzJmmOC7CVfbeZs_HQBWia_xSb4sA",
  authDomain: "https://torrid-torch-716.firebaseio.com/",
  databaseURL: "https://torrid-torch-716.firebaseio.com/"
};

var database;

export function getDatabase() {
  if (database) return database;
  firebase.initializeApp(defaultFBConfig);
  database = firebase.database().ref("/");
  return database;
}
