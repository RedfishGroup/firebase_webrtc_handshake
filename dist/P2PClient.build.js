import 'firebase/app';
import 'firebase/database';

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

/**
 * Evented
 */

class Evented {
    constructor() {
        this.events = {};
    }

    on(eventName, callback) {
        if (typeof callback !== 'function') return
        if (!this.events.hasOwnProperty(eventName)) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    off(eventName, callback) {
        if (this.events.hasOwnProperty(eventName)) {
            if (typeof callback === 'function') {
                //_.without(this.events[eventName], callback);
                this.events = this.events.filter(function (x) {
                    if (x != this.events[eventName]) {
                        return x
                    }
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

function getDatabase() {

    {
        throw new Error(
            `init must be called before accessing database.  no firebase`
        )
    }
}

/**
 *
 * @param {*} database
 * @param {*} callback
 */
function getPeerList(database, callback, firebase) {
    console.log('getPeerList: ', database);
    firebase.onValue(
        database,
        (ev) => {
            var val = ev.val();
            callback(null, val);
        },
        {
            onlyOnce: true,
        }
    );
}

function P2PClientFactory(options) {
    const { PeerBinary, firebase } = options;

    return class P2PClient extends Evented {
        constructor(options = {}) {
            super();

            this.id = 'client_' + Math.floor(Math.random() * 100000);
            this.myID = this.id;
            this.peerID = this.id;

            this.ackID = 0;
            this.ackCallbacks = {};

            this.requestID = 0;
            this.requestCallbacks = {};

            let combinedSettings = { ...settings, ...options };
            if (combinedSettings.debug)
                console.log('settings: ', {
                    settings,
                    options,
                    combinedSettings,
                });
            Object.assign(this, combinedSettings);

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
            this.debug = !!options.debug;

            this.PER_CHUNK_WAIT = options.PER_CHUNK_WAIT;
        }

        getPeerList(callback) {
            if (this.debug) console.log('Database: ', this.database);
            return getPeerList(this.database, callback, firebase)
        }

        ackCallback(ackID, data) {
            if (this.debug) console.log('ackCallback: ', { ackID, data });
            let { callback, timeoutID } = this.ackCallbacks[ackID] || {};
            if (callback) {
                clearTimeout(timeoutID);
                callback(data);
                delete this.ackCallbacks[ackID];
            } else {
                console.warn('Got ackID without a callback registered.', data);
            }
        }

        sendAck(message, callback = () => {}, timeout = 30000) {
            if (!this.connection) {
                console.warn('no connection');
                return
            }

            this.ackID += 1;
            let ackID = this.ackID;

            let timeoutID = setTimeout(() => {
                this.ackCallback(ackID, { error: 'timeout' });
            }, timeout);

            this.ackCallbacks[ackID] = { callback, timeoutID };

            return this.connection.sendBig({
                type: 'ack',
                data: {
                    ackID: this.ackID,
                    peerID: this.serverID,
                    startDate: new Date().getTime(),
                    message,
                },
            })
        }

        requestCallback(requestID, data) {
            if (this.debug)
                console.log('requestCallback: ', { requestID, data });
            let { callback, timeoutID } = this.requestCallbacks[requestID] || {};

            if (callback) {
                clearTimeout(timeoutID);
                callback(data);
                delete this.requestCallbacks[requestID];
            } else {
                console.warn(
                    'Got requestID without a callback registered.',
                    data
                );
            }
        }

        sendRequest(request, callback = () => {}, timeout = 30000) {
            if (!this.connection) {
                console.warn('no connection');
                return
            }

            this.requestID += 1;
            let requestID = this.requestID;

            let timeoutID = setTimeout(() => {
                this.requestCallback(requestID, { error: 'timeout' });
            }, timeout);

            this.requestCallbacks[requestID] = { callback, timeoutID };

            request.requestID = requestID;
            if (this.debug) console.log('sending request: ', request);

            return this.connection.sendBig(request)
        }

        connectToPeerID(id, callback = () => {}) {
            this.connectionCallbacks.push(callback);
            this.serverID = id;
            this.getPeerList((err, peerList) => {
                if (err) {
                    console.error(err);
                    this._notifyCallbacks(
                        `Got error requesting peer list:${err}`
                    );
                    return
                }
                var peer = peerList[id];
                if (!peer) {
                    console.error('peer not defined. id:', id);
                    this._notifyCallbacks('peer not defined');
                } else {
                    this.id = id;
                    this.serverRef = firebase.child(this.database, id);
                    firebase.onValue(
                        this.serverRef,
                        (ev1) => {
                            ev1.val();
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

                            if (
                                this.PER_CHUNK_WAIT ||
                                this.PER_CHUNK_WAIT === 0
                            ) {
                                pOpts.PER_CHUNK_WAIT = this.PER_CHUNK_WAIT;
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
                                    firebase.push(this.outRef, data);
                                } else {
                                    console.warn(
                                        'Client recieved unexpected signal through WebRTC:',
                                        data
                                    );
                                }
                            });
                        },
                        {
                            onlyOnce: true,
                        }
                    );
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
                firebase.off(this.serverRef);
            }
            if (this.outRef) {
                firebase.off(this.outRef);
            }
            if (this.inRef) {
                firebase.off(this.inRef);
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
            offer.peerID = this.peerID;
            offer.myID = this.myID;
            if (this.debug)
                console.log('Got create channel with offer: ', offer);
            this.channelRef = firebase.push(
                firebase.child(this.serverRef, 'channels'),
                {
                    fromClient: [offer],
                }
            );
            this.outRef = firebase.child(this.channelRef, 'fromClient');
            this.inRef = firebase.child(this.channelRef, 'fromServer');
            firebase.onChildAdded(this.inRef, (ev) => {
                var val = ev.val();
                if (this.debug) console.log(val, 'channel message, client');
                if (val.type === 'answer') {
                    setTimeout(() => {
                        let state =
                            this.connection &&
                            this.connection._pc &&
                            this.connection._pc.signalingState;
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

        _notifyCallbacks(err, connection) {
            try {
                for (var callback of this.connectionCallbacks) {
                    callback(err, connection);
                }
                this.connectionCallbacks = [];
            } catch (err) {
                console.warn(err);
            }
        }

        _registerEvents() {
            // fire events
            this.connection.on('error', (err) => {
                console.error('client: error', err);
                this.fire('error', { peer: this.connection, err: err });
            });
            this.connection.on('connect', () => {
                if (this.debug) console.log('client: client connected');
                this._notifyCallbacks(null, this.connection);
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
                if (data && data.type === 'ackack') {
                    let { ackID } = data.data.ack;
                    this.ackCallback(ackID, data);
                } else {
                    // console.log('~~~ DataBig ~~~~')
                    // console.log(data)
                    let { requestID } = data || {};
                    if (requestID) {
                        this.requestCallback(requestID, data);
                    }
                    // console.log('~~~~~~~~~~~~~~~~')
                    this.fire('dataBig', { peer: this.connection, data: data });
                }
            });
            this.connection.on('stream', (stream) => {
                if (this.debug)
                    console.log('Client: connected to stream', stream);
                this.fire('stream', { peer: this.connection, stream: stream });
            });
            this.connection._pc.addEventListener('signalingstatechange', () => {
                if (this.debug)
                    console.log(
                        'signalState',
                        this.connection &&
                            this.connection._pc &&
                            this.connection._pc.signalingState
                    );
            });
        }
    }
}

export { P2PClientFactory };
//# sourceMappingURL=P2PClient.build.js.map
