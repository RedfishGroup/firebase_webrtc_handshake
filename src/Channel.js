export class Channel {
    constructor(fbref, peer) {
        this.outRef = fbref.child('fromServer') //firebase
        this.inRef = fbref.child('fromClient')
        this.peer = peer // simple-peer
    }

    destroy() {
        this.outRef.off()
        this.inRef.off()
        this.peer.destroy()
    }
}
