import { settings } from './settings.js'
import { Evented } from './Evented.js'
import { getDatabase } from './defaultFirebase.js'
import { getPeerList as _getPeerList } from './peerDatabaseUtils.js'

export function P2PClientFactory(options) {
    const { PeerBinary, debug } = options

    return class P2PClient extends Evented {
        constructor(options = {}) {
            super()

            this.id = 'client_' + Math.floor(Math.random() * 100000)
            this.myID = this.id
            this.peerID = this.id

            this.ackID = 0
            this.ackCallbacks = {}

            this.requestID = 0
            this.requestCallbacks = {}

            Object.assign(this, settings)
            Object.assign(this, options)

            this.iceServers =
                options.iceServers ||
                options.ICE_SERVERS ||
                settings.ICE_SERVERS

            if (options.database) {
                this.database = options.database
            } else {
                this.database = getDatabase()
            }

            this.connection = null
            this.channelRef = null
            this.stream = undefined
            this.isStream =
                typeof options.isStream === 'boolean' ? options.isStream : true
            this.connectionCallbacks = []
            this.lastNegotiationState = undefined
            this.debug = !!debug || !!options.debug
        }

        getPeerList(callback) {
            return _getPeerList(this.database, callback)
        }

        ackCallback(ackID, data) {
            console.log('ackCallback: ', { ackID, data })
            let { callback, timeoutID } = this.ackCallbacks[ackID] || {}
            if (callback) {
                clearTimeout(timeoutID)
                callback(data)
                delete this.ackCallbacks[ackID]
            } else {
                console.warn('Got ackID without a callback registered.', data)
            }
        }

        sendAck(message, callback = () => {}, timeout = 30000) {
            if (!this.connection) {
                console.warn('no connection')
                return
            }

            this.ackID += 1
            let ackID = this.ackID

            let timeoutID = setTimeout(() => {
                this.ackCallback(ackID, { error: 'timeout' })
            }, timeout)

            this.ackCallbacks[ackID] = { callback, timeoutID }

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
            console.log('requestCallback: ', { requestID, data })
            let { callback, timeoutID } = this.requestCallbacks[requestID] || {}

            if (callback) {
                clearTimeout(timeoutID)
                callback(data)
                delete this.requestCallbacks[requestID]
            } else {
                console.warn(
                    'Got requestID without a callback registered.',
                    data
                )
            }
        }

        sendRequest(request, callback = () => {}, timeout = 30000) {
            if (!this.connection) {
                console.warn('no connection')
                return
            }

            this.requestID += 1
            let requestID = this.requestID

            let timeoutID = setTimeout(() => {
                this.requestCallback(requestID, { error: 'timeout' })
            }, timeout)

            this.requestCallbacks[requestID] = { callback, timeoutID }

            request.requestID = requestID

            return this.connection.sendBig(request)
        }

        connectToPeerID(id, callback = () => {}) {
            this.connectionCallbacks.push(callback)
            this.serverID = id
            this.getPeerList((err, peerList) => {
                if (err) {
                    console.error(err)
                    return
                }
                var peer = peerList[id]
                if (!peer) {
                    console.error('peer not defined. id:', id)
                    this._notifyCallbacks('peer not defined')
                } else {
                    this.id = id
                    this.serverRef = this.database.child(id)
                    this.serverRef.once('value', (ev1) => {
                        var sval = ev1.val()
                        let pOpts = {
                            initiator: true,
                            trickle: true,
                            config: {
                                iceServers: this.iceServers,
                            },
                            peerID: id,
                        }

                        if (this.isStream) {
                            pOpts.stream = this.getMyStream()
                        }

                        var p = new PeerBinary(pOpts)
                        this.connection = p
                        this._registerEvents()
                        p.on('signal', (data) => {
                            if (data.type == 'offer') {
                                this._createChannel(data)
                            } else if (data.candidate) {
                                if (this.debug) {
                                    console.log(
                                        'client recieved candidate from webrtc',
                                        data
                                    )
                                }
                                this.outRef.push(data)
                            } else {
                                console.warn(
                                    'Client recieved unexpected signal through WebRTC:',
                                    data
                                )
                            }
                        })
                    })
                }
            })
        }

        getMyStream() {
            if (this.stream) return this.stream

            // create fake stream if no stream specified, and the server is in streaming mode.
            //    because, at the moment, simple-peer must have a stream from the initiator.
            let fakeCanvas = document.createElement('canvas')
            fakeCanvas.width = fakeCanvas.height = 1
            var fakeStream = fakeCanvas.captureStream()
            return fakeStream
        }

        disconnect(callback) {
            callback =
                callback ||
                function () {
                    console.log('client disconnected from server', arguments)
                }

            if (this.serverRef) {
                this.serverRef.off()
            }
            if (this.outRef) {
                this.outRef.off()
            }
            if (this.inRef) {
                this.inRef.off()
            }
            if (this.connection) {
                this.connection.destroy(callback)
            } else {
                callback()
            }
            // QUESTION: should I also disconnect from the listeners to the events emitted by this class?
            //     it would be this.off()
        }

        _createChannel(offer) {
            //this.channelRef = this.serverRef.child('channels').push({offer:offer})
            offer.peerID = this.peerID
            offer.myID = this.myID
            if (this.debug)
                console.log('Got create channel with offer: ', offer)
            this.channelRef = this.serverRef.child('channels').push({
                fromClient: [offer],
            })
            this.outRef = this.channelRef.child('fromClient')
            this.inRef = this.channelRef.child('fromServer')
            this.inRef.on('child_added', (ev) => {
                if (this.debug) console.log(ev.val(), 'channel message, client')
                var val = ev.val()
                if (val.type === 'answer') {
                    setTimeout(() => {
                        let state =
                            this.connection &&
                            this.connection._pc &&
                            this.connection._pc.signalingState
                        if (state == this.lastNegotiationState) {
                            if (this.debug)
                                console.log(
                                    'signalstate. skip nested negotiations'
                                )
                            return
                        }
                        if (this.debug) console.log('signal start negotiation')
                        this.lastNegotiationState = state
                        if (this.debug) console.log('answer', this)
                        if (!this.connection.destroyed)
                            this.connection.signal(val)
                    }, 50) // a slight delay helps establish connection, I think.
                } else if (val.candidate) {
                    if (this.debug)
                        console.log('client recieved candidate from firebase')
                    setTimeout(() => {
                        if (!this.connection.destroyed)
                            this.connection.signal(val)
                    }, 50)
                } else {
                    console.warn(
                        val,
                        'Client recieved unexpected signal through Firebase'
                    )
                }
            })
        }

        _notifyCallbacks(err, connection) {
            try {
                for (var callback of this.connectionCallbacks) {
                    callback(err, connection)
                }
                this.connectionCallbacks = []
            } catch (err) {
                console.warn(err)
            }
        }

        _registerEvents() {
            // fire events
            this.connection.on('error', (err) => {
                console.error('client: error', err)
                this.fire('error', { peer: this.connection, err: err })
            })
            this.connection.on('connect', () => {
                if (this.debug) console.log('client: client connected')
                this._notifyCallbacks(null, this.connection)
                this.fire('connect', { peer: this.connection })
            })
            this.connection.on('data', (data) => {
                if (this.debug)
                    console.log('client: recieved some data: ', data)
                this.fire('data', { peer: this.connection, data: data })
            })
            this.connection.on('close', (data) => {
                if (this.debug)
                    console.log('connection closed', this.connection)
                this.fire('close', { peer: this.connection })
            })
            this.connection.on('dataBig', (data) => {
                if (data && data.type === 'ackack') {
                    let { ackID } = data.data.ack
                    this.ackCallback(ackID, data)
                } else {
                    this.fire('dataBig', { peer: this.connection, data: data })
                }
            })
            this.connection.on('stream', (stream) => {
                if (this.debug)
                    console.log('Client: connected to stream', stream)
                this.fire('stream', { peer: this.connection, stream: stream })
            })
            this.connection._pc.addEventListener('signalingstatechange', () => {
                console.log(
                    'signalState',
                    this.connection &&
                        this.connection._pc &&
                        this.connection._pc.signalingState
                )
            })
        }
    }
}
