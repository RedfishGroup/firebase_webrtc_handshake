import Peer from "../bower_components/simple-peer/simplepeer.min.js"
import "../bower_components/firebase/firebase.js"
import {settings} from "../src/settings.js"
import {Evented} from "../src/Evented.js"

export class P2PImageServer extends Evented{
  constructor(options={}) {
    super() //no idea what this does
    this.MAX_CONNECTIONS = 20
    this.id = "server"+Math.floor(Math.random()*100000)
    this.firebaseURL = settings.firebaseURL
    _.extendOwn(this, options)
    console.log(this.id)
    this.init()
  }

  init(){
    var fbref = new Firebase(this.firebaseURL).child('peers')
    this.userRef = fbref.child(this.id)
    this.updateRef = this.userRef.child('lastUpdate')
    this.userRef.onDisconnect().remove()
    this.updateRef.set(new Date().getTime())
    this.channelRef = this.userRef.child('channels')
    this.channelRef.set([])
    this.connections = []
    this._intervalID = setInterval(()=>{
      this.updateRef.set(new Date().getTime())
    }, 4000)
    this.listenToChannels()
  }

  listenToChannels() {
    // when a new channel is added, listen to it.
    this.channelRef.on('child_added', (ev, prevKey)=>{
      if(this.connections.length > this.MAX_CONNECTIONS) {
        console.error('Too many connections. TODO:close/remove old stail connections')
        return
      }
      var val = ev.val()
      for(var i in val) {
        var sig = val[i]
        if(sig.type == 'offer') {
          var channel = {
            ref: this.channelRef.child(ev.key()), //firebase
            peer: this._makePeer() // simple-peer
          }
          this.connections.push(channel)
          // on message through webRTC (simple-peer)
          channel.peer.on('signal', (data)=>{
            if(data.type == "answer") {
              channel.ref.push(data)
            } else {
              console.warn('unexpected message from WebRTC', data)
            }
          })
          // on message through firebase
          channel.ref.on('child_added', (ev2)=>{
            var val2 = ev2.val()
            if(val2.type == 'offer') {
              channel.peer.signal(val2)
            } else if(val2.type == 'answer') {
              //ignore this. It was probably from me.
            } else {
              console.warn('unexpected message from Firebase', val2)
            }
          })
        }
      }
    })
  }

  _makePeer() {
    var p = new Peer({ initiator: false, trickle: false })
    // fire events
    p.on('error', (err)=>{
      console.error('server: error', err)
      this.fire('error',{peer:p, err:err})
    })
    p.on('connect', ()=>{
      console.log('server: client connected')
      this.fire('connect',{peer:p})
    })
    p.on('data', (data)=>{
      //console.log('server: server recieved some data: ',data)
      this.fire('data',{peer:p, data:data})
    })
    //TODO make it so server can register events that will get called on each individual connection
    return p
  }

  destroy() {
    this.channelRef.off()
    this.updateRef.off()
    this.userRef.off()
    for(var x of this.connections) {
      x.ref.off()
      x.peer.destroy()
    }
    this.connections = []
    clearInterval(this.intervalID)
  }

}
