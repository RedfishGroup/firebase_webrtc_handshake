import * as dtls from "src/dataUtils.js"
import {P2PImageServer} from "../src/P2PImageServer.js"
import {P2PImageClient} from "../src/P2PImageClient.js"
import * as binarize from "bower_components/binarize.js/src/binarize.js"

function runTests() {
  // 1
  try{
    test1chunking()
    logMessage( "<div>Test Chunking: Passed</div>")
  } catch(e) {
    console.error(e)
    logMessage( "<div>Test Chunking <b>Failed</b>. See console for details</div>")
  }
  // 2
  //testBlobSupport()
  // 3
  //testIfItGetsFragmented()
  // 4
  //testImage()
  // 5
  testSendingImage()
}

function test1chunking() {
  var pass = true
  var zeroApeared = false
  // fill array with random values between 1 and something
  console.log(dtls)
  var a = new ArrayBuffer(4*1280*1280) // a good resolution for an image, rgba
  var aview = new Uint8Array(a)
  for(var j=0; j<aview.length; j++){
    aview[j] = Math.random()*100 + 1
  }
  // chunk and unChunk
  var chunks = dtls.arrayBufferToChunks(a)
  var a2 = dtls.unChunk(chunks)
  for(var j=0; j<aview.length; j++){
    if(aview[j] != a2[j]) {
      pass = false
    }
    if(aview[j] == 0 || a2[j] == 0) {
      zeroApeared = true
    }
  }
  //
  if(!pass){
    throw('chunk test failed, values Do not equal')
  } else if(zeroApeared) {
    throw('chunk test failed. There should not be any zeros')
  } else {
    console.log('chunking test passed')
  }
}

function testImage(){
  var im = new Image()
  im.onload = function(){
    console.log('Image loaded')
    dtls.imageToBlob(im, function(blob){
      dtls.generateWebRTCpayload(blob, function(val){
        console.log('fsgsdfg', val)
        var stillbin = dtls.unChunk(val.chunks)
        console.log('binary unchunked:',stillbin)
        binarize.unpack(stillbin.buffer, function(bob){
          console.time('arrayToBlobToImage')
          var url = URL.createObjectURL(bob)
          logMessage('Image check<br>')
          logMessage(`<img src="${url}" width=300 height=200/>`)
          console.timeEnd('arrayToBlobToImage')
          //document.body.appendChild(img)
        })
      })
   })
  }
  im.src = "owls.jpg"
}

function testSendingImage(){
  console.log('test sending image called')
  var server2 = new P2PImageServer({id:'image test ' + Math.floor(10000*Math.random())})
  var client2 = new P2PImageClient()
  var im = new Image()
  im.onload = function(){
    console.log('Image2 loaded')
    dtls.imageToBlob(im, function(blob){
      dtls.generateWebRTCpayload(blob, function(val){
        client2.connection.send(val.header)
        for(var i in val.chunks){
          var ch = val.chunks[i]
          console.log('sending', ch)
          client2.connection.send(ch.buffer)
        }
      })
   })
  }
  server2.on('data', function(args){
    console.log('server2 recived data', args)
  })
  client2.connectToPeerID(server2.id, function(err, connection) {
    connection.on('connect', function () {
      im.src = "owls.jpg"
    })
  })
}

function logMessage(messageHTML){
  var dv = document.getElementById('tests')
  dv.innerHTML += messageHTML
  console.log(messageHTML)
}

function testBlobSupport(){
  var server = new P2PImageServer({id:'blob test ' + Math.floor(10000*Math.random())})
  var client = new P2PImageClient()
  client.connectToPeerID(server.id, function(err, connection) {
    connection.on('connect',function(){
        try{
          connection.send( new Blob(new Uint8Array(1234), {type: 'image/png'}))
          alert('blobs are now supported. This warrents a re-write of some stuff')
          logMessage('<div> Test Blob support: Blobs are now suported</div>')
        } catch(err2) {
          console.error(err2)
          logMessage('<div> Test Blob support: Blobs are still not supported</div>')
        }
    })
  })
}

var testIfItGetsFragmented = function(){
  console.log('testing fragmentation of message')
  var bufferSize = Math.pow(2,17)// 66528 looks like the max size per chunk
  var server3frag = new P2PImageServer({id:'auto fragmentation test ' + Math.floor(10000*Math.random())})
  var client3frag = new P2PImageClient()
  var chunkCount=0
  var chunksizes=[]
  var passed = 0
  var timeoutID
  // server and client listeners
  server3frag.on('connect', function(args){
    //console.log('server 3:', 'client connected to the server')
  })
  server3frag.on('data', function(args){
    //console.log('server 3 recieved data', args)
    chunkCount ++
    chunksizes.push(args.data.length)
    clearTimeout(timeoutID)
    timeoutID = setTimeout(()=>{
      if(chunkCount > 1) {
        logMessage(`Message Fragmented: message was broken into ${chunkCount} chunks`)
        logMessage(`. The original message size was ${bufferSize} bytes. The chunk sizes were ${chunksizes.toString()}`)
        console.log('chunk sizes were', chunksizes)
      } else {
        logMessage(`Message was in ${chunkCount} chunk.`)
      }
    },1000)
  })
  client3frag.connectToPeerID(server3frag.id, function(err, connection) {
    connection.on('error', function(){
      console.warn('error in fragmentation test')
    })
    connection.on('connect',function(){
      //console.log('client 3 connected to', server3frag)
      // prep data
      var a = new ArrayBuffer(bufferSize) // a good resolution for an image, rgba
      var aview = new Uint8Array(a)
      for(var j=0; j<aview.length; j++){
        aview[j] = Math.random()*100 + 1
      }
      connection.send(a)
    })
  })
}

setTimeout(runTests,1)
