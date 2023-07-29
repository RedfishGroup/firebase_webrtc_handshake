import { firebaseAuth, firebaseApp, firebaseDatbase } from '../deps.js'

const { initializeApp } = firebaseApp
const { getAuth, onAuthStateChanged } = firebaseAuth

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
} = firebaseDatbase

import { acequiaConfig } from '../config.js'

export {
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

let _FB
export function getFB() {
    if (!_FB) {
        _FB = initializeApp(acequiaConfig, 'acequia')
    }
    return _FB
}

var FB = getFB()

console.log('FB: ', FB)

export const root = getDatabase(FB)
export const rootRef = ref(root)

export const auth = getAuth(getFB())

let resolveReady
let readyPromise = new Promise((resolve) => {
    resolveReady = resolve
})

onAuthStateChanged(auth, (user) => {
    resolveReady(user)
})

export function firebaseReady() {
    return readyPromise
}

export function refToPromise(ref) {
    return new Promise((resolve, reject) => {
        try {
            onValue(
                ref,
                (snapshot) => {
                    resolve(snapshot.val())
                },
                { onlyOnce: true }
            )
        } catch (e) {
            reject(e)
        }
    })
}
