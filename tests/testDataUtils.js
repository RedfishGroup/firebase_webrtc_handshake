import * as dtls from "src/dataUtils.js"

function test1chunking() {
  var pass = true
  var zeroApeared = false
  // fill array with random values between 1 and something
  console.log(dtls)
  var a = new ArrayBuffer(60000)
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



function runTests() {
  test1chunking()
}

runTests()
