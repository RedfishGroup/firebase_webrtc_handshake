import { onValue } from 'firebase/database'

/**
 *
 * @param {*} database
 * @param {*} callback
 */
export function getPeerList(database, callback) {
    console.log('getPeerList: ', database)
    onValue(
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
