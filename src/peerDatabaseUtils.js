import { get } from 'firebase/database'

/**
 *
 * @param {*} database
 * @param {*} callback
 */
export function getPeerList(database, callback) {
    get(database)
        .then((ev) => {
            var val = ev.val()
            callback(null, val)
        })
        .catch((err) => {
            callback(err)
        })
}
