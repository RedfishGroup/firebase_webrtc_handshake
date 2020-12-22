'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Channel {
    constructor(fbref, peer) {
        this.outRef = fbref.child('fromServer'); //firebase
        this.inRef = fbref.child('fromClient');
        this.peer = peer; // simple-peer
    }

    destroy() {
        this.outRef.off();
        this.inRef.off();
        this.peer.destroy();
    }
}

var settings = {
    // Get a reference to the database service

    // Was having a bug where the WIFI router would crash if the chunk size was bigger than 2^10
    CHUNK_SIZE: Math.pow(2, 14), // size in bytes of the chunks. 2^14 is just under the limit in chrome.
    ICE_SERVERS: [
        {
            url: 'stun:23.21.150.121',
            urls: 'stun:23.21.150.121',
        },
        {
            url: 'turn:global.turn.twilio.com:3478?transport=udp',
            username:
                '508d1e639868dc17f5da97a75b1d3b43bf2fc6d11e4e863678501db568b5665c',
            credential: 'W5GTdhQQ6DqOD7k6bS8+xZVNQXm+fgLXSEQpN8bTe70=',
            urls: 'turn:global.turn.twilio.com:3478?transport=udp',
        },
    ],
    POLLING_FREQUENCY: 15000,
    debug: false,
};

class Evented {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (typeof callback !== "function") return;
    if (! this.events.hasOwnProperty(eventName)) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  off(eventName, callback) {
    if (this.events.hasOwnProperty(eventName)) {
      if (typeof callback === "function") {
        //_.without(this.events[eventName], callback);
        this.events = this.events.filter( function(x){
            if ( x != this.events[eventName]) { return x }
        });
      } else {
        delete this.events[eventName];
      }
    }
  }

  fire(eventName, argument) {
    //_.each(this.events[eventName], (cb) => setTimeout(() => cb(argument)));
    if (this.events[eventName]) {
      for (var cb of this.events[eventName]) {
        setTimeout(() => cb(argument));
      }
    }
  }

  fireAll(argument) {
    for (var k in this.events) {
      this.fire(k, argument);
    }
  }
}

var defaultFBConfig = {
  apiKey: "AIzaSyBEbLlzJmmOC7CVfbeZs_HQBWia_xSb4sA",
  authDomain: "https://torrid-torch-716.firebaseio.com/",
  databaseURL: "https://torrid-torch-716.firebaseio.com/",
  projectId: "torrid-torch-716"
};

var firebase;
function initFirebase(newFirebase, fbConfig = null) {
    firebase = newFirebase;
    if (fbConfig) defaultFBConfig = fbConfig;
    return { firebase, database: getDatabase() }
}


var database;

function getDatabase() {
    if (database) return database
    if (!firebase)
        throw new Error('init must be called before accessing database')

    firebase.initializeApp(defaultFBConfig);
    database = firebase.database().ref('/').child('peers');
    return database
}

function getFirebase() {
    return firebase
}

/**
 *
 * @param {*} database
 * @param {*} callback
 */
function getPeerList(database, callback) {
    database
        .once('value')
        .then((ev) => {
                var val = ev.val();
                callback(null, val);
            })
        .catch((err) => {
            callback(err);        
        });
}

