import * as dtls from "src/dataUtils.js"
import {P2PImageServer} from "../src/P2PImageServer.js"
import {P2PImageClient} from "../src/P2PImageClient.js"

function test1chunking() {
  var pass = true
  var zeroApeared = false
  // fill array with random values between 1 and something
  console.log(dtls)
  var a = new ArrayBuffer(4*2056*2056) // a good resolution for an image, rgba
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
  testBlobSupport()
}

runTests()
