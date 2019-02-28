import { PeerBinary } from "./PeerBinary.js";
import { settings } from "./settings.js";
import { Evented } from "./Evented.js";
import { database } from "./defaultFirebase.js";
import * as firebase2 from "firebase/dist/index.esm";
var firebase = firebase2.default;

class Channel {
  constructor(fbref, peer) {
    this.outRef = fbref.child("fromServer"); //firebase
    this.inRef = fbref.child("fromClient");
    this.peer = peer; // simple-peer
  }

  destroy() {
    this.outRef.off();
    this.inRef.off();
    this.peer.destroy();
  }
}

export class P2PServer extends Evented {
  constructor(options = {}) {
    super(); //no idea what this does
    this.MAX_CONNECTIONS = 20;
    this.debug = false;
    this.id = "server" + Math.floor(Math.random() * 100000);
    this.stream = undefined;
    this.iceServers = settings.ICE_SERVERS;
    Object.assign(this, options); //_.extendOwn(this, options)
    if (this.debug) console.log(this.id);
    this.init();
  }

  init() {
    var fbref = database.ref("peers"); // new firebase(this.firebaseURL).child("peers");
    this.userRef = fbref.child(this.id);
    this.updateRef = this.userRef.child("lastUpdate");
    this.userRef.onDisconnect().remove();
    this.updateRef.set(firebase.database.ServerValue.TIMESTAMP);
    this.channelRef = this.userRef.child("channels");
    if (this.stream) {
      this.userRef.child("isStream").set(true);
    }
    this.channelRef.set([]);
    this.connections = [];
    this._intervalID = setInterval(() => {
      this.updateRef.set(firebase.database.ServerValue.TIMESTAMP);
    }, settings.POLLING_FREQUENCY);
    this.listenToChannels();
  }

  sendToAll(data) {
    for (var conx of this.connections) {
      if (this.debug) console.log(conx);
      conx.peer.send(data);
    }
  }

  listenToChannels() {
    // when a new channel is added, listen to it.
    this.channelRef.on("child_added", (ev, prevKey) => {
      if (this.connections.length > this.MAX_CONNECTIONS) {
        console.error(
          "Too many connections. TODO:close/remove old stail connections"
        );
        return;
      }
      var val = ev.val();
      for (var i in val.fromClient) {
        var sig = val.fromClient[i];
        if (sig.type == "offer") {
          var channel = new Channel(
            this.channelRef.child(ev.key),
            this._makePeer()
          );
          this.connections.push(channel);
          // on message through webRTC (simple-peer)
          channel.peer.on("signal", data => {
            if (data.type == "answer") {
              channel.outRef.push(data);
            } else if (data.candidate) {
              channel.outRef.push(data);
            } else {
              console.warn("unexpected message from WebRTC", data);
            }
          });
          // on message through firebase
          channel.inRef.on("child_added", ev2 => {
            var val2 = ev2.val();
            if (val2.candidate) {
              if (this.debug)
                console.log("server got candidate from firebase", val2);
              channel.peer.signal(val2);
            } else if (val2.type == "offer") {
              channel.peer.signal(val2);
            } else if (val2.type == "answer") {
              //ignore this. It was probably from me.
            } else {
              console.warn("unexpected message from firebase", val2);
            }
          });
        }
      }
    });
  }

  _makePeer() {
    if (this.debug) console.log("_makePeer called");
    var myoptions = {
      initiator: false,
      trickle: true,
      config: {
        iceServers: this.iceServers
      }
    };
    if (this.stream) myoptions.stream = this.stream;
    var p = new PeerBinary(myoptions);
    // fire events
    p.on("error", err => {
      console.error("server: error", err);
      this.fire("error", { peer: p, err: err });
    });
    p.on("connect", () => {
      if (this.debug) console.log("server: client connected");
      this.fire("connect", { peer: p });
    });
    p.on("data", data => {
      if (this.debug) console.log("server: server recieved some data: ", data);
      this.fire("data", { peer: p, data: data });
    });
    p.on("close", () => {
      if (this.debug) console.log("server: connection closed", p);
      this._removeConnection(p);
      this.fire("close", { peer: p });
    });
    p.on("dataBig", data => {
      this.fire("dataBig", { peer: p, data: data });
    });
    p.on("stream", stream => {
      if (this.debug) console.log("Server: connected to stream", stream);
      this.fire("stream", { peer: p, stream: stream });
    });
    //TODO make it so server can register events that will get called on each individual connection
    return p;
  }

  destroy() {
    this.channelRef.off();
    this.updateRef.off();
    this.userRef.off();
    for (var x of this.connections) {
      x.destroy();
    }
    this.connections = [];
    clearInterval(this.intervalID);
  }

  _removeConnection(peer) {
    var index = -1;
    for (var i = 0; i < this.connections.length; i++) {
      var conn = this.connections[i];
      if (conn.peer == peer) {
        console.log("found my connection", i, conn);
        index = i;
      }
    }
    if (index >= 0) {
      var conn = this.connections[index];
      conn.destroy();
      this.connections.splice(index, 1);
      console.log(this.connections);
    }
  }
}
