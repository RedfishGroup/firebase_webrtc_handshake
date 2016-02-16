import {PeerBinary} from "./PeerBinary.js"
import "bower_components/firebase/firebase.js"
import {settings} from "./settings.js"
import {Evented} from "./Evented.js"

export class P2PImageServer extends Evented{
  constructor(options={}) {
    super() //no idea what this does
    this.MAX_CONNECTIONS = 20
    this.debug = false
    this.id = "server"+Math.floor(Math.random()*100000)
    this.firebaseURL = settings.firebaseURL
    _.extendOwn(this, options)
    if(this.debug) console.log(this.id)
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

  sendToAll( data) {
    for(var conx of this.connections) {
      if(this.debug) console.log(conx)
      conx.peer.send(data)
    }
  }

  listenToChannels() {
    // when a new channel is added, listen to it.
    this.channelRef.on('child_added', (ev, prevKey)=>{
      if(this.connections.length > this.MAX_CONNECTIONS) {
        console.error('Too many connections. TODO:close/remove old stail connections')
        return
      }
      var val = ev.val()
      for(var i in val.fromClient) {
        var sig = val.fromClient[i]
        if(sig.type == 'offer') {
          var channel = {
            outRef: this.channelRef.child(ev.key()).child("fromServer"), //firebase
            inRef: this.channelRef.child(ev.key()).child("fromClient"),
            peer: this._makePeer() // simple-peer
          }
          this.connections.push(channel)
          // on message through webRTC (simple-peer)
          channel.peer.on('signal', (data)=>{
            if(data.type == "answer") {
              channel.outRef.push(data)
            } else if(data.candidate) {
              channel.outRef.push(data)
            }else {
              console.warn('unexpected message from WebRTC', data)
            }
          })
          // on message through firebase
          channel.inRef.on('child_added', (ev2)=>{
            var val2 = ev2.val()
            if(val2.candidate) {
              if(this.debug) console.log('server got candidate from firebase', val2)
              channel.peer.signal(val2)
            } else if(val2.type == 'offer') {
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
    if(this.debug) console.log('_makePeer called')
    var p = new PeerBinary({ initiator: false, trickle: true, iceServers: settings.ICE_SERVERS})
    // fire events
    p.on('error', (err)=>{
      console.error('server: error', err)
      this.fire('error',{peer:p, err:err})
    })
    p.on('connect', ()=>{
      if(this.debug) console.log('server: client connected')
      this.fire('connect',{peer:p})
    })
    p.on('data', (data)=>{
      if(this.debug) console.log('server: server recieved some data: ',data)
      this.fire('data',{peer:p, data:data})
    })
    p.on('close', ()=>{
      if(this.debug) console.log('server: connection closed', this.connection)
      this.fire('close',{peer:this.connection})
    })
    p.on('dataBig', (data)=>{
      if(this.debug) console.log('server: server recieved some data: ',data)
      this.fire('dataBig',{peer:p, data:data})
    })
    //TODO make it so server can register events that will get called on each individual connection
    return p
  }

  destroy() {
    this.channelRef.off()
    this.updateRef.off()
    this.userRef.off()
    for(var x of this.connections) {
      x.outRef.off()
      x.inRef.off()
      x.peer.destroy()
    }
    this.connections = []
    clearInterval(this.intervalID)
  }

}
