/**
 *
 * @param {*} database
 * @param {*} callback
 */
export function getPeerList(database, callback) {
    database
        .once('value')
        .then((ev) => {
                var val = ev.val()
                callback(null, val)
            })
        .catch((err) => {
            callback(err)        
        })
}
