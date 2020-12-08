import { Channel } from './Channel.js'
import { P2PServerFactory } from './P2PServer.js'
import { P2PClientFactory } from './P2PClient.js'

import { initFirebase } from './defaultFirebase.js'

const Peer = require('simple-peer')
const wrtc = require('wrtc')

// import adapter from "webrtc-adapter/src/js/adapter_core.js";
const { decode, encode } = require('msgpack-lite')

import {
    generateWebRTCpayload,
    arrayBufferToChunks,
    imageToBlob,
    recursivelyEncodeBlobs,
    setEncode,
} from './dataUtils.js'

import { PeerBinaryFactory } from './peerBinary.js'

import { UnChunkerFactory } from './utils.js'

const firebase = require('firebase/app')
require('firebase/database')

initFirebase(firebase)
setEncode(encode)

const UnChunker = UnChunkerFactory({ decode })
const PeerBinary = PeerBinaryFactory({ UnChunker, Peer, wrtc })
const P2PServer = P2PServerFactory({ PeerBinary })
const P2PClient = P2PClientFactory({ PeerBinary })

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
    firebase,
}