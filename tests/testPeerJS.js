import {P2PImageServer} from "src/P2PImageServer"
import {P2PImageClient} from "src/P2PImageClient"

//
// make a very simple server that capitalizes the object coming in.
//
window.p2ps = new P2PImageServer({id:'plumkin capitiliztion server' + Math.floor(10000*Math.random())})
p2ps.on('connect', function(args){
  sendToDiv('server', 'client connected to the server')
})
p2ps.on('data', function(args){
  sendToDiv('server', 'server recieved data:' + args.data)
  //capitalize the response
  args.peer.send(args.data.toUpperCase())
})

// connect to a server twice
//
//    the first peer
window.client1 = new P2PImageClient()
client1.connectToPeerID(p2ps.id, function(err, connection) {
  connection.on('connect', function () {
    sendToDiv('client1', "CONNECTED")
    connection.send("hello world")
    sendToDiv('client1', "client 1 sent data: hello world")
  })
  connection.on('data', function (data) {
    sendToDiv('client1', 'client 1 recieved data:' + data)
  })
})
// the second peer
window.client2 = new P2PImageClient()
client2.connectToPeerID(p2ps.id, function(err, connection) {
  connection.on('connect', function () {
    sendToDiv('client2', "CONNECTED")
    connection.send("hello mars")
    sendToDiv('client2', "client 2 sent data: hello mars")
  })
  connection.on('data', function (data) {
    sendToDiv('client2', 'client 2 recieved data:' + data)
  })
})

//
//  Just test if there are more peers
//
client1.getPeerList(function(err,val){
  var count = 0
  for(var i in val) {
    var server = val[i]
    count ++
  }
  console.assert(!err, err)
  console.assert(count > 0, "No servers. That shouldn't happen")
})

//helper function
function sendToDiv(id, text) {
  var el = document.getElementById(id)
  el.innerHTML += "...." + text + " <br>"
}
