import { P2PServerFactory } from './P2PServer.js'
import { Channel } from './Channel.js'
import { P2PClientFactory } from './P2PClient.js'


import * as Peer2 from 'simple-peer/simplepeer.min.js'
const Peer = Peer2.default

// import adapter from "webrtc-adapter/src/js/adapter_core.js";
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

setEncode(msgPack.encode)

const UnChunker = UnChunkerFactory({ decode: msgPack.decode })
const PeerBinary = PeerBinaryFactory({ UnChunker, Peer })
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
    recursivelyDecodeBlobs,
}
