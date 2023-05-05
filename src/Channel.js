export class Channel {
    constructor(fbref, peer, firebase) {
        this.firebase = firebase
        this.outRef = firebase.child(fbref, 'fromServer') //firebase
        this.inRef = firebase.child(fbref, 'fromClient')
        this.peer = peer // simple-peer
    }

    destroy() {
        this.firebase.off(this.outRef)
        this.firebase.off(this.inRef)
        this.peer.destroy()
    }
}
