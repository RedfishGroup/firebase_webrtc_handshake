const firebaseApp = require('firebase/app')
const {
    child,
    get,
    getDatabase,
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
    startAt,
    update,
} = require('firebase/database')

const firebase = {
    child,
    get,
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
    startAt,
    update,
}

var _FB = undefined

const firebaseConfig = {
    apiKey: 'AIzaSyCjgnd1ZhabqenC69ufvJq5RNA-8Hzk-_U',
    authDomain: 'simtable-tests.firebaseapp.com',
    databaseURL: 'https://simtable-tests.firebaseio.com',
    projectId: 'simtable-tests',
    storageBucket: 'simtable-tests.appspot.com',
    messagingSenderId: '22313002549',
    appId: '1:22313002549:web:3fd31d97fa9c1c53bdb37c',
}

function getFB() {
    if (!_FB) {
        _FB = firebaseApp.initializeApp(firebaseConfig, 'simtable-tests')
    }
    return _FB
}

var FB = getFB()
var root = getDatabase(FB)
var rootRef = ref(root)

// This is the public peer list -- should Rename JBT
var peerListRef = child(rootRef, 'publicPeers/peerInfo')

function getPeersRef() {
    return peerListRef
}

module.exports = {
    getFB,
    firebase,
    firebaseApp,
    getPeersRef,
}
