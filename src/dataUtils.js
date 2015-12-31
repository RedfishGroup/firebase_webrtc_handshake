var CHUNK_SIZE = Math.pow(2,15) // size in bytes of the chunks breakArrayBufferIntoChunks will use

export function unChunk(chunks) {
  console.time('un-chunk')
  var totalSize = 0
  for(var ch of chunks) {
    totalSize += ch.length
  }
  var result = new Uint8Array(totalSize)
  var position = 0
  for(var i of chunks) {
    result.set(i, position)
    position += i.length
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

export function arrayBufferToChunks(buff) {
  console.time('chunk')
  var result = []
  for(var i=0; i<buff.byteLength; i+=CHUNK_SIZE) {
    var chunksize = Math.min(buff.byteLength-i, CHUNK_SIZE)
    var chunk = new Uint8Array( buff, i, chunksize)
    result.push(chunk)
  }
  console.timeEnd('chunk')
  return result
}

export function blobToArrayBuffer(blob, cb) {
  var fr = new FileReader()
  fr.onload = function(e){
    if(!e.error){
      cb(fr.result)
    }
  }
  fr.readAsArrayBuffer(blob)
}
