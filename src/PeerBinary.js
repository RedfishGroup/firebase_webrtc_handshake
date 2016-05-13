import Peer from "../bower_components/simple-peer/simplepeer.min.js"
import {generateWebRTCpayload} from "./dataUtils.js"
import * as binarize from "../bower_components/binarize.js/src/binarize.js"

export class PeerBinary extends Peer {
  constructor(options){
    //console.log('PeerBinary contructor called')
    super(options)
    this._registerDataMessage()
    this.unchunker = new UnChunker()//
    this.unchunker.onData = (val)=>{
      this.emit('dataBig', val)
    }
  }

  //want to overide these 2 functions I think.
  _registerDataMessage(event) {
    this.on('data', (data)=>{
      //when its done with a complete chunk, call this.emit('dataBig', completed)
      this.unchunker.registerChunk(data)
    })
  }

  sendBig(chunk) {
    generateWebRTCpayload(chunk, (stuff)=>{
      this.send(stuff.header)
      for(var i in stuff.chunks){
        var ch = stuff.chunks[i]
        this.send(ch.buffer)
      }
    })
  }
}

//
// Takes a bunch of possibly out of order shunks and assembles them into one
//
export class UnChunker {

  constructor(){
    this.payloads = {}
    this.payloadCount = 0
    this.onData = function(val){
      console.log('default, data is ready:', val)
    }
  }

  registerChunk(msg){
    if( this._isChunk(msg)) {
      //the is a chunk hopefully
      binarize.unpack(msg.buffer,(val)=>{
        this._appendToPayload(val)
        //this.emit('dataBig', val)
        if(this._isPayloadReady(val.payloadID)){
          this._assembleChunks(val.payloadID, (result)=>{
            this.onData(result)
            return result
          })
        }
      })
    } else if (this._isHeader(msg)) {
      this._newPayload(msg.payloadID, msg.chunkCount)
    } else {
      console.warn('not my type', msg)
    }
    return null
  }

  _newPayload(id, count) {
    this.payloads[id] = {
      count:count,
      chunks:[],
      lastUpdate:new Date()
    }
    this.payloadCount ++
  }

  _appendToPayload(chunk ) {
    var pl = this.payloads[chunk.payloadID]
    pl.lastUpdate = new Date()
    pl.chunks.push(chunk)
  }

  _assembleChunks(payloadID, cb) {
    var pl = this.payloads[payloadID]
    pl.chunks.sort(function(a,b){
      return Number(a.id) - Number(b.id)
    })
    var totalSize = 0
    for(var i=0; i<pl.chunks.length; i++) {
      totalSize += pl.chunks[i].chunk.length
    }
    var result = new Uint8Array(totalSize)
    var position = 0
    for(var i=0; i<pl.chunks.length; i++) {
      var ch = pl.chunks[i]
      result.set(ch.chunk, position)
      position += ch.chunk.length
    }
    binarize.unpack(result.buffer, cb)
    this._removePayload(payloadID)
  }

  _removePayload(id) {
    delete this.payloads[id]
    this.payloadCount --
  }

  _isHeader(data) {
    if(typeof data == "object" && !(data instanceof Uint8Array)) {
      if(data.chunkCount && data.chunkCount > 0) {
        return true
      }
    }
    return false
  }

  _isChunk(msg){
    if(this.payloadCount <= 0){return false}
    return msg instanceof Uint8Array || msg instanceof DataView
  }

  _isPayloadReady(id) {
    var pl = this.payloads[id]
    if(pl.chunks.length == pl.count){
      return true
    }
    return false
  }
}
