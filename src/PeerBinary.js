
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
            this.PER_CHUNK_WAIT =
                options.PER_CHUNK_WAIT !== undefined
                    ? options.PER_CHUNK_WAIT
                    : 50
            this._registerDataMessage()
            this.unchunker = new UnChunker()
            this.unchunker.onData = (val) => {
                this.emit('dataBig', val)
            }
            this.peerID = options.peerID
        }

        //want to overide these 2 functions I think.
        _registerDataMessage() {
            this.on('data', (data) => {
                //when its done with a complete chunk, call this.emit('dataBig', completed)
                this.unchunker.registerChunk(data)
            })
        }

        async sendBig(chunk) {
            let rand = Math.random()
            console.time(`sendBig-${rand}`)
            console.log(`PER_CHUNK_WAIT: ${this.PER_CHUNK_WAIT}`)
            console.log(`PER_CHUNK_WAIT: ${this.PER_CHUNK_WAIT}`)
            try {
                let stuff = await generateWebRTCpayload(chunk)
                await this.send(stuff.header)
                for (var i in stuff.chunks) {
                    var ch = stuff.chunks[i]
                    await this.send(ch)
                    if (this.PER_CHUNK_WAIT) {
                        await sleep(this.PER_CHUNK_WAIT) //give the other side time to handle message
                    }
                }
            } catch (error) {
                console.error('GOT AN ERROR: ', error)
            }
            console.timeEnd(`sendBig-${rand}`)
        }
    }
}
