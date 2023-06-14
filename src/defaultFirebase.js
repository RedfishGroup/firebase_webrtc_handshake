import { initializeApp } from 'firebase/app'

import {
    child,
    getDatabase as _getDatabase,
    off,
    onChildAdded,
    onDisconnect,
    onValue,
    orderByValue,
    push,
    query,
    ref,
    remove,
    serverTimestamp,
    set,
    update,
} from 'firebase/database'

export const firebaseMethods = {
    child,
    off,
    onChildAdded,
    onDisconnect,
    onValue,
    orderByValue,
    push,
    query,
    ref,
    remove,
    serverTimestamp,
    set,
    update,
}


var defaultFBConfig = {
    apiKey: 'AIzaSyBEbLlzJmmOC7CVfbeZs_HQBWia_xSb4sA',
    authDomain: 'https://torrid-torch-716.firebaseio.com/',
    databaseURL: 'https://torrid-torch-716.firebaseio.com/',
    projectId: 'torrid-torch-716',
}

var firebase
function initFirebase(fbConfig = null) {
    if (fbConfig) defaultFBConfig = fbConfig

    if (!firebase) {
        firebase = initializeApp(defaultFBConfig)
    }

    return { firebase, database: getDatabase() }
}

var database

function getDatabase() {
    if (database) return database

    if (!firebase) {
        throw new Error(
            `init must be called before accessing database.  no firebase`
        )
    }

    database = child(ref(_getDatabase(firebase)), 'peers-channels')
    return database
}

function getFirebase() {
    return firebase
}

export { getFirebase, getDatabase, initFirebase }
