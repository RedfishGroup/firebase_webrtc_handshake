import Peer from "bower_components/simple-peer/simplepeer.min.js"
import "bower_components/firebase/firebase.js"
import {settings} from "./settings.js"
import {Evented} from "./Evented.js"

export class P2PImageClient extends Evented{
  constructor(options={}) {
    super()
    this.fbref = new Firebase(settings.firebaseURL).child('peers')
    this.connection = null
    this.channelRef = null
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
        var p = new Peer({ initiator: true, trickle: false })
        this.connection = p
        p.on('signal', (data)=>{
          if(data.type == "offer") {
            this._createChannel(data)
          } else {
            console.warn('Client recieved unexpected signal through WebRTC:', data)
          }
        })
        callback(null, this.connection)
      }
    })
  }

  _createChannel(offer) {
    this.channelRef = this.serverRef.child('channels').push({offer:offer})
    this.channelRef.on('child_added',(ev)=>{
      var val = ev.val()
      if(val.type == 'answer') {
        this.connection.signal(val)
        this._registerEvents()
      } else if(val.type == 'offer') {
        //ignore
      } else {
        console.warn('Client recieved unexpected signal through Firebase', data)
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
      console.log('client: client connected')
      this.fire('connect',{peer:this.connection})
    })
    this.connection.on('data', (data)=>{
      //console.log('server: server recieved some data: ',data)
      this.fire('data',{peer:this.connection, data:data})
    })
    this.connection.on('close', (data)=>{
      console.log('connection closed', this.connection)
      this.fire('close',{peer:this.connection})
    })
  }
}
