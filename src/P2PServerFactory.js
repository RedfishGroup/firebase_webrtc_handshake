import { deepEqual } from 'fast-equals'
import { settings } from './settings.js'
import { Evented } from './Evented.js'
import { Channel } from './Channel.js'

import { getPeerList as _getPeerList } from './peerDatabaseUtils.js'
import { firebaseTreeTrimmer } from './firebaseTreeTrimmer.js'

export function P2PServerFactory(options) {
    const { PeerBinary } = options

    return class P2PServer extends Evented {
        constructor(options = {}, initialPeerInfo = {}) {
            super() //no idea what this does
            console.assert(
                options.iceServers || options.ICE_SERVERS,
                'Server: no ice servers yet. Using defaults'
            )

            if (!options.firebase)
                throw new Error('firebase must be passed in the options object')

            if (!options.database)
                throw new Error('database must be passed in the options object')

            this.firebase = options.firebase

            this.MAX_CONNECTIONS = 50
            this.isListening = false

            this.id = 'server_' + Math.floor(Math.random() * 100000)
            this.peerID = this.id

            this.stream = undefined
            this.iceServers =
                options.iceServers ||
                options.ICE_SERVERS ||
                settings.ICE_SERVERS
            this.POLLING_FREQUENCY =
                options.POLLING_FREQUENCY || settings.POLLING_FREQUENCY

            let combinedSettings = { ...settings, ...options }
            if (combinedSettings.debug)
                console.log('settings: ', {
                    settings,
                    options,
                    combinedSettings,
                })
            Object.assign(this, combinedSettings)

            this.database = options.database
            console.log('Database: ', this.database.toString())

            this.peerInfoRef = this.firebase.child(this.database, 'peerInfo')

            this.heartbeatRef = this.firebase.child(this.database, 'heartbeat')

            this.debug = !!options.debug
            this.initialPeerInfo = initialPeerInfo
            this.initialPeerInfo.id = this.id
            this.monitorRate = options.monitorRate
            this.trimmerRemoveRate = options.trimmerRemoveRate
            console.log('monitorRate: ', this.monitorRate)

            if (this.debug) console.log(this.id)
            if (!options.dontCallInitYet) {
                this.init()
            }

            this._peerInfo = null

            this.resolveReady = null
            this.rejectReady = null
            this.readyPromise = new Promise((resolve, reject) => {
                this.resolveReady = resolve
                this.rejectReady = reject
            })
        }

        ready() {
            return this.readyPromise
        }

        peerListPromise() {
            return new Promise((resolve, reject) => {
                return _getPeerList(
                    this.peerInfoRef,
                    (err, val) => {
                        if (err) return reject(err)
                        resolve(val)
                    },
                    this.firebase
                )
            })
        }

        init() {
            // the below assumes that tree trimming would happen at the same lavel as the peers ref or would be passed explicitly
            this.treeTrimmer = new firebaseTreeTrimmer({
                peersRef: this.peerInfoRef,
                heartbeatRef: this.heartbeatRef,
                channelsRef: this.firebase.child(this.database, 'channels'),
                treeTrimmingRef:
                    this.treeTrimmingRef ||
                    this.firebase.child(this.database, 'treeTrimming'),
                id: this.id,
                firebase: this.firebase,
                monitorRate: this.monitorRate || 60000,
                trimmerRemoveRate: this.trimmerRemoveRate,
            })

            this.userRef = this.firebase.child(this.peerInfoRef, this.id)

            if (this.debug)
                console.log(
                    'userRef: ' + this.userRef.toString(),
                    this.initialPeerInfo
                )

            this.firebase.onValue(
                this.firebase.child(this.peerInfoRef, this.id),
                (snapshot) => {
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
                        this.firebase.update(
                            this.firebase.child(this.peerInfoRef, this.id),
                            {
                                ...this._peerInfo,
                                lastUpdate: this.firebase.serverTimestamp(),
                            }
                        )
                        this.firebase.update(
                            this.firebase.child(this.heartbeatRef, this.id),
                            {
                                lastUpdate: this.firebase.serverTimestamp(),
                            }
                        )
                    } else if (this._peerInfo) {
                        //console.log('no update needed')
                    } else {
                        console.warn(
                            'Appears we have not yet set peerInfo: ',
                            this._peerInfo,
                            newPeerInfo
                        )
                    }
                }
            )

            this.firebase.onDisconnect(this.userRef).remove()
            this.firebase
                .onDisconnect(this.firebase.child(this.peerInfoRef, this.id))
                .remove()
            this.firebase
                .onDisconnect(this.firebase.child(this.heartbeatRef, this.id))
                .remove()

            if (this.initialPeerInfo) {
                if (this.debug)
                    console.log(
                        'UserRef: ' + this.userRef,
                        this.initialPeerInfo
                    )
                this.firebase
                    .update(
                        this.firebase.child(this.peerInfoRef, this.id),
                        this.initialPeerInfo
                    )
                    .then(() => {
                        console.log('update finished')
                        this.resolveReady(this.userRef)
                    })
                    .catch((e) => {
                        this.rejectReady(e)
                        console.error('propblem: ', e)
                    })
            }

            this.updateRef = this.firebase.child(
                this.firebase.child(this.heartbeatRef, this.id),
                'lastUpdate'
            )
            this.firebase.set(this.updateRef, this.firebase.serverTimestamp())

            this.channelsRef = this.firebase.child(
                this.database,
                `channels/${this.id}`
            )
            if (this.stream) {
                this.firebase.set(
                    this.firebase.child(
                        this.firebase.child(this.peerInfoRef, this.id),
                        'isStream'
                    ),
                    true
                )
            }
            this.firebase.set(this.channelsRef, [])

            this.connections = []
            console.log('POLLING_FREQUENCY: ', this.POLLING_FREQUENCY)
            this._intervalID = setInterval(() => {
                // console.log('setInterval: ', this.POLLING_FREQUENCY)
                this.fire('updateTimeStamp')
                this._updateOnFireBase()
            }, this.POLLING_FREQUENCY)

            this.listenToChannels()
            this.isListening = true
            this.fire('init', undefined)
        }

        _updateOnFireBase() {
            // one may want to overwrite this

            this.firebase.set(this.updateRef, this.firebase.serverTimestamp())
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

        async updatePeerInfo(newPeerInfo) {
            return this.firebase.update(
                this.firebase.child(this.peerInfoRef, this.id),
                { ...newPeerInfo, lastUpdate: this.firebase.serverTimestamp() }
            )
        }

        listenToChannels() {
            // disabling no-loop-func because these loops are correct usage
            // https://eslint.org/docs/rules/no-loop-func
            // when a new channel is added, listen to it.

            if (this.debug)
                console.log('channelsRef: ', this.channelsRef.toString())

            this.firebase.onChildAdded(this.channelsRef, (ev) => {
                if (this.connections.length > this.MAX_CONNECTIONS) {
                    console.error(
                        'Too many connections. TODO:close/remove old stale connections'
                    )
                    return
                }
                var sig = ev.val().fromClient[0]
                if (this.debug) console.log('signal: ', sig)
                if (sig.type === 'offer') {
                    var mykey = ev.key
                    var { serverID, peerID } = sig
                    console.log('listener create channel: ', sig)
                    var channel = new Channel(
                        this.firebase.child(this.channelsRef, mykey),
                        this._makePeer(peerID),
                        this.firebase
                    )
                    this.connections = [...this.connections, channel]
                    this.fire('addConnection', channel)

                    // on message through webRTC (simple-peer)
                    var answerSentYet = false
                    channel.peer.on('signal', (data) => {
                        if (data.type === 'answer') {
                            if (answerSentYet) {
                                console.warn(
                                    'Why am i trying to send multiple answers'
                                )
                            }
                            this.firebase.push(channel.outRef, data)
                            answerSentYet = true
                        } else if (data.candidate) {
                            this.firebase.push(channel.outRef, data)
                        } else {
                            console.warn(data, 'unexpected message from WebRTC')
                        }
                    })

                    // on message through firebase
                    this.firebase.onChildAdded(channel.inRef, (ev2) => {
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
                peerID: peerID,
                serverID: this.id,
            }
            if (this.stream) myoptions.stream = this.stream
            if (this.PER_CHUNK_WAIT !== undefined)
                myoptions.PER_CHUNK_WAIT = this.PER_CHUNK_WAIT
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
                if (this.debug)
                    console.log('server: connection closed', p.peerID)
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
            return _getPeerList(this.peerInfoRef, callback, this.firebase)
        }

        onPeerList(callback) {
            return _getPeerList(
                this.peerInfoRef,
                callback,
                this.firebase,
                false
            )
        }

        destroy() {
            this.firebase.remove(this.channelsRef)
            this.firebase.remove(this.updateRef)
            this.firebase.off(this.channelsRef)
            this.firebase.off(this.updateRef)
            this.firebase.off(this.userRef)

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

                //remove from list of connections and create new list of connections
                this.connections = [
                    ...this.connections.slice(0, index),
                    ...this.connections.slice(index + 1),
                ]

                this.fire('removeConnection', conn)
                if (this.debug) console.log(this.connections)
            }
        }
    }
}
