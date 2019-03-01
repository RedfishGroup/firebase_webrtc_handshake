import { Evented } from "./Evented.js";
import { settings } from "./settings.js";
import * as msgpacklite from "msgpack-lite/dist/msgpack.min.js";

var msgPack = msgpacklite.default;

var drawingCanvas; // this is a canvas used by imageToBlob

//
// @param  {Function} callback []
//
export function generateWebRTCpayload(obj, callback) {
  if (obj.constructor == Blob) {
    generateWebRTCpayloadForBlob(obj, callback);
  } else {
    _generateWebRTCpayload(obj, callback);
  }
}
export function generateWebRTCpayloadForBlob(obj, callback) {
  var reader = new FileReader();
  reader.addEventListener("loadend", function() {
    const view = new Int8Array(reader.result);
    _generateWebRTCpayload(view, callback, { isBlob: true, type: obj.type });
  });
  reader.readAsArrayBuffer(obj);
}
export function _generateWebRTCpayload(obj, callback, headerOpt = {}) {
  //console.time('generateWebRTCpayload')
  let bin = msgPack.encode(obj);
  var header = Object.assign(
    {
      iAmAHeader: true,
      payloadID: Math.floor(Math.random() * 100000000)
    },
    headerOpt
  );
  var chunks = arrayBufferToChunks(bin, header.payloadID);
  header.chunkCount = chunks.length;
  //console.timeEnd('generateWebRTCpayload')
  callback({ header: msgPack.encode(header), chunks: chunks });
}

export function arrayBufferToChunks(buff, payloadID) {
  //console.time('chunks')
  var result = [];
  var wholeshebang = new Uint8Array(buff);
  var count = 0;
  payloadID = payloadID || Math.floor(Math.random() * 100000000);
  for (var i = 0; i < buff.byteLength; i += settings.CHUNK_SIZE) {
    var chunksize = Math.min(buff.byteLength - i, settings.CHUNK_SIZE);
    var chunk = wholeshebang.slice(i, i + chunksize);
    var id = count; //new Uint8Array(idSize);
    let chbin = msgPack.encode({ payloadID: payloadID, id: id, chunk: chunk });
    result.push(chbin);
    count++;
  }
  //console.timeEnd('chunks')
  //console.log(`generated ${count} chunks`)
  return result;
}

export function imageToBlob(img, cb) {
  if (!drawingCanvas) {
    drawingCanvas = document.createElement("canvas");
  }
  drawingCanvas.width = img.width;
  drawingCanvas.height = img.height;
  drawingCanvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
  drawingCanvas.toBlob(function(blob) {
    cb(blob);
  });
}
