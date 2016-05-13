import {PeerBinary} from "./PeerBinary.js"
import "../bower_components/firebase/firebase.js"
import {settings} from "./settings.js"
import {Evented} from "./Evented.js"

export class P2PClient extends Evented{
  constructor(options={}) {
    super()
    Object.assign(this, settings)//_.extend(this,settings)
    Object.assign(this, options)//_.extend(this,options)
    this.fbref = new Firebase(this.firebaseURL).child('peers')
    this.connection = null
    this.channelRef = null
    this.debug = false
  }

  getPeerList(callback) {
    this.fbref.once('value',(ev)=>{
      var val = ev.val()
      this.peerList = val
      callback(null, val)
    })
  }

  connectToPeerID(id, callback=()=>{}) {
    this.getPeerList(()=>{
      var peer = this.peerList[id]
      if(!peer) {
        console.error('peer not defined. id:', id)
        callback("peer not defined")
      } else {
        this.serverRef = this.fbref.child(id)
        var p = new PeerBinary({ initiator: true, trickle: true , iceServers: this.ICE_SERVERS })
        this.connection = p
        this._registerEvents()
        p.on('signal', (data)=>{
          if(data.type == "offer") {
            this._createChannel(data)
          } else if(data.candidate){
            if(this.debug) console.log('client recieved candidate from webrtc', data)
            this.outRef.push(data)
          }else {
            console.warn('Client recieved unexpected signal through WebRTC:', data)
          }
        })
        callback(null, this.connection)
      }
    })
  }

  disconnect(callback) {
    callback = callback || function(){console.log('client disconnected from server', arguments)}
    if(this.serverRef) { this.serverRef.off() }
    if(this.outRef) { this.outRef.off() }
    if(this.inRef) {this.inRef.off()}
    if(this.connection) {
      this.connection.destroy(callback)
    } else{
      callback()
    }
    // QUESTION: should I also disconnect from the listeners to the events emitted by this class?
    //     it would be this.off()
  }

  _createChannel(offer) {
    //this.channelRef = this.serverRef.child('channels').push({offer:offer})
    this.channelRef = this.serverRef.child('channels').push({
      fromClient:[offer]
    })
    this.outRef = this.channelRef.child('fromClient')
    this.inRef = this.channelRef.child('fromServer')
    this.inRef.on('child_added',(ev)=>{
      if(this.debug) console.log('channel message, client', ev.val())
      var val = ev.val()
      if(val.type == 'answer') {
        setTimeout(()=>{this.connection.signal(val)}, 1)// a slight delay helps establish connection, I think.
      } else if(val.candidate) {
        if(this.debug) console.log('client recieved candidate from firebase')
        setTimeout(()=>{this.connection.signal(val)}, 1)
      } else {
        console.warn('Client recieved unexpected signal through Firebase', val)
      }
    })
  }


  _registerEvents() {
    // fire events
    this.connection.on('error', (err)=>{
      console.error('client: error', err)
      this.fire('error',{peer:this.connection, err:err})
    })
    this.connection.on('connect', ()=>{
      if(this.debug) console.log('client: client connected')
      this.fire('connect',{peer:this.connection})
    })
    this.connection.on('data', (data)=>{
      if(this.debug) console.log('server: server recieved some data: ',data)
      this.fire('data',{peer:this.connection, data:data})
    })
    this.connection.on('close', (data)=>{
      if(this.debug) console.log('connection closed', this.connection)
      this.fire('close',{peer:this.connection})
    })
    this.connection.on('dataBig', (data)=>{
      this.fire('dataBig',{peer:this.connection, data:data})
    })
  }
}