function P2PServerFactory(options) {
    const { PeerBinary, debug } = options;

    return class P2PServer extends Evented {
        constructor(options = {}) {
            super(); //no idea what this does
            console.assert(
                options.iceServers,
                'Server: no ice servers yet. Using defaults'
            );
            this.MAX_CONNECTIONS = 50;
            this.isListening = false;

            this.id = 'server_' + Math.floor(Math.random() * 100000);
            this.myID = this.id;
            this.peerID = this.id;

            this.stream = undefined;
            this.iceServers =
                options.iceServers ||
                options.ICE_SERVERS ||
                settings.ICE_SERVERS;
            this.database;
            this.POLLING_FREQUENCY =
                options.POLLING_FREQUENCY || settings.POLLING_FREQUENCY;
            Object.assign(this, options);
            if (options.database) {
                this.database = options.database;
            } else {
                this.database = getDatabase();
            }

            this.debug = !!debug || !!options.debug;

            if (this.debug) console.log(this.id);
            if (!options.dontCallInitYet) {
                this.init();
            }
        }

        init() {
            var fbref = this.database;
            this.userRef = fbref.child(this.id);
            this.updateRef = this.userRef.child('lastUpdate');
            this.userRef.onDisconnect().remove();
            this.updateRef.set(getFirebase().database.ServerValue.TIMESTAMP);
            this.channelRef = this.userRef.child('channels');
            if (this.stream) {
                this.userRef.child('isStream').set(true);
            }
            this.channelRef.set([]);
            this.connections = [];
            this._intervalID = setInterval(() => {
                this.fire('updateTimeStamp', undefined);
                this._updateOnFireBase();
            }, this.POLLING_FREQUENCY);
            this.listenToChannels();
            this.isListening = true;
            this.fire('init', undefined);
        }

        _updateOnFireBase() {
            // one may want to overwrite this
            this.updateRef.set(getFirebase().database.ServerValue.TIMESTAMP);
        }

        sendToAll(data) {
            for (var conx of this.connections) {
                if (conx && conx.peer) {
                    try {
                        conx.peer.send.bind(conx.peer)(data);
                    } catch (err) {
                        console.error(
                            err,

                            'Got an error, interrupted connection? '
                        );
                    }
                }
            }
        }

        sendToAllBig(data) {
            for (var conx of this.connections) {
                if (conx && conx.peer) {
                    try {
                        conx.peer.sendBig.bind(conx.peer)(data);
                    } catch (err) {
                        console.error(
                            err,

                            'Got an error, interrupted connection? '
                        );
                    }
                }
            }
        }

        listenToChannels() {
            // disabling no-loop-func because these loops are correct usage
            // https://eslint.org/docs/rules/no-loop-func
            // when a new channel is added, listen to it.
            this.channelRef.on('child_added', (ev) => {
                if (this.connections.length > this.MAX_CONNECTIONS) {
                    console.error(
                        'Too many connections. TODO:close/remove old stale connections'
                    );
                    return
                }
                var val = ev.val();
                if (this.debug) {
                    console.log(val, 'new child');
                }
                for (var i in val.fromClient) {
                    var sig = val.fromClient[i];
                    if (this.debug) console.log({ sig });
                    if (sig.type === 'offer') {
                        var mykey = ev.key;
                        var { peerID, myID } = sig;
                        var channel = new Channel(
                            this.channelRef.child(mykey),
                            this._makePeer(myID)
                        );
                        this.connections = [...this.connections, channel];
                        this.fire('addConnection', channel);

                        // on message through webRTC (simple-peer)
                        //eslint-disable-next-line no-loop-func
                        var answerSentYet = false;
                        channel.peer.on('signal', (data) => {
                            if (data.type === 'answer') {
                                if (answerSentYet) {
                                    console.warn(
                                        'Why am i trying to send multiple answers'
                                    );
                                }
                                channel.outRef.push(data);
                                answerSentYet = true;
                            } else if (data.candidate) {
                                channel.outRef.push(data);
                            } else {
                                console.warn(
                                    data,

                                    'unexpected message from WebRTC'
                                );
                            }
                        });

                        // on message through firebase
                        //eslint-disable-next-line no-loop-func
                        channel.inRef.on('child_added', (ev2) => {
                            var val2 = ev2.val();
                            if (this.debug) {
                                console.log(val2, 'child_added -- firebase');
                            }
                            if (val2.candidate) {
                                if (this.debug) {
                                    console.log(
                                        val2,
                                        'server got candidate from firebase'
                                    );
                                }
                                channel.peer.signal(val2);
                            } else if (val2.type === 'offer') {
                                channel.peer.signal(val2);
                            } else if (val2.type === 'answer') ; else {
                                console.warn(
                                    val2,
                                    'unexpected message from Firebase'
                                );
                            }
                        });
                    }
                }
            });
        }

        _makePeer(peerID) {
            if (this.debug)
                console.log('_makePeer called with peerID: ', peerID);
            this.fire('makePeer', undefined);
            var myoptions = {
                initiator: false,
                trickle: true,
                config: {
                    iceServers: this.iceServers,
                },
                peerID,
            };
            if (this.stream) myoptions.stream = this.stream;
            var p = new PeerBinary(myoptions);

            // fire events
            p.on('error', (err) => {
                console.error('server: error', err);
                this.fire('error', { peer: p, err: err });
            });
            p.on('connect', () => {
                if (this.debug) console.log('server: client connected');
                this.fire('connect', { peer: p });
            });
            p.on('data', (data) => {
                if (this.debug)
                    console.log('server: server recieved some data: ', data);
                this.fire('data', { peer: p, data: data });
            });
            p.on('close', () => {
                if (this.debug) console.log('server: connection closed', p);
                this._removeConnection(p);
                this.fire('close', { peer: p });
            });
            p.on('dataBig', (data) => {
                this.fire('dataBig', { peer: p, data: data });
            });
            p.on('stream', (stream) => {
                if (this.debug)
                    console.log('Server: connected to stream', stream);
                this.fire('stream', { peer: p, stream: stream });
            });
            p.on('signal', (data) => {
                if (this.debug) console.log('Server: received signal', data);
                this.fire('signal', data);
            });

            //TODO make it so server can register events that will get called on each individual connection
            return p
        }

        getPeerList(callback) {
            return getPeerList(this.database, callback)
        }

        destroy() {
            this.channelRef.remove();
            this.updateRef.remove();
            this.channelRef.off();
            this.updateRef.off();
            this.userRef.off();
            this.isListening = false;
            for (var x of this.connections) {
                x.destroy();
            }
            this.fire('destroyed', {});
            this.connections = [];
            clearInterval(this._intervalID);
        }

        _removeConnection(peer) {
            var index = -1;
            for (var i = 0; i < this.connections.length; i++) {
                var conn = this.connections[i];
                if (conn.peer == peer) {
                    if (this.debug) console.log('found my connection', i, conn);
                    index = i;
                }
            }
            if (index >= 0) {
                var conn = this.connections[index];
                conn.destroy();
                this.connections.splice(index, 1);
                this.connections = [...this.connections];
                this.fire('removeConnection', conn);
                if (this.debug) console.log(this.connections);
            }
        }
    }
}

