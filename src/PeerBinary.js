
import { generateWebRTCpayload } from './dataUtils.js'


const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export function PeerBinaryFactory(options) {
    const { UnChunker, Peer, wrtc } = options // dependency injection
    if (typeof window !== 'undefined') window.simplePeer = Peer

    return class PeerBinary extends Peer {
        constructor(options) {
            super({ wrtc, ...options })

            this._registerDataMessage()
            this.unchunker = new UnChunker() //
            this.unchunker.onData = (val) => {
                this.emit('dataBig', val)
            }
            this.peerID = options.peerID
        }

        //want to overide these 2 functions I think.
        _registerDataMessage(event) {
            this.on('data', (data) => {
                //when its done with a complete chunk, call this.emit('dataBig', completed)
                this.unchunker.registerChunk(data)
            })
        }

        async sendBig(chunk) {
            try {
                let stuff = await generateWebRTCpayload(chunk)
                await this.send(stuff.header)
                for (var i in stuff.chunks) {
                    var ch = stuff.chunks[i]
                    await this.send(ch)
                    await sleep(60) //give the other side time to handle message
                }    
            } catch (error) {
                console.error('GOT AN ERROR: ', err)
            }
        }
    }
}
