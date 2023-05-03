import { P2PServerFactory } from './P2PServer.js'
import { Channel } from './Channel.js'
import { P2PClientFactory } from './P2PClient.js'


import * as Peer2 from 'simple-peer/simplepeer.min.js'
const Peer = Peer2.default

import * as msgpacklite from 'msgpack-lite/dist/msgpack.min.js'
const msgPack = msgpacklite.default

import {
    generateWebRTCpayload,
    arrayBufferToChunks,
    imageToBlob,
    recursivelyEncodeBlobs,
    recursivelyDecodeBlobs,
    setEncode,
    UnChunkerFactory,
} from './dataUtils.js'

import { PeerBinaryFactory } from './PeerBinary.js'

import {
    child,
    off,
    onChildAdded,
    onDisconnect,
    onValue,
    orderByValue,
    push,
    query,
    remove,
    serverTimestamp,
    set,
    update,
} from 'firebase/database'

const firebase = {
    child,
    off,
    onChildAdded,
    onDisconnect,
    onValue,
    orderByValue,
    push,
    query,
    remove,
    serverTimestamp,
    set,
    update,
}

setEncode(msgPack.encode)

const UnChunker = UnChunkerFactory({ decode: msgPack.decode })
const PeerBinary = PeerBinaryFactory({ UnChunker, Peer })
const P2PServer = P2PServerFactory({ PeerBinary, firebase })
const P2PClient = P2PClientFactory({ PeerBinary, firebase })

export {
    P2PServer,
    P2PClient,
    generateWebRTCpayload,
    arrayBufferToChunks,
    imageToBlob,
    PeerBinary,
    UnChunker,
    Channel,
    recursivelyEncodeBlobs,
    recursivelyDecodeBlobs,
    firebase,
}
