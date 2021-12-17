import { child, off } from 'firebase/database'

export class Channel {
    constructor(fbref, peer) {
        this.outRef = child(fbref, 'fromServer') //firebase
        this.inRef = child(fbref, 'fromClient')
        this.peer = peer // simple-peer
    }

    destroy() {
        off(this.outRef)
        off(this.inRef)
        this.peer.destroy()
    }
}
