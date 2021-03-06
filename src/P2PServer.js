import { deepEqual } from 'fast-equals'
import { settings } from './settings.js'
import { Evented } from './Evented.js'
import { getFirebase, getDatabase } from './defaultFirebase.js'
import { Channel } from './Channel.js'

import { getPeerList as _getPeerList } from './peerDatabaseUtils.js'
import { firebaseTreeTrimmer } from './firebaseTreeTrimmer.js'

export function P2PServerFactory(options) {
    const { PeerBinary, debug } = options

    return class P2PServer extends Evented {
        constructor(options = {}, initialPeerInfo = {}) {
            super() //no idea what this does
            console.assert(
                options.iceServers,
                'Server: no ice servers yet. Using defaults'
            )
            this.MAX_CONNECTIONS = 50
            this.isListening = false

            this.id = 'server_' + Math.floor(Math.random() * 100000)
            this.myID = this.id
            this.peerID = this.id

            this.stream = undefined
            this.iceServers =
                options.iceServers ||
                options.ICE_SERVERS ||
                settings.ICE_SERVERS
            this.POLLING_FREQUENCY =
                options.POLLING_FREQUENCY || settings.POLLING_FREQUENCY

            Object.assign(this, options)

            if (options.database) {
                this.database = options.database
            } else {
                this.database = getDatabase()
            }

            this.debug = !!debug || !!options.debug
            this.initialPeerInfo = initialPeerInfo
            this.initialPeerInfo.id = this.id

            if (this.debug) console.log(this.id)
            if (!options.dontCallInitYet) {
                this.init()
            }

            this._peerInfo = null
        }

        init() {
            var fbref = this.database

            // the below assumes that tree trimming would happen at the same lavel as the peers ref or would be passed explicitly
            this.treeTrimmer = new firebaseTreeTrimmer({
                peersRef: this.database,
                treeTrimmingRef:
                    this.treeTrimmingRef ||
                    this.database.parent.child('treeTrimming'),
                id: this.id,
            })

            this.userRef = fbref.child(this.id)

            this.userRef.on('value', (snapshot) => {
                // handle being tree trimmed while asleep
                let newPeerInfo = snapshot.val()
                if (
                    newPeerInfo &&
                    newPeerInfo.id &&
                    !deepEqual(
                        { ...this._peerInfo, lastUpdate: null },
                        { ...newPeerInfo, lastUpdate: null }
                    )
                ) {
                    this._peerInfo = newPeerInfo
                } else if (
                    this._peerInfo &&
                    this._peerInfo.id &&
                    !(newPeerInfo && newPeerInfo.id)
                ) {
                    console.log(
                        'peerInfo lost, updating with saved version: ',
                        this._peerInfo,
                        newPeerInfo
                    )
                    this.userRef.update({
                        ...this._peerInfo,
                        lastUpdate:
                            getFirebase().database.ServerValue.TIMESTAMP,
                    })
                } else if (this._peerInfo) {
                    //console.log('no update needed')
                } else {
                    console.warn(
                        'Appears we have not yet set peerInfo: ',
                        this._peerInfo,
                        newPeerInfo
                    )
                }
            })

            this.userRef.onDisconnect().remove()

            if (this.initialPeerInfo) this.userRef.update(this.initialPeerInfo)

            this.updateRef = this.userRef.child('lastUpdate')
            this.updateRef.set(getFirebase().database.ServerValue.TIMESTAMP)

            this.channelRef = this.userRef.child('channels')
            if (this.stream) {
                this.userRef.child('isStream').set(true)
            }
            this.channelRef.set([])

            this.connections = []
            this._intervalID = setInterval(() => {
                this.fire('updateTimeStamp', undefined)
                this._updateOnFireBase()
            }, this.POLLING_FREQUENCY)

            this.listenToChannels()
            this.isListening = true
            this.fire('init', undefined)
        }

        _updateOnFireBase() {
            // one may want to overwrite this
            this.updateRef.set(getFirebase().database.ServerValue.TIMESTAMP)
        }

        sendToAll(data) {
            for (var conx of this.connections) {
                if (conx && conx.peer) {
                    try {
                        conx.peer.send.bind(conx.peer)(data)
                    } catch (err) {
                        console.error(
                            err,
                            'Got an error, interrupted connection? '
                        )
                    }
                }
            }
        }

        sendToAllBig(data) {
            for (var conx of this.connections) {
                if (conx && conx.peer) {
                    try {
                        conx.peer.sendBig.bind(conx.peer)(data)
                    } catch (err) {
                        console.error(
                            err,

                            'Got an error, interrupted connection? '
                        )
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
                    )
                    return
                }
                var val = ev.val()
                if (this.debug) {
                    console.log(val, 'new child')
                }
                for (var i in val.fromClient) {
                    var sig = val.fromClient[i]
                    if (this.debug) console.log({ sig })
                    if (sig.type === 'offer') {
                        var mykey = ev.key
                        var { peerID, myID } = sig
                        var channel = new Channel(
                            this.channelRef.child(mykey),
                            this._makePeer(myID)
                        )
                        this.connections = [...this.connections, channel]
                        this.fire('addConnection', channel)

                        // on message through webRTC (simple-peer)
                        //eslint-disable-next-line no-loop-func
                        var answerSentYet = false
                        channel.peer.on('signal', (data) => {
                            if (data.type === 'answer') {
                                if (answerSentYet) {
                                    console.warn(
                                        'Why am i trying to send multiple answers'
                                    )
                                }
                                channel.outRef.push(data)
                                answerSentYet = true
                            } else if (data.candidate) {
                                channel.outRef.push(data)
                            } else {
                                console.warn(
                                    data,

                                    'unexpected message from WebRTC'
                                )
                            }
                        })

                        // on message through firebase
                        //eslint-disable-next-line no-loop-func
                        channel.inRef.on('child_added', (ev2) => {
                            var val2 = ev2.val()
                            if (this.debug) {
                                console.log(val2, 'child_added -- firebase')
                            }
                            if (val2.candidate) {
                                if (this.debug) {
                                    console.log(
                                        val2,
                                        'server got candidate from firebase'
                                    )
                                }
                                channel.peer.signal(val2)
                            } else if (val2.type === 'offer') {
                                channel.peer.signal(val2)
                            } else if (val2.type === 'answer') {
                                //ignore this. It was probably from me.
                            } else {
                                console.warn(
                                    val2,
                                    'unexpected message from Firebase'
                                )
                            }
                        })
                    }
                }
            })
        }

        _makePeer(peerID) {
            if (this.debug)
                console.log('_makePeer called with peerID: ', peerID)
            this.fire('makePeer', undefined)
            var myoptions = {
                initiator: false,
                trickle: true,
                config: {
                    iceServers: this.iceServers,
                },
                peerID,
            }
            if (this.stream) myoptions.stream = this.stream
            var p = new PeerBinary(myoptions)

            // fire events
            p.on('error', (err) => {
                console.error('server: error', err)
                this.fire('error', { peer: p, err: err })
            })
            p.on('connect', () => {
                if (this.debug) console.log('server: client connected')
                this.fire('connect', { peer: p })
            })
            p.on('data', (data) => {
                if (this.debug)
                    console.log('server: server recieved some data: ', data)
                this.fire('data', { peer: p, data: data })
            })
            p.on('close', () => {
                if (this.debug) console.log('server: connection closed', p)
                this._removeConnection(p)
                this.fire('close', { peer: p })
            })
            p.on('dataBig', (data) => {
                if (data && data.type === 'ack') {
                    p.sendBig({
                        type: 'ackack',
                        data: {
                            ack: { ...data.data },
                            ackack: {
                                id: this.id,
                                numConnections: this.connections.length,
                                treeTrimmer: {
                                    rank: this.treeTrimmer.rank,
                                    superior: this.treeTrimmer.superior,
                                },
                                peerID,
                                date: new Date().getTime(),
                            },
                        },
                    })
                } 
                this.fire('dataBig', { peer: p, data: data })
            })

            p.on('stream', (stream) => {
                if (this.debug)
                    console.log('Server: connected to stream', stream)
                this.fire('stream', { peer: p, stream: stream })
            })
            p.on('signal', (data) => {
                if (this.debug) console.log('Server: received signal', data)
                this.fire('signal', data)
            })

            //TODO make it so server can register events that will get called on each individual connection
            return p
        }

        getPeerList(callback) {
            return _getPeerList(this.database, callback)
        }

        destroy() {
            this.channelRef.remove()
            this.updateRef.remove()
            this.channelRef.off()
            this.updateRef.off()
            this.userRef.off()
            this.isListening = false
            for (var x of this.connections) {
                x.destroy()
            }
            this.fire('destroyed', {})
            this.connections = []
            clearInterval(this._intervalID)
        }

        _removeConnection(peer) {
            var index = -1
            for (var i = 0; i < this.connections.length; i++) {
                var conn = this.connections[i]
                if (conn.peer == peer) {
                    if (this.debug) console.log('found my connection', i, conn)
                    index = i
                }
            }
            if (index >= 0) {
                var conn = this.connections[index]
                conn.destroy()
                this.connections.splice(index, 1)
                this.connections = [...this.connections]
                this.fire('removeConnection', conn)
                if (this.debug) console.log(this.connections)
            }
        }
    }
}
