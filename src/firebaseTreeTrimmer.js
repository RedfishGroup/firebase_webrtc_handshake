/**  Description: class for monitoring firebase references
 and removing children that have not updated recently
*/
export class firebaseTreeTrimmer {
    constructor(options = null) {
        if (
            (options === null ||
                !options.treeTrimmingRef ||
                !options.peersRef ||
                !options.channelsRef ||
                !options.heartbeatRef,
            !options.id || !options.firebase)
        )
            throw new Error(
                'requires an options object with an id, firebase, treeTrimmingRef, heartbeatRef and peersRef'
            )
        Object.assign(this, options)

        this.firebase = options.firebase
        this.monitorRate = options.monitorRate || 60000
        this.monitorReference = this.monitor.bind(this)
        this.trimmerRemoveRate = options.trimmerRemoveRate || 5 * 60000
        
        this.firebase
            .onDisconnect(this.firebase.child(this.treeTrimmingRef, this.id))
            .remove()

        this.monitor()
    }

    monitor() {
        this.firebase.onValue(
            this.firebase.query(
                this.treeTrimmingRef,
                this.firebase.orderByValue()
            ),
            (snapshot) => {
                // check if in list
                if (snapshot.child(this.id).val() === null) {
                    // if not add it
                    this.firebase.set(
                        this.firebase.child(snapshot.ref, this.id),
                        Date.now()
                    )
                } else {
                    // otherwise calculate hierachy
                    let children = {}
                    let rank = 0,
                        superior
                    snapshot.forEach(function (child) {
                        children[child.key] = { rank, superior }
                        superior = child.key
                        rank++
                    })

                    let me = children[this.id]
                    this.rank = me.rank
                    this.superior = me.superior

                    console.log(
                        'Treetrimmer rank: ',
                        me.rank,
                        ' superior id: ',
                        me.superior
                    )

                    if (me.rank === 0) {
                        this.treeTrimmer(children)
                    } else {
                        this.watchMySuperior(me.superior)
                    }
                }

                // continuously check for treeTrimming, every minute
                setTimeout(this.monitorReference, this.monitorRate)
            },
            {
                onlyOnce: true,
            }
        )

    }

    treeTrimmer(treeTrimmers) {
        // remove all references to peers not in treeTrimming list
        this.firebase.onValue(
            this.heartbeatRef,
            (snap) => {
                snap.forEach((child) => {
                    // if the peer is not in the treeTrimming list,
                    // remove it from other refs heartbeatRef
                    if (treeTrimmers[child.key] === undefined) {
                        this.firebase.remove(
                            this.firebase.child(this.heartbeatRef, child.key)
                        )
                        this.firebase.remove(
                            this.firebase.child(this.channelsRef, child.key)
                        )
                        this.firebase.remove(
                            this.firebase.child(this.peersRef, child.key)
                        )
                    }
                })
            },
            {
                onlyOnce: true,
            }
        )
        // this.firebase.onValue(
        //     this.channelsRef,
        //     (snap) => {
        //         snap.forEach((child) => {
        //             // if the peer is not in the treeTrimming list,
        //             // remove it from channelsRef
        //             if (treeTrimmers[child.key] === undefined) {
        //                 this.firebase.remove(child.ref)
        //             }
        //         })
        //     },
        //     {
        //         onlyOnce: true,
        //     }
        // )
        // this.firebase.onValue(
        //     this.peersRef,
        //     (snap) => {
        //         snap.forEach((child) => {
        //             // if the peer is not in the treeTrimming list,
        //             // remove it from peersRef
        //             if (treeTrimmers[child.key] === undefined) {
        //                 this.firebase.remove(child.ref)
        //             }
        //         })
        //     },
        //     {
        //         onlyOnce: true,
        //     }
        // )
    }

    watchMySuperior(superior) {
        // if superior is either not in heartbeatRef, or their
        // lastUpdate is greater than a trimmerRemoveRate, remove from treeTrimming list
        this.firebase.onValue(
            this.firebase.child(this.heartbeatRef, superior),
            (snap) => {
                // if the peer's lastUpdate is greater than this.trimmerRemoveRate,
                // or it doesn't exist, remove from treeTrimming list
                if (
                    snap.val() === null ||
                    snap.child('lastUpdate').val() === null ||
                    snap.child('lastUpdate').val() <
                        Date.now() - this.trimmerRemoveRate
                ) {
                    // if not in the heartbeat list or has not been updated for trimmerRemoveRate then remove
                    this.firebase.remove(
                        this.firebase.child(this.treeTrimmingRef, superior)
                    )
                }
            },
            {
                onlyOnce: true,
            }
        )
    }
}
