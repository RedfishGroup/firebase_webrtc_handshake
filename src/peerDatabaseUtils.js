/**
 *
 * @param {*} database
 * @param {*} callback
 */
export function getPeerList(database, callback) {
    database.once('value', (ev) => {
        var val = ev.val()
        callback(null, val)
    })
}
