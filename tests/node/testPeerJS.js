// import {P2PServer} from "../src/P2PServer.js"
// import {P2PClient} from "../src/P2PClient.js"
const { P2PClient, P2PServer } = require('../../dist/build.full.cjs')
const { firebase, getPeersRef } = require('./firebase.js')

const database = getPeersRef().parent

const treeTrimmingRef = firebase.child(database, 'treeTrimming')

const settings = {
    // Get a reference to the database service

    // Was having a bug where the WIFI router would crash if the chunk size was bigger than 2^10
    CHUNK_SIZE: Math.pow(2, 14), // size in bytes of the chunks. 2^14 is just under the limit in chrome.
    ICE_SERVERS: [
        {
            urls: 'stun.l.google.com:19302',
        },
    ],
    POLLING_FREQUENCY: 30000,
    debug: false,
}

//helper function
function sendToDiv(id, text) {
    console.log('sedn', { id, text })
}

//
// make a very simple server that capitalizes the object coming in.
//
const serverID =
    'plumkin capitiliztion server' + Math.floor(10000 * Math.random())

const server = new P2PServer({
    id: serverID,
    isStream: false,
    firebase,
    database,
    ICE_SERVERS: settings.ICE_SERVERS,
    treeTrimmingRef,
    debug: false,
})

sendToDiv('Server: ', server.id)

server.on('connect', function (args) {
    sendToDiv('server', 'client connected to the server')
})

server.on('data', function (args) {
    sendToDiv('server', 'server recieved data:' + args.data)
    //capitalize the response
    try {
        var str2 = ab2str(args.data) //sudennly data is coming in as a uint8
        args.peer.send(str2.toUpperCase())
    } catch (err) {
        console.warn(err)
        console.log(args.data)
    }
})

server.on('error', (err) => {
    console.log('error', err)
})

//convert uint8 array to something string
function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf))
}
// connect to a server twice
//
//    the first peer
const client1 = new P2PClient({
    isStream: false,
    firebase,
    database,
    serverID: server.id,
    myID: server.id,
    peerID: server.id,
    ICE_SERVERS: settings.ICE_SERVERS,
    debug: false,
})
client1.connectToPeerID(server.id, function (err, connection) {
    sendToDiv(client1.id, connection)
    if (err) console.log('ERRPR')
    connection.on('connect', function () {
        sendToDiv('client1', 'CONNECTED')
        connection.send('hello world')
        sendToDiv('client1', 'client 1 sent data: hello world')
    })
    connection.on('data', function (data) {
        sendToDiv('client1', 'client 1 recieved data:' + data)
    })
    connection.on('error', (err) => {
        console.log('error', err)
    })
})

sendToDiv(client1.id, 'started')

client1.on('error', (err) => {
    console.log('error', err)
})
client1.on('close', (err) => {
    console.log('lose', err)
})

// // the second peer
// // this one is using the evented events
// const client2 = new P2PClient({
//     isStream: false,
//     firebase,
//     database,
//     myID: server.id,
//     serverID: server.id,
//     ICE_SERVERS: settings.ICE_SERVERS,
// })
// client2.connectToPeerID(server.id)
// client2.on('connect', function (args) {
//     sendToDiv('client2', 'CONNECTED')
//     // console.log('client2 connect', args)
//     args.peer.send('helLO MarS')
//     sendToDiv('client2', 'client 2 sent data: helLO MarS')
// })
// client2.on('data', function (args) {
//     // console.log('client2 data', args)
//     sendToDiv('client2', 'client 2 recieved data:' + args.data)
// })

// //
// //  Just test if there are more peers
// //
// client1.getPeerList(function (err, val) {
//     var count = 0
//     for (var i in val) {
//         var server = val[i]
//         count++
//     }
//     console.assert(!err, err)
//     console.assert(count > 0, "No servers. That shouldn't happen")
// })


// //
// // test if blob support is in yet
// //
// function testBlobSupport() {
//     var client = new P2PClient({
//         isStream: false,
//         firebase,
//         database,
//         myID: server.id,
//         serverID: server.id,
//         ICE_SERVERS: settings.ICE_SERVERS,
//     })
//     client.connectToPeerID(server.id, function (err, connection) {
//         connection.on('connect', function () {
//             try {
//                 connection.send(
//                     new Blob(new Uint8Array(1234), { type: 'image/png' })
//                 )
//                 sendToDiv('server', 'Blobs are now suported')
//             } catch (err2) {
//                 console.error(err2)
//                 sendToDiv('server', 'Blobs are still not supported')
//             }
//         })
//     })
// }
// testBlobSupport()
