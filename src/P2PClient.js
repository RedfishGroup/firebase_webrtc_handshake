import { PeerBinary } from "./PeerBinary.js";
import { settings } from "./settings.js";
import { Evented } from "./Evented.js";
import { getDatabase } from "./defaultFirebase.js";

export class P2PClient extends Evented {
  constructor(options = {}) {
    super();
    this.iceServers = settings.ICE_SERVERS;
    Object.assign(this, settings); //_.extend(this,settings)
    Object.assign(this, options); //_.extend(this,options)
    this.database;
    if (options.database) {
      this.database = options.database;
    } else {
      this.database = getDatabase();
    }
    this.fbref = this.database.ref("peers"); // new firebase(this.firebaseURL).child("peers");
    this.connection = null;
    this.channelRef = null;
    this.stream = undefined;
    this.debug = false;
  }

  getPeerList(callback) {
    this.fbref.once("value", ev => {
      var val = ev.val();
      this.peerList = val;
      callback(null, val);
    });
  }

  connectToPeerID(id, callback = () => {}) {
    this.getPeerList(() => {
      var peer = this.peerList[id];
      if (!peer) {
        console.error("peer not defined. id:", id);
        callback("peer not defined");
      } else {
        this.serverRef = this.fbref.child(id);
        this.serverRef.once("value", ev1 => {
          var sval = ev1.val();
          let pOpts = {
            initiator: true,
            trickle: true,
            config: {
              iceServers: this.iceServers
            }
          };
          if (sval.isStream) {
            pOpts.stream = this.getMyStream();
          }
          var p = new PeerBinary(pOpts);
          this.connection = p;
          this._registerEvents();
          p.on("signal", data => {
            if (data.type == "offer") {
              this._createChannel(data);
            } else if (data.candidate) {
              if (this.debug)
                console.log("client recieved candidate from webrtc", data);
              this.outRef.push(data);
            } else {
              console.warn(
                "Client recieved unexpected signal through WebRTC:",
                data
              );
            }
          });
          callback(null, this.connection);
        });
      }
    });
  }

  getMyStream() {
    if (this.stream) return this.stream;
    // create fake stream if no stream specified, and the server is in streaming mode.
    //    because, at the moment, simple-peer must have a stream from the initiator.
    let fakeCanvas = document.createElement("canvas");
    fakeCanvas.width = fakeCanvas.height = 1;
    var fakeStream = fakeCanvas.captureStream();
    return fakeStream;
  }

  disconnect(callback) {
    callback =
      callback ||
      function() {
        console.log("client disconnected from server", arguments);
      };
    if (this.serverRef) {
      this.serverRef.off();
    }
    if (this.outRef) {
      this.outRef.off();
    }
    if (this.inRef) {
      this.inRef.off();
    }
    if (this.connection) {
      this.connection.destroy(callback);
    } else {
      callback();
    }
    // QUESTION: should I also disconnect from the listeners to the events emitted by this class?
    //     it would be this.off()
  }

  _createChannel(offer) {
    //this.channelRef = this.serverRef.child('channels').push({offer:offer})
    this.channelRef = this.serverRef.child("channels").push({
      fromClient: [offer]
    });
    this.outRef = this.channelRef.child("fromClient");
    this.inRef = this.channelRef.child("fromServer");
    this.inRef.on("child_added", ev => {
      if (this.debug) console.log("channel message, client", ev.val());
      var val = ev.val();
      if (val.type == "answer") {
        setTimeout(() => {
          this.connection.signal(val);
        }, 1); // a slight delay helps establish connection, I think.
      } else if (val.candidate) {
        if (this.debug) console.log("client recieved candidate from firebase");
        setTimeout(() => {
          this.connection.signal(val);
        }, 1);
      } else {
        console.warn("Client recieved unexpected signal through firebase", val);
      }
    });
  }

  _registerEvents() {
    // fire events
    this.connection.on("error", err => {
      console.error("client: error", err);
      this.fire("error", { peer: this.connection, err: err });
    });
    this.connection.on("connect", () => {
      if (this.debug) console.log("client: client connected");
      this.fire("connect", { peer: this.connection });
    });
    this.connection.on("data", data => {
      if (this.debug) console.log("server: server recieved some data: ", data);
      this.fire("data", { peer: this.connection, data: data });
    });
    this.connection.on("close", data => {
      if (this.debug) console.log("connection closed", this.connection);
      this.fire("close", { peer: this.connection });
    });
    this.connection.on("dataBig", data => {
      this.fire("dataBig", { peer: this.connection, data: data });
    });
    this.connection.on("stream", stream => {
      if (this.debug) console.log("Client: connected to stream", stream);
      this.fire("stream", { peer: this.connection, stream: stream });
    });
  }
}
