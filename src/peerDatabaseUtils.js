/**
 *
 * @param {*} database
 * @param {*} callback
 */
export function getPeerList(database, callback, firebase) {
    console.log('getPeerList: ', database)
    firebase.onValue(
        database,
        (ev) => {
            var val = ev.val()
            callback(null, val)
        },
        {
            onlyOnce: true,
        }
    )
}
