
var defaultFBConfig = {
  apiKey: "AIzaSyBEbLlzJmmOC7CVfbeZs_HQBWia_xSb4sA",
  authDomain: "https://torrid-torch-716.firebaseio.com/",
  databaseURL: "https://torrid-torch-716.firebaseio.com/",
  projectId: "torrid-torch-716"
};

var firebase
var firebaseGetDatabase
function initFirebase(newInitFirebase, newGetDataBase, fbConfig = null) {
    if (fbConfig) defaultFBConfig = fbConfig
    if (!firebase) {
        firebase = newInitFirebase(defaultFBConfig)
        firebaseGetDatabase = newGetDataBase
    }

    return { firebase, database: getDatabase() }
}

var database

function getDatabase() {
    if (database) return database
    if (!firebase || !firebaseGetDatabase) {
        throw new Error(
            `init must be called before accessing database.  Got: ${{
                firebase,
                firebaseGetDatabase,
            }}`
        )
    }

    database = firebaseGetDatabase(firebase).ref('/').child('peers')
    return database
}

function getFirebase() {
    return firebase
}

export { getFirebase, getDatabase, initFirebase }