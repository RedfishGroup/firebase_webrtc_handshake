import * as SparkMD5 from "bower_components/SparkMD5/spark-md5.js"
import rusha from "bower_components/Rusha/rusha.min.js"
import * as binarize from "bower_components/binarize.js/src/binarize.js"

console.log(SparkMD5)
console.log('binarize',binarize)
window.spark = SparkMD5
window.binarize = binarize
window.rusha = rusha

var CHUNK_SIZE = Math.pow(2,15) // size in bytes of the chunks breakArrayBufferIntoChunks will use
window.rushwork = new Worker("../bower_components/Rusha/rusha.min.js")

// this seems like a good guess

// prepare data for tranposrt across the webrtc socket.(is socket the right word?)
// It probably should support dataTypes of "arraybuffer", "blob", "json", and "text" kind of like xmlhttprequests
export var dataType = {
  arraybuffer: new ArrayBuffer().toString(),
  blob: new Blob().toString(), //not currently supported by chrome, It should be converted into an array buffer first...for now(hopefully).
  object: typeof {a:1},
  string: typeof " ",
}

export class webRTCpayload {
  constructor(obj) {
    this.messages = []
    if(typeof obj == dataType.object) {
      if(obj.toString() == dataType.arraybuffer) {
        this.messages = this._generateArrayBufferMessages(obj)
      } else if(obj.toString() == dataType.blob) {
        throw('sorry not implemented yet')
      } else {  //just a normal object
        this.messages = this._generateJSONMessages(obj)
      }
    } else if(typeof obj == dataType.string) {
      this.messages = this._generateTextMessages(obj)
    } else {
      // just going to assume it is a typed array
      console.warn('type not recognised...')
    }
  }

  _generateArrayBufferMessages(obj) {
    var msg1 = {
      dataType : dataTypes.arraybuffer,
      length : obj.byteLength,
    }
    var chunks = breakArrayBufferIntoChunks(obj)
    var msgs = [msg1].concat(chunks)
    return msgs
  }

  _generateTextMessages(obj) {
    return [{
      dataType : dataTypes.string,
      data : obj
    }]
  }

  _generateJSONMessages(obj) {
    return [{
      dataType : dataTypes.json,
      data : obj
    }]
  }
}

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
  var idSize=8
  var rush = new Rusha()
  console.time('chunks')
  var result = []
  var wholeshebang = new Uint8Array(buff)
  for(var i=0; i<buff.byteLength; i+=CHUNK_SIZE) {
    var chunksize = Math.min(buff.byteLength-i, CHUNK_SIZE)
    //var chunk = new Uint8Array( buff, i, chunksize)
    var chunk = wholeshebang.slice(i, chunksize)
    var id = new Uint8Array(idSize);
    for(var j=0; j<idSize; j++){ id[j] = Math.floor(Math.random()*255)}
    rushwork.onmessage = function(){console.log("hello")}
    rushwork.postMessage({id:id, data:chunk})
    //var slice = chunk.slice(0,256)//for speed I will just look at the first n bytes
    //SparkMD5.ArrayBuffer.hash(chunk)
    //rush.digestFromArrayBuffer(chunk)
    //console.log(chunk.byteLength)
    //var b = binarize.pack({id:id, chunk:chunk},function(){})
    result.push(chunk)
  }
  console.timeEnd('chunks')
  return result
}

export function blobToArrayBuffer(blob, cb) {
  var fr = new FileReader()
  fr.onload = function(e){
    if(!e.error){
      cb(fr.result)
    }
  }.bind(this)
  fr.readAsArrayBuffer(blob)
}
