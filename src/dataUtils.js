import * as binarize from "bower_components/binarize.js/src/binarize.js"
console.log('binarize',binarize)

var CHUNK_SIZE = Math.pow(2,14) // size in bytes of the chunks breakArrayBufferIntoChunks will use

//
// @param  {Function} callback []
//
export function generateWebRTCpayload(obj, callback) {
  console.time('generateWebRTCpayload')
  binarize(obj, function(bin){
    var header = {
      chunked:false,
    }
    var chunks = arrayBufferToChunks(bin)
    header.chunked = true
    header.chunkIDs = []
    for(var i in chunks) {
      header.chunkIDs.push(i)
    }
    console.timeEnd('generateWebRTCpayload')
    callback({header:header, chunks:chunks})
  })
}

export function arrayBufferToChunks(buff) {
  console.time('chunks')
  var result = {}
  var wholeshebang = new Uint8Array(buff)
  var count = 0
  for(var i=0; i<buff.byteLength; i+=CHUNK_SIZE) {
    var chunksize = Math.min(buff.byteLength-i, CHUNK_SIZE)
    var chunk = wholeshebang.slice(i, i+chunksize)
    var id = "id_"+Math.floor(Math.random()*100000000)//new Uint8Array(idSize);
    binarize.pack({id:id, chunk:chunk},function(chbin){
        result[id] = chbin
    })//event though this is taking a calback i am pretty sure it executes synchronously on array buffers
    count ++
  }
  console.timeEnd('chunks')
  console.log(`generated ${count} chunks`)
  return result
}

export function unChunk(chunks) {
  console.time('un-chunk')
  var totalSize = 0
  var objs = []
  for(var i in chunks) {
    var ch = chunks[i]
    binarize.unpack(ch.buffer, function(ch2) {
      objs.push(ch2)
      totalSize += ch2.chunk.length
    })
  }
  var result = new Uint8Array(totalSize)
  var position = 0
  for(var i=0; i<objs.length; i++) {
    var ch = objs[i]
    result.set(ch.chunk, position)
    position += ch.chunk.length
  }
  console.timeEnd('un-chunk')
  return result
}

export function arrayToBlobToImage(data, type, cb){
  console.time('arrayToBlobToImage')
  var bob = new Blob([data], {type:type})
  var url = URL.createObjectURL(bob)
  var img = new Image()
  img.onload = function(){
    URL.revokeObjectURL(this.src)
    if(cb){cb(img)}
  }
  img.src = url
  console.timeEnd('arrayToBlobToImage')
  document.body.appendChild(img)
  console.log('blob',bob)
}
