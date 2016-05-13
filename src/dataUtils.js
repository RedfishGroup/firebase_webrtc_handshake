import * as binarize from "../bower_components/binarize.js/src/binarize.js"
//import "bower_components/JavaScript-Canvas-to-Blob/js/canvas-to-blob.min.js"
import {Evented} from "./Evented.js"
import {settings} from "./settings.js"

console.log('settings', settings)

var drawingCanvas // this is a canvas used by imageToBlob

//
// @param  {Function} callback []
//
export function generateWebRTCpayload(obj, callback) {
  //console.time('generateWebRTCpayload')
  binarize.pack(obj, function(bin){
    var header = {
      payloadID:Math.floor(Math.random()*100000000),
    }
    var chunks = arrayBufferToChunks(bin.buffer, header.payloadID)
    header.chunkCount = chunks.length
    //console.timeEnd('generateWebRTCpayload')
    callback({header:header, chunks:chunks})
  })
}

export function arrayBufferToChunks(buff, payloadID) {
  //console.time('chunks')
  var result = []
  var wholeshebang = new Uint8Array(buff)
  var count = 0
  payloadID = payloadID || Math.floor(Math.random()*100000000)
  for(var i=0; i<buff.byteLength; i+=settings.CHUNK_SIZE) {
    var chunksize = Math.min(buff.byteLength-i, settings.CHUNK_SIZE)
    var chunk = wholeshebang.slice(i, i+chunksize)
    var id = count//new Uint8Array(idSize);
    binarize.pack({payloadID:payloadID, id:id, chunk:chunk},function(chbin){
        result.push(chbin)
    })//event though this is taking a calback i am pretty sure it executes synchronously on array buffers
    count ++
  }
  //console.timeEnd('chunks')
  //console.log(`generated ${count} chunks`)
  return result
}


export function imageToBlob(img, cb) {
  if(!drawingCanvas) {
    drawingCanvas = document.createElement('canvas')
  }
  drawingCanvas.width = img.width
  drawingCanvas.height = img.height
  drawingCanvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height)
  drawingCanvas.toBlob(function(blob){
    cb(blob)
  })
}