function P2PClientFactory(options) {
    const { PeerBinary, debug } = options;

    return class P2PClient extends Evented {
        constructor(options = {}) {
            super();

            this.id = 'client_' + Math.floor(Math.random() * 100000);
            this.myID = this.id;
            this.peerID = this.id;

            Object.assign(this, settings);
            Object.assign(this, options);

            this.iceServers =
                options.iceServers ||
                options.ICE_SERVERS ||
                settings.ICE_SERVERS;

            if (options.database) {
                this.database = options.database;
            } else {
                this.database = getDatabase();
            }

            this.connection = null;
            this.channelRef = null;
            this.stream = undefined;
            this.isStream =
                typeof options.isStream === 'boolean' ? options.isStream : true;
            this.connectionCallbacks = [];
            this.lastNegotiationState = undefined;
            this.debug = !!debug || !!options.debug;
        }

        getPeerList(callback) {
            return getPeerList(this.database, callback)
        }

        connectToPeerID(id, callback = () => {}) {
            this.connectionCallbacks.push(callback);
            this.getPeerList(() => {
                var peer = this.peerList[id];
                if (!peer) {
                    console.error('peer not defined. id:', id);
                    callback('peer not defined');
                } else {
                    this.id = id;
                    this.serverRef = this.database.child(id);
                    this.serverRef.once('value', (ev1) => {
                        var sval = ev1.val();
                        let pOpts = {
                            initiator: true,
                            trickle: true,
                            config: {
                                iceServers: this.iceServers,
                            },
                            peerID: id,
                        };

                        if (this.isStream) {
                            pOpts.stream = this.getMyStream();
                        }

                        var p = new PeerBinary(pOpts);
                        this.connection = p;
                        this._registerEvents();
                        p.on('signal', (data) => {
                            if (data.type == 'offer') {
                                this._createChannel(data);
                            } else if (data.candidate) {
                                if (this.debug) {
                                    console.log(
                                        'client recieved candidate from webrtc',
                                        data
                                    );
                                }
                                this.outRef.push(data);
                            } else {
                                console.warn(
                                    'Client recieved unexpected signal through WebRTC:',
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
            if (this.stream) return this.stream

            // create fake stream if no stream specified, and the server is in streaming mode.
            //    because, at the moment, simple-peer must have a stream from the initiator.
            let fakeCanvas = document.createElement('canvas');
            fakeCanvas.width = fakeCanvas.height = 1;
            var fakeStream = fakeCanvas.captureStream();
            return fakeStream
        }

        disconnect(callback) {
            callback =
                callback ||
                function () {
                    console.log('client disconnected from server', arguments);
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
            offer.peerID = this.peerID;
            offer.myID = this.myID;
            if (this.debug)
                console.log('Got create channel with offer: ', offer);
            this.channelRef = this.serverRef.child('channels').push({
                fromClient: [offer],
            });
            this.outRef = this.channelRef.child('fromClient');
            this.inRef = this.channelRef.child('fromServer');
            this.inRef.on('child_added', (ev) => {
                if (this.debug) console.log(ev.val(), 'channel message, client');
                var val = ev.val();
                if (val.type === 'answer') {
                    setTimeout(() => {
                        let state = this.connection._pc.signalingState;
                        if (state == this.lastNegotiationState) {
                            if (this.debug)
                                console.log(
                                    'signalstate. skip nested negotiations'
                                );
                            return
                        }
                        if (this.debug) console.log('signal start negotiation');
                        this.lastNegotiationState = state;
                        if (this.debug) console.log('answer', this);
                        if (!this.connection.destroyed)
                            this.connection.signal(val);
                    }, 50); // a slight delay helps establish connection, I think.
                } else if (val.candidate) {
                    if (this.debug)
                        console.log('client recieved candidate from firebase');
                    setTimeout(() => {
                        if (!this.connection.destroyed)
                            this.connection.signal(val);
                    }, 50);
                } else {
                    console.warn(
                        val,
                        'Client recieved unexpected signal through Firebase'
                    );
                }
            });
        }

        _registerEvents() {
            // fire events
            this.connection.on('error', (err) => {
                console.error('client: error', err);
                this.fire('error', { peer: this.connection, err: err });
            });
            this.connection.on('connect', () => {
                if (this.debug) console.log('client: client connected');
                try {
                    for (var callback of this.connectionCallbacks) {
                        callback(null, this.connection);
                    }
                    this.connectionCallbacks = [];
                } catch (err) {
                    console.warn(err);
                }
                this.fire('connect', { peer: this.connection });
            });
            this.connection.on('data', (data) => {
                if (this.debug)
                    console.log('client: recieved some data: ', data);
                this.fire('data', { peer: this.connection, data: data });
            });
            this.connection.on('close', (data) => {
                if (this.debug)
                    console.log('connection closed', this.connection);
                this.fire('close', { peer: this.connection });
            });
            this.connection.on('dataBig', (data) => {
                this.fire('dataBig', { peer: this.connection, data: data });
            });
            this.connection.on('stream', (stream) => {
                if (this.debug)
                    console.log('Client: connected to stream', stream);
                this.fire('stream', { peer: this.connection, stream: stream });
            });
            this.connection._pc.addEventListener('signalingstatechange', () => {
                console.log('signalState', this.connection._pc.signalingState);
            });
        }
    }
}

var encode;  //encodce method dependency injection
function setEncode(newEncode) {
    encode = newEncode;
}

var drawingCanvas; // this is a canvas used by imageToBlob

const MAX_RECURSIVE_DEPTH = 10;
//
// @param  {Function} callback []
//
async function generateWebRTCpayload(obj) {
  let deBlobbed = await recursivelyEncodeBlobs(obj);
  let result = _generateWebRTCpayload(deBlobbed);
  return result;
}

function deBlob(obj) {
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

async function recursivelyEncodeBlobs(obj, depth = 0) {
  if (depth > MAX_RECURSIVE_DEPTH) {
    throw (depth);
  }
  if (
      (typeof File !== 'undefined' && obj.constructor == File) ||
      (typeof Blob !== 'undefined' && obj.constructor == Blob)
  ) {
      return await deBlob(obj)
  } else if (obj.constructor == Object) {
      let res = {};
      for (var i in obj) {
          res[i] = await recursivelyEncodeBlobs(obj[i], depth + 1);
      }
      return res
  }
  return obj;
}

async function recursivelyDecodeBlobs(obj, depth = 0) {
  if (depth > MAX_RECURSIVE_DEPTH) {
    throw (depth);
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

async function _generateWebRTCpayload(obj, headerOpt = {}) {
  //console.time('generateWebRTCpayload')
  let bin = encode(obj);
  console.log({ bin, obj });
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

  let encodedHeader = encode(header);
  console.log(encodedHeader, header);
  return { header: encodedHeader, chunks: chunks }
}

function arrayBufferToChunks(buff, payloadID) {
  //console.time('chunks')
  var result = [];
  var wholeshebang = new Uint8Array(buff);
  var count = 0;
  payloadID = payloadID || Math.floor(Math.random() * 100000000);
  for (var i = 0; i < buff.byteLength; i += settings.CHUNK_SIZE) {
    var chunksize = Math.min(buff.byteLength - i, settings.CHUNK_SIZE);
    var chunk = wholeshebang.slice(i, i + chunksize);
    var id = count; //new Uint8Array(idSize);
    let chbin = encode({ payloadID: payloadID, id: id, chunk: chunk });
    result.push(chbin);
    count++;
  }

  console.log(buff, result);

  //console.timeEnd('chunks')
  //console.log(`generated ${count} chunks`)
  return result;
}

function imageToBlob(img, cb) {
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

//
// Takes a bunch of possibly out of order chunks and assembles them into one
//
function UnChunkerFactory(options = {}) {
  const decode =
      options.decode ||
      function decode(data) {
          return data
      };

  return class UnChunker {
      constructor(opts = {}) {
          this.payloads = {};
          this.payloadCount = 0;
          this.onData = function (val) {
              console.log('default, data is ready:', val);
          };
      }

      registerChunk(msg) {
          var header = this.parseHeader(msg);
          if (header) {
              this._newPayload(header.payloadID, header);
          } else if (this._isChunk(msg)) {
              //the msg is a chunk hopefully
              try {
                  let val = decode(msg);
                  this._appendToPayload(val);
                  //this.emit('dataBig', val)
                  if (this._isPayloadReady(val.payloadID)) {
                      this._assembleChunks(val.payloadID, (result) => {
                          this.onData(result);
                          return result
                      });
                  }
              } catch (err) {
                  console.error(err);
                  console.error('val:', msg);
              }
          } else {
              console.warn('not my type', msg);
              // console.warn(this._ab2str(msg))
          }
          return null
      }

      _newPayload(id, header) {
          this.payloads[id] = Object.assign(header, {
              count: header.chunkCount,
              chunks: [],
              lastUpdate: new Date(),
          });
          this.payloadCount++;
      }

      _appendToPayload(chunk) {
          var pl = this.payloads[chunk.payloadID];
          pl.lastUpdate = new Date();
          pl.chunks.push(chunk);
      }

      async _assembleChunks(payloadID, cb) {
          var pl = this.payloads[payloadID];
          pl.chunks.sort(function (a, b) {
              return Number(a.id) - Number(b.id)
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
          try {
              let val1 = decode(result);
              let val2 = await recursivelyDecodeBlobs(val1);
              cb(val2);
              this._removePayload(payloadID);
          } catch (err) {
              console.error(err);
              console.error('buffer', result);
          }
      }

      _removePayload(id) {
          delete this.payloads[id];
          this.payloadCount--;
      }

      parseHeader(data) {
          if (typeof data == 'object' && !(data instanceof Uint8Array)) {
              if (data.chunkCount && data.chunkCount > 0) {
                  return data
              }
          } else if (data.length && data.length < 4000) {
              // might have been packed or something.
              try {
                  var json = decode(data);
                  if (json) {
                      try {
                          if (json && json.iAmAHeader) {
                              return json
                          }
                      } catch (er) {
                          // probably not a header. Not a big deal
                      }
                  }
              } catch (er) {
                  console.log(er);
              }
          }
          return undefined
      }

      _isChunk(msg) {
          if (this.payloadCount <= 0) {
              return false
          }
          return msg instanceof Uint8Array || msg instanceof DataView
      }

      _isPayloadReady(id) {
          var pl = this.payloads[id];
          if (pl.chunks.length == pl.count) {
              return true
          }
          return false
      }
  }
}

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
};

function PeerBinaryFactory(options) {
    const { UnChunker, Peer, wrtc } = options; // dependency injection
    if (typeof window !== 'undefined') window.simplePeer = Peer;

    return class PeerBinary extends Peer {
        constructor(options) {
            super({ wrtc, ...options });

            this._registerDataMessage();
            this.unchunker = new UnChunker(); //
            this.unchunker.onData = (val) => {
                this.emit('dataBig', val);
            };
            this.peerID = options.peerID;
        }

        //want to overide these 2 functions I think.
        _registerDataMessage(event) {
            this.on('data', (data) => {
                //when its done with a complete chunk, call this.emit('dataBig', completed)
                this.unchunker.registerChunk(data);
            });
        }

        async sendBig(chunk) {
            let stuff = await generateWebRTCpayload(chunk);
            this.send(stuff.header);
            for (var i in stuff.chunks) {
                var ch = stuff.chunks[i];
                this.send(ch);
                await sleep(60); //give the other side time to handle message
            }
        }
    }
}

const Peer = require('simple-peer');
const wrtc = require('wrtc');

// import adapter from "webrtc-adapter/src/js/adapter_core.js";
const { decode, encode: encode$1 } = require('msgpack-lite');


const firebase$1 = require('firebase/app');
require('firebase/database');

initFirebase(firebase$1);
setEncode(encode$1);

const UnChunker = UnChunkerFactory({ decode });
const PeerBinary = PeerBinaryFactory({ UnChunker, Peer, wrtc });
const P2PServer = P2PServerFactory({ PeerBinary });
const P2PClient = P2PClientFactory({ PeerBinary });

exports.Channel = Channel;
exports.P2PClient = P2PClient;
exports.P2PServer = P2PServer;
exports.PeerBinary = PeerBinary;
exports.UnChunker = UnChunker;
exports.arrayBufferToChunks = arrayBufferToChunks;
exports.firebase = firebase$1;
exports.generateWebRTCpayload = generateWebRTCpayload;
exports.imageToBlob = imageToBlob;
exports.recursivelyDecodeBlobs = recursivelyDecodeBlobs;
exports.recursivelyEncodeBlobs = recursivelyEncodeBlobs;
//# sourceMappingURL=build.full.cjs.map
