// import {P2PServer} from "../src/P2PServer.js"
// import {P2PClient} from "../src/P2PClient.js"
const { P2PClient, P2PServer } = require('../../dist/build.full.cjs')

//
// make a very simple server that capitalizes the object coming in.
//
const server = new P2PServer({
    id: 'plumkin capitiliztion server' + Math.floor(10000 * Math.random()),
    isStream: false,
})

console.log('Server: ', server.id)

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

//convert uint8 array to something string
function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf))
}
// connect to a server twice
//
//    the first peer
const client1 = new P2PClient({ isStream: false })
client1.connectToPeerID(server.id, function (err, connection) {
    connection.on('connect', function () {
        sendToDiv('client1', 'CONNECTED')
        connection.send('hello world')
        sendToDiv('client1', 'client 1 sent data: hello world')
    })
    connection.on('data', function (data) {
        sendToDiv('client1', 'client 1 recieved data:' + data)
    })
})
// the second peer
// this one is using the evented events
const client2 = new P2PClient({ isStream: false })
client2.connectToPeerID(server.id)
client2.on('connect', function (args) {
    sendToDiv('client2', 'CONNECTED')
    // console.log('client2 connect', args)
    args.peer.send('helLO MarS')
    sendToDiv('client2', 'client 2 sent data: helLO MarS')
})
client2.on('data', function (args) {
    // console.log('client2 data', args)
    sendToDiv('client2', 'client 2 recieved data:' + args.data)
})

//
//  Just test if there are more peers
//
client1.getPeerList(function (err, val) {
    var count = 0
    for (var i in val) {
        var server = val[i]
        count++
    }
    console.assert(!err, err)
    console.assert(count > 0, "No servers. That shouldn't happen")
})

//helper function
function sendToDiv(id, text) {
    console.log({ id, text })
}

//
// test if blob support is in yet
//
function testBlobSupport() {
    var client = new P2PClient({ isStream: false })
    client.connectToPeerID(server.id, function (err, connection) {
        connection.on('connect', function () {
            try {
                connection.send(
                    new Blob(new Uint8Array(1234), { type: 'image/png' })
                )
                sendToDiv('server', 'Blobs are now suported')
            } catch (err2) {
                console.error(err2)
                sendToDiv('server', 'Blobs are still not supported')
            }
        })
    })
}
testBlobSupport()
