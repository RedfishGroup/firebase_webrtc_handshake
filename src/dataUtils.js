var CHUNK_SIZE = Math.pow(2,14) // size in bytes of the chunks breakArrayBufferIntoChunks will use
// this seems like a good guess

// prepare data for tranposrt across the webrtc socket.(is socket the right word?)
// It probably should support responseTypes of "arraybuffer", "blob", "json", and "text" kind of like xmlhttprequests
export var repsonseTypes = {
  arraybuffer:"arraybuffer",
  blob:"blob", //not currently supported by chrome, It should be converted into an array buffer first...for now(hopefully).
  json:"json",
  text:"text",
}

export class webRTCpayload {
  constructor(obj) {
    this.messages = []
    if(typeof obj == "object") {
      if(obj.toString() == "[object ArrayBuffer]") {
        this.messages = this._generateArrayBufferMessages(obj)
      } else if(obj.toString() == "[object Blob]") {

      } else {  //just a normal object
        this.messages = this._generateJSONMessages(obj)
      }
    } else if(typeof obj == "string") {
      this.messages = this._generateTextMessages(obj)
    } else {
      // just going to assume it is a typed array
      console.warn('type not recognised...')
    }
  }

  _generateArrayBufferMessages(obj) {
    var msg1 = {
      responseType : responseTypes.arraybuffer,
      length : obj.byteLength,
    }
    var chunks = breakArrayBufferIntoChunks(obj)
    var msgs = [msg1].concat(chunks)
    return msgs
  }

  _generateTextMessages(obj) {
    return [{
      responseType : responseTypes.text,
      data : obj
    }]
  }

  _generateJSONMessages(obj) {
    return [{
      responseType : responseTypes.json,
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
  }.bind(this)
  fr.readAsArrayBuffer(blob)
}
