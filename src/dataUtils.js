import { Evented } from "./Evented.js";
import { settings } from "./settings.js";
import * as msgpacklite from "msgpack-lite/dist/msgpack.min.js";

var msgPack = msgpacklite.default;

var drawingCanvas; // this is a canvas used by imageToBlob

const MAX_RECURSIVE_DEPTH = 10;
//
// @param  {Function} callback []
//
export async function generateWebRTCpayload(obj) {
  let deBlobbed = await recursivelyEncodeBlobs(obj);
  let result = _generateWebRTCpayload(deBlobbed);
  return result;
}
export function deBlob(obj) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.addEventListener("loadend", function() {
      const view = new Int8Array(reader.result);
      let descript = { isBlob: true, type: obj.type };
      if (obj.lastModified) descript.lastModified = obj.lastModified;
      if (obj.name) descript.name = obj.name;
      if (obj.size) descript.size = obj.size;
      if (obj.exif) descript.exif = obj.exif;
      descript.view = view; // _generateWebRTCpayload(view, descript);
      resolve(descript);
    });
    reader.readAsArrayBuffer(obj);
  });
}

export async function recursivelyEncodeBlobs(obj, depth = 0) {
  if (depth > MAX_RECURSIVE_DEPTH) {
    throw ("max depth reached", depth);
  }
  if (obj.constructor == File || obj.constructor == Blob) {
    return await deBlob(obj);
  } else if (obj.constructor == Object) {
    let res = {};
    for (var i in obj) {
      res[i] = await recursivelyEncodeBlobs(obj[i], depth + 1);
    }
    return res;
  }
  return obj;
}

export async function recursivelyDecodeBlobs(obj, depth = 0) {
  if (depth > MAX_RECURSIVE_DEPTH) {
    throw ("max depth reached", depth);
  }
  if (obj.constructor == Object && obj.type && obj.isBlob) {
    let descript = {};
    for (var i in obj) {
      if (i !== "view" && i != "chunks") {
        descript[i] = obj[i];
      }
    }
    let val1 = new Blob([obj.view], descript);
    return val1;
  } else if (obj.constructor == Object) {
    let res = {};
    for (var i in obj) {
      res[i] = await recursivelyDecodeBlobs(obj[i], depth + 1);
    }
    return res;
  }
  return obj;
}

export async function _generateWebRTCpayload(obj, headerOpt = {}) {
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
  return { header: msgPack.encode(header), chunks: chunks };
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
