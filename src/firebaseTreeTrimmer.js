import { child, onValue, orderByValue, query, set } from 'firebase/database'

/**  Description: class for monitoring firebase references
 and removing children that have not updated recently
*/
export class firebaseTreeTrimmer {
    constructor(options = null) {
        if (
            options === null ||
            !options.treeTrimmingRef ||
            !options.peersRef ||
            !options.id
        )
            throw new Error(
                'requires an options object with an id, treeTrimmingRef and peersRef'
            )
        Object.assign(this, options)

        this.monitorReference = this.monitor.bind(this)
        this.monitor()
    }

    monitor() {
        onValue(
            query(this.treeTrimmingRef, orderByValue()),
            (snapshot) => {
                // check if in list
                if (snapshot.child(this.id).val() === null) {
                    // if not add it
                    set(child(snapshot.ref, this.id), Date.now())
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
                setTimeout(this.monitorReference, 60000)
            },
            {
                onlyOnce: true,
            }
        )
    }

    treeTrimmer(treeTrimmers) {
        // remove all references to peers not in treeTrimming list
        onValue(
            this.peersRef,
            (snap) => {
                snap.forEach(function (child) {
                    // if the peer is not in the treeTrimming list,
                    // remove it from peersRef
                    if (treeTrimmers[child.key] === undefined) {
                        remove(child.ref)
                    }
                })
            },
            {
                onlyOnce: true,
            }
        )
    }

    watchMySuperior(superior) {
        // if superior is either not in /peers/cameras, or their
        // lastUpdate is greater than a minute, remove from treeTrimming list
        onValue(
            child(this.peersRef, superior),
            (snap) => {
                // if the peer's lastUpdate is greater than three minutes,
                // or it doesn't exist, remove from treeTrimming list
                if (
                    snap.val() === null ||
                    snap.child('lastUpdate').val() === null ||
                    snap.child('lastUpdate').val() < Date.now() - 3 * 60000
                ) {
                    // if not in the peers list or has not been updated for 3 minutes then remove
                    remove(child(this.treeTrimmingRef, superior))
                }
            },
            {
                onlyOnce: true,
            }
        )
    }
}
