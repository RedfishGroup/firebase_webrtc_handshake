import Peer from "bower_components/simple-peer/simplepeer.min.js"
import "bower_components/firebase/firebase.js"
import {settings} from "./settings.js"

export class P2PImageClient{
  constructor(options={}) {
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

  connectToPeerID(id, callback) {
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
      } else if(val.type == 'offer') {
        //ignore
      } else {
        console.warn('Client recieved unexpected signal through Firebase', data)
      }
    })
  }
}
