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
    apiKey: 'AIzaSyCKuD19DkUeHtEawjVB5IPCXSqe5lkaWIY',
    authDomain: 'workerqueuedemo.firebaseapp.com',
    databaseURL: 'https://workerqueuedemo.firebaseio.com',
    projectId: 'workerqueuedemo',
    storageBucket: 'workerqueuedemo.appspot.com',
    messagingSenderId: '498046902833',
    appId: '1:498046902833:web:40502381ff5ba4db166b10',
    measurementId: 'G-DGFXRT7F49',
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
