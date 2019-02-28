import * as Peer2 from "simple-peer/simplepeer.min.js";

import { generateWebRTCpayload } from "./dataUtils.js";
import * as binarize from "binarize.js/src/binarize.js";
import "../lib/webrtc_adapter.js";

var Peer = Peer2.default;
window.simpPeer = Peer;
console.log("peer2", Peer2);

export class PeerBinary extends Peer {
  constructor(options) {
    //console.log('PeerBinary contructor called')
    super(options);
    this._registerDataMessage();
    this.unchunker = new UnChunker(); //
    this.unchunker.onData = val => {
      this.emit("dataBig", val);
    };
  }

  //want to overide these 2 functions I think.
  _registerDataMessage(event) {
    this.on("data", data => {
      //when its done with a complete chunk, call this.emit('dataBig', completed)
      this.unchunker.registerChunk(data);
    });
  }

  sendBig(chunk) {
    generateWebRTCpayload(chunk, stuff => {
      this.send(JSON.stringify(stuff.header));
      for (var i in stuff.chunks) {
        var ch = stuff.chunks[i];
        this.send(ch.buffer);
      }
    });
  }
}

//
// Takes a bunch of possibly out of order shunks and assembles them into one
//
export class UnChunker {
  constructor() {
    this.payloads = {};
    this.payloadCount = 0;
    this.onData = function(val) {
      console.log("default, data is ready:", val);
    };
  }

  registerChunk(msg) {
    var header = this.parseHeader(msg);
    if (header) {
      this._newPayload(header.payloadID, header.chunkCount);
    } else if (this._isChunk(msg)) {
      //the is a chunk hopefully
      binarize.unpack(msg.buffer, val => {
        this._appendToPayload(val);
        //this.emit('dataBig', val)
        if (this._isPayloadReady(val.payloadID)) {
          this._assembleChunks(val.payloadID, result => {
            this.onData(result);
            return result;
          });
        }
      });
    } else {
      console.warn("not my type", msg);
      //console.warn(this._ab2str(msg))
    }
    return null;
  }

  _ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

  _newPayload(id, count) {
    this.payloads[id] = {
      count: count,
      chunks: [],
      lastUpdate: new Date()
    };
    this.payloadCount++;
  }

  _appendToPayload(chunk) {
    var pl = this.payloads[chunk.payloadID];
    pl.lastUpdate = new Date();
    pl.chunks.push(chunk);
  }

  _assembleChunks(payloadID, cb) {
    var pl = this.payloads[payloadID];
    pl.chunks.sort(function(a, b) {
      return Number(a.id) - Number(b.id);
    });
    var totalSize = 0;
    for (var i = 0; i < pl.chunks.length; i++) {
      totalSize += pl.chunks[i].chunk.length;
    }
    var result = new Uint8Array(totalSize);
    var position = 0;
    for (var i = 0; i < pl.chunks.length; i++) {
      var ch = pl.chunks[i];
      result.set(ch.chunk, position);
      position += ch.chunk.length;
    }
    binarize.unpack(result.buffer, cb);
    this._removePayload(payloadID);
  }

  _removePayload(id) {
    delete this.payloads[id];
    this.payloadCount--;
  }

  parseHeader(data) {
    if (typeof data == "object" && !(data instanceof Uint8Array)) {
      if (data.chunkCount && data.chunkCount > 0) {
        return data;
      }
    } else if (data.length && data.length < 60) {
      // might have been packed or something.
      var str = this._ab2str(data);
      if (str) {
        try {
          var json = JSON.parse(str);
          if (json && json.payloadID) {
            return json;
          }
        } catch (er) {
          // probably not a header. Not a big deal
        }
      }
    }
    return undefined;
  }

  _isChunk(msg) {
    if (this.payloadCount <= 0) {
      return false;
    }
    return msg instanceof Uint8Array || msg instanceof DataView;
  }

  _isPayloadReady(id) {
    var pl = this.payloads[id];
    if (pl.chunks.length == pl.count) {
      return true;
    }
    return false;
  }
}
