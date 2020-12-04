
var defaultFBConfig = {
  apiKey: "AIzaSyBEbLlzJmmOC7CVfbeZs_HQBWia_xSb4sA",
  authDomain: "https://torrid-torch-716.firebaseio.com/",
  databaseURL: "https://torrid-torch-716.firebaseio.com/",
  projectId: "torrid-torch-716"
};

var firebase
function initFirebase(newFirebase, fbConfig = null) {
    firebase = newFirebase
    if (fbConfig) defaultFBConfig = fbConfig
    return { firebase, database: getDatabase() }
}


var database;

function getDatabase() {
    if (database) return database
    if (!firebase)
        throw new Error('init must be called before accessing database')

    firebase.initializeApp(defaultFBConfig)
    database = firebase.database().ref('/').child('peers')
    return database
}

function getFirebase() {
    return firebase
}

export { getFirebase, getDatabase, initFirebase }