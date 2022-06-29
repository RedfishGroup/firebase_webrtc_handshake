'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var database = require('firebase/database');
require('firebase/app');

class Channel {
    constructor(fbref, peer) {
        this.outRef = database.child(fbref, 'fromServer'); //firebase
        this.inRef = database.child(fbref, 'fromClient');
        this.peer = peer; // simple-peer
    }

    destroy() {
        database.off(this.outRef);
        database.off(this.inRef);
        this.peer.destroy();
    }
}

/**
 * Default equality comparator pass-through, used as the standard `isEqual` creator for
 * use inside the built comparator.
 */
function createDefaultIsNestedEqual(comparator) {
    return function isEqual(a, b, _indexOrKeyA, _indexOrKeyB, _parentA, _parentB, meta) {
        return comparator(a, b, meta);
    };
}
/**
 * Wrap the provided `areItemsEqual` method to manage the circular cache, allowing
 * for circular references to be safely included in the comparison without creating
 * stack overflows.
 */
function createIsCircular(areItemsEqual) {
    return function isCircular(a, b, isEqual, cache) {
        if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
            return areItemsEqual(a, b, isEqual, cache);
        }
        var cachedA = cache.get(a);
        var cachedB = cache.get(b);
        if (cachedA && cachedB) {
            return cachedA === b && cachedB === a;
        }
        cache.set(a, b);
        cache.set(b, a);
        var result = areItemsEqual(a, b, isEqual, cache);
        cache.delete(a);
        cache.delete(b);
        return result;
    };
}
/**
 * Targeted shallow merge of two objects.
 *
 * @NOTE
 * This exists as a tinier compiled version of the `__assign` helper that
 * `tsc` injects in case of `Object.assign` not being present.
 */
function merge(a, b) {
    var merged = {};
    for (var key in a) {
        merged[key] = a[key];
    }
    for (var key in b) {
        merged[key] = b[key];
    }
    return merged;
}
/**
 * Whether the value is a plain object.
 *
 * @NOTE
 * This is a same-realm compariosn only.
 */
function isPlainObject(value) {
    return value.constructor === Object || value.constructor == null;
}
/**
 * When the value is `Promise`-like, aka "then-able".
 */
function isPromiseLike(value) {
    return typeof value.then === 'function';
}
/**
 * Whether the values passed are strictly equal or both NaN.
 */
function sameValueZeroEqual(a, b) {
    return a === b || (a !== a && b !== b);
}

var ARGUMENTS_TAG = '[object Arguments]';
var BOOLEAN_TAG = '[object Boolean]';
var DATE_TAG = '[object Date]';
var REG_EXP_TAG = '[object RegExp]';
var MAP_TAG = '[object Map]';
var NUMBER_TAG = '[object Number]';
var OBJECT_TAG = '[object Object]';
var SET_TAG = '[object Set]';
var STRING_TAG = '[object String]';
var toString = Object.prototype.toString;
function createComparator(_a) {
    var areArraysEqual = _a.areArraysEqual, areDatesEqual = _a.areDatesEqual, areMapsEqual = _a.areMapsEqual, areObjectsEqual = _a.areObjectsEqual, areRegExpsEqual = _a.areRegExpsEqual, areSetsEqual = _a.areSetsEqual, createIsNestedEqual = _a.createIsNestedEqual;
    var isEqual = createIsNestedEqual(comparator);
    /**
     * compare the value of the two objects and return true if they are equivalent in values
     */
    function comparator(a, b, meta) {
        // If the items are strictly equal, no need to do a value comparison.
        if (a === b) {
            return true;
        }
        // If the items are not non-nullish objects, then the only possibility
        // of them being equal but not strictly is if they are both `NaN`. Since
        // `NaN` is uniquely not equal to itself, we can use self-comparison of
        // both objects, which is faster than `isNaN()`.
        if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
            return a !== a && b !== b;
        }
        // Checks are listed in order of commonality of use-case:
        //   1. Common complex object types (plain object, array)
        //   2. Common data values (date, regexp)
        //   3. Less-common complex object types (map, set)
        //   4. Less-common data values (promise, primitive wrappers)
        // Inherently this is both subjective and assumptive, however
        // when reviewing comparable libraries in the wild this order
        // appears to be generally consistent.
        // `isPlainObject` only checks against the object's own realm. Cross-realm
        // comparisons are rare, and will be handled in the ultimate fallback, so
        // we can avoid the `toString.call()` cost unless necessary.
        if (isPlainObject(a) && isPlainObject(b)) {
            return areObjectsEqual(a, b, isEqual, meta);
        }
        // `isArray()` works on subclasses and is cross-realm, so we can again avoid
        // the `toString.call()` cost unless necessary by just checking if either
        // and then both are arrays.
        var aArray = Array.isArray(a);
        var bArray = Array.isArray(b);
        if (aArray || bArray) {
            return aArray === bArray && areArraysEqual(a, b, isEqual, meta);
        }
        // Since this is a custom object, use the classic `toString.call()` to get its
        // type. This is reasonably performant in modern environments like v8 and
        // SpiderMonkey, and allows for cross-realm comparison when other checks like
        // `instanceof` do not.
        var aTag = toString.call(a);
        if (aTag !== toString.call(b)) {
            return false;
        }
        if (aTag === DATE_TAG) {
            // `getTime()` showed better results compared to alternatives like `valueOf()`
            // or the unary `+` operator.
            return areDatesEqual(a, b, isEqual, meta);
        }
        if (aTag === REG_EXP_TAG) {
            return areRegExpsEqual(a, b, isEqual, meta);
        }
        if (aTag === MAP_TAG) {
            return areMapsEqual(a, b, isEqual, meta);
        }
        if (aTag === SET_TAG) {
            return areSetsEqual(a, b, isEqual, meta);
        }
        // If a simple object tag, then we can prioritize a simple object comparison because
        // it is likely a custom class. If an arguments tag, it should be treated as a standard
        // object.
        if (aTag === OBJECT_TAG || aTag === ARGUMENTS_TAG) {
            // The exception for value comparison is `Promise`-like contracts. These should be
            // treated the same as standard `Promise` objects, which means strict equality.
            return isPromiseLike(a) || isPromiseLike(b)
                ? a === b
                : areObjectsEqual(a, b, isEqual, meta);
        }
        // As the penultimate fallback, check if the values passed are primitive wrappers. This
        // is very rare in modern JS, which is why it is deprioritized compared to all other object
        // types.
        if (aTag === BOOLEAN_TAG || aTag === NUMBER_TAG || aTag === STRING_TAG) {
            return sameValueZeroEqual(a.valueOf(), b.valueOf());
        }
        // If not matching any tags that require a specific type of comparison, then use strict
        // equality. This is for a few reasons:
        //   - For types that cannot be introspected (`Promise`, `WeakMap`, etc.), this is the only
        //     comparison that can be made.
        //   - For types that can be introspected, but rarely have requirements to be compared
        //     (`ArrayBuffer`, `DataView`, etc.), the cost is avoided to prioritize the common
        //     use-cases.
        //   - For types that can be introspected, but do not have an objective definition of what
        //     equality is (`Error`, etc.), the subjective decision was to be conservative.
        // In all cases, these decisions should be reevaluated based on changes to the language and
        // common development practices.
        return a === b;
    }
    return comparator;
}

/**
 * Whether the arrays are equal in value.
 */
function areArraysEqual(a, b, isEqual, meta) {
    var index = a.length;
    if (b.length !== index) {
        return false;
    }
    // Decrementing `while` showed faster results than either incrementing or
    // decrementing `for` loop and than an incrementing `while` loop. Declarative
    // methods like `some` / `every` were not used to avoid incurring the garbage
    // cost of anonymous callbacks.
    while (index-- > 0) {
        if (!isEqual(a[index], b[index], index, index, a, b, meta)) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the arrays are equal in value, including circular references.
 */
var areArraysEqualCircular = createIsCircular(areArraysEqual);

/**
 * Whether the dates passed are equal in value.
 *
 * @NOTE
 * This is a standalone function instead of done inline in the comparator
 * to allow for overrides.
 */
function areDatesEqual(a, b) {
    return sameValueZeroEqual(a.valueOf(), b.valueOf());
}

/**
 * Whether the `Map`s are equal in value.
 */
function areMapsEqual(a, b, isEqual, meta) {
    var isValueEqual = a.size === b.size;
    if (!isValueEqual) {
        return false;
    }
    if (!a.size) {
        return true;
    }
    // The use of `forEach()` is to avoid the transpilation cost of `for...of` comparisons, and
    // the inability to control the performance of the resulting code. It also avoids excessive
    // iteration compared to doing comparisons of `keys()` and `values()`. As a result, though,
    // we cannot short-circuit the iterations; bookkeeping must be done to short-circuit the
    // equality checks themselves.
    var matchedIndices = {};
    var indexA = 0;
    a.forEach(function (aValue, aKey) {
        if (!isValueEqual) {
            return;
        }
        var hasMatch = false;
        var matchIndexB = 0;
        b.forEach(function (bValue, bKey) {
            if (!hasMatch &&
                !matchedIndices[matchIndexB] &&
                (hasMatch =
                    isEqual(aKey, bKey, indexA, matchIndexB, a, b, meta) &&
                        isEqual(aValue, bValue, aKey, bKey, a, b, meta))) {
                matchedIndices[matchIndexB] = true;
            }
            matchIndexB++;
        });
        indexA++;
        isValueEqual = hasMatch;
    });
    return isValueEqual;
}
/**
 * Whether the `Map`s are equal in value, including circular references.
 */
var areMapsEqualCircular = createIsCircular(areMapsEqual);

var OWNER = '_owner';
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Whether the objects are equal in value.
 */
function areObjectsEqual(a, b, isEqual, meta) {
    var keysA = Object.keys(a);
    var index = keysA.length;
    if (Object.keys(b).length !== index) {
        return false;
    }
    var key;
    // Decrementing `while` showed faster results than either incrementing or
    // decrementing `for` loop and than an incrementing `while` loop. Declarative
    // methods like `some` / `every` were not used to avoid incurring the garbage
    // cost of anonymous callbacks.
    while (index-- > 0) {
        key = keysA[index];
        if (key === OWNER) {
            var reactElementA = !!a.$$typeof;
            var reactElementB = !!b.$$typeof;
            if ((reactElementA || reactElementB) && reactElementA !== reactElementB) {
                return false;
            }
        }
        if (!hasOwnProperty.call(b, key) ||
            !isEqual(a[key], b[key], key, key, a, b, meta)) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the objects are equal in value, including circular references.
 */
var areObjectsEqualCircular = createIsCircular(areObjectsEqual);

/**
 * Whether the regexps passed are equal in value.
 *
 * @NOTE
 * This is a standalone function instead of done inline in the comparator
 * to allow for overrides. An example of this would be supporting a
 * pre-ES2015 environment where the `flags` property is not available.
 */
function areRegExpsEqual(a, b) {
    return a.source === b.source && a.flags === b.flags;
}

/**
 * Whether the `Set`s are equal in value.
 */
function areSetsEqual(a, b, isEqual, meta) {
    var isValueEqual = a.size === b.size;
    if (!isValueEqual) {
        return false;
    }
    if (!a.size) {
        return true;
    }
    // The use of `forEach()` is to avoid the transpilation cost of `for...of` comparisons, and
    // the inability to control the performance of the resulting code. It also avoids excessive
    // iteration compared to doing comparisons of `keys()` and `values()`. As a result, though,
    // we cannot short-circuit the iterations; bookkeeping must be done to short-circuit the
    // equality checks themselves.
    var matchedIndices = {};
    a.forEach(function (aValue, aKey) {
        if (!isValueEqual) {
            return;
        }
        var hasMatch = false;
        var matchIndex = 0;
        b.forEach(function (bValue, bKey) {
            if (!hasMatch &&
                !matchedIndices[matchIndex] &&
                (hasMatch = isEqual(aValue, bValue, aKey, bKey, a, b, meta))) {
                matchedIndices[matchIndex] = true;
            }
            matchIndex++;
        });
        isValueEqual = hasMatch;
    });
    return isValueEqual;
}
/**
 * Whether the `Set`s are equal in value, including circular references.
 */
var areSetsEqualCircular = createIsCircular(areSetsEqual);

var DEFAULT_CONFIG = Object.freeze({
    areArraysEqual: areArraysEqual,
    areDatesEqual: areDatesEqual,
    areMapsEqual: areMapsEqual,
    areObjectsEqual: areObjectsEqual,
    areRegExpsEqual: areRegExpsEqual,
    areSetsEqual: areSetsEqual,
    createIsNestedEqual: createDefaultIsNestedEqual,
});
var DEFAULT_CIRCULAR_CONFIG = Object.freeze({
    areArraysEqual: areArraysEqualCircular,
    areDatesEqual: areDatesEqual,
    areMapsEqual: areMapsEqualCircular,
    areObjectsEqual: areObjectsEqualCircular,
    areRegExpsEqual: areRegExpsEqual,
    areSetsEqual: areSetsEqualCircular,
    createIsNestedEqual: createDefaultIsNestedEqual,
});
var isDeepEqual = createComparator(DEFAULT_CONFIG);
/**
 * Whether the items passed are deeply-equal in value.
 */
function deepEqual(a, b) {
    return isDeepEqual(a, b, undefined);
}
createComparator(merge(DEFAULT_CONFIG, { createIsNestedEqual: function () { return sameValueZeroEqual; } }));
createComparator(DEFAULT_CIRCULAR_CONFIG);
createComparator(merge(DEFAULT_CIRCULAR_CONFIG, {
    createIsNestedEqual: function () { return sameValueZeroEqual; },
}));

var settings = {
    // Get a reference to the database service

    // Was having a bug where the WIFI router would crash if the chunk size was bigger than 2^10
    CHUNK_SIZE: Math.pow(2, 14), // size in bytes of the chunks. 2^14 is just under the limit in chrome.
    ICE_SERVERS: [
        {
            url: 'stun:23.21.150.121',
            urls: 'stun:23.21.150.121',
        },
        {
            url: 'turn:global.turn.twilio.com:3478?transport=udp',
            username:
                '508d1e639868dc17f5da97a75b1d3b43bf2fc6d11e4e863678501db568b5665c',
            credential: 'W5GTdhQQ6DqOD7k6bS8+xZVNQXm+fgLXSEQpN8bTe70=',
            urls: 'turn:global.turn.twilio.com:3478?transport=udp',
        },
    ],
    POLLING_FREQUENCY: 15000,
    debug: false,
};

/**
 * Evented
 */

class Evented {
    constructor() {
        this.events = {};
    }

    on(eventName, callback) {
        if (typeof callback !== 'function') return
        if (!this.events.hasOwnProperty(eventName)) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    off(eventName, callback) {
        if (this.events.hasOwnProperty(eventName)) {
            if (typeof callback === 'function') {
                //_.without(this.events[eventName], callback);
                this.events = this.events.filter(function (x) {
                    if (x != this.events[eventName]) {
                        return x
                    }
                });
            } else {
                delete this.events[eventName];
            }
        }
    }

    fire(eventName, argument) {
        //_.each(this.events[eventName], (cb) => setTimeout(() => cb(argument)));
        if (this.events[eventName]) {
            for (var cb of this.events[eventName]) {
                setTimeout(() => cb(argument));
            }
        }
    }

    fireAll(argument) {
        for (var k in this.events) {
            this.fire(k, argument);
        }
    }
}

function getDatabase() {

    {
        throw new Error(
            `init must be called before accessing database.  no firebase`
        )
    }
}

/**
 *
 * @param {*} database
 * @param {*} callback
 */
function getPeerList(database$1, callback) {
    console.log('getPeerList: ', database$1);
    database.onValue(
        database$1,
        (ev) => {
            var val = ev.val();
            callback(null, val);
        },
        {
            onlyOnce: true,
        }
    );
}

/**  Description: class for monitoring firebase references
 and removing children that have not updated recently
*/
class firebaseTreeTrimmer {
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
        Object.assign(this, options);

        this.monitorReference = this.monitor.bind(this);
        this.monitor();
    }

    monitor() {
        database.onValue(
            database.query(this.treeTrimmingRef, database.orderByValue()),
            (snapshot) => {
                // check if in list
                if (snapshot.child(this.id).val() === null) {
                    // if not add it
                    database.set(database.child(snapshot.ref, this.id), Date.now());
                } else {
                    // otherwise calculate hierachy
                    let children = {};
                    let rank = 0,
                        superior;
                    snapshot.forEach(function (child) {
                        children[child.key] = { rank, superior };
                        superior = child.key;
                        rank++;
                    });

                    let me = children[this.id];
                    this.rank = me.rank;
                    this.superior = me.superior;

                    console.log(
                        'Treetrimmer rank: ',
                        me.rank,
                        ' superior id: ',
                        me.superior
                    );

                    if (me.rank === 0) {
                        this.treeTrimmer(children);
                    } else {
                        this.watchMySuperior(me.superior);
                    }
                }

                // continuously check for treeTrimming, every minute
                setTimeout(this.monitorReference, 60000);
            },
            {
                onlyOnce: true,
            }
        );
    }

    treeTrimmer(treeTrimmers) {
        // remove all references to peers not in treeTrimming list
        database.onValue(
            this.peersRef,
            (snap) => {
                snap.forEach(function (child) {
                    // if the peer is not in the treeTrimming list,
                    // remove it from peersRef
                    if (treeTrimmers[child.key] === undefined) {
                        database.remove(child.ref);
                    }
                });
            },
            {
                onlyOnce: true,
            }
        );
    }

    watchMySuperior(superior) {
        // if superior is either not in /peers/cameras, or their
        // lastUpdate is greater than a minute, remove from treeTrimming list
        database.onValue(
            database.child(this.peersRef, superior),
            (snap) => {
                // if the peer's lastUpdate is greater than three minutes,
                // or it doesn't exist, remove from treeTrimming list
                if (
                    snap.val() === null ||
                    snap.child('lastUpdate').val() === null ||
                    snap.child('lastUpdate').val() < Date.now() - 3 * 60000
                ) {
                    // if not in the peers list or has not been updated for 3 minutes then remove
                    database.remove(database.child(this.treeTrimmingRef, superior));
                }
            },
            {
                onlyOnce: true,
            }
        );
    }
}

function P2PServerFactory(options) {
    const { PeerBinary } = options;

    return class P2PServer extends Evented {
        constructor(options = {}, initialPeerInfo = {}) {
            super(); //no idea what this does
            console.assert(
                options.iceServers,
                'Server: no ice servers yet. Using defaults'
            );
            this.MAX_CONNECTIONS = 50;
            this.isListening = false;

            this.id = 'server_' + Math.floor(Math.random() * 100000);
            this.myID = this.id;
            this.peerID = this.id;

            this.stream = undefined;
            this.iceServers =
                options.iceServers ||
                options.ICE_SERVERS ||
                settings.ICE_SERVERS;
            this.POLLING_FREQUENCY =
                options.POLLING_FREQUENCY || settings.POLLING_FREQUENCY;

            let combinedSettings = { ...settings, ...options };
            if (combinedSettings.debug)
                console.log('settings: ', {
                    settings,
                    options,
                    combinedSettings,
                });
            Object.assign(this, combinedSettings);

            this.database = options.database || getDatabase();
            console.log('Database: ', this.database);

            this.debug = !!options.debug;
            this.initialPeerInfo = initialPeerInfo;
            this.initialPeerInfo.id = this.id;

            if (this.debug) console.log(this.id);
            if (!options.dontCallInitYet) {
                this.init();
            }

            this._peerInfo = null;
        }

        init() {
            var fbref = this.database;

            // the below assumes that tree trimming would happen at the same lavel as the peers ref or would be passed explicitly
            this.treeTrimmer = new firebaseTreeTrimmer({
                peersRef: this.database,
                treeTrimmingRef:
                    this.treeTrimmingRef ||
                    database.child(this.database.parent, 'treeTrimming'),
                id: this.id,
            });

            this.userRef = database.child(fbref, this.id);

            if (this.debug)
                console.log('userRef: ' + this.userRef, this.initialPeerInfo);

            database.onValue(this.userRef, (snapshot) => {
                // handle being tree trimmed while asleep
                let newPeerInfo = snapshot.val();
                if (
                    newPeerInfo &&
                    newPeerInfo.id &&
                    !deepEqual(
                        { ...this._peerInfo, lastUpdate: null },
                        { ...newPeerInfo, lastUpdate: null }
                    )
                ) {
                    this._peerInfo = newPeerInfo;
                } else if (
                    this._peerInfo &&
                    this._peerInfo.id &&
                    !(newPeerInfo && newPeerInfo.id)
                ) {
                    console.log(
                        'peerInfo lost, updating with saved version: ',
                        this._peerInfo,
                        newPeerInfo
                    );
                    database.update(this.userRef, {
                        ...this._peerInfo,
                        lastUpdate: database.serverTimestamp(),
                    });
                } else if (this._peerInfo) ; else {
                    console.warn(
                        'Appears we have not yet set peerInfo: ',
                        this._peerInfo,
                        newPeerInfo
                    );
                }
            });

            database.onDisconnect(this.userRef).remove();

            if (this.initialPeerInfo) {
                if (this.debug)
                    console.log(
                        'UserRef: ' + this.userRef,
                        this.initialPeerInfo
                    );
                database.update(this.userRef, this.initialPeerInfo)
                    .then(() => {
                        console.log('update finished');
                    })
                    .catch((e) => {
                        console.log('problem: ', e);
                    });
            }

            this.updateRef = database.child(this.userRef, 'lastUpdate');
            database.set(this.updateRef, database.serverTimestamp());

            this.channelRef = database.child(this.userRef, 'channels');
            if (this.stream) {
                database.set(database.child(this.userRef, 'isStream'), true);
            }
            database.set(this.channelRef, []);

            this.connections = [];
            this._intervalID = setInterval(() => {
                this.fire('updateTimeStamp', undefined);
                this._updateOnFireBase();
            }, this.POLLING_FREQUENCY);

            this.listenToChannels();
            this.isListening = true;
            this.fire('init', undefined);
        }

        _updateOnFireBase() {
            // one may want to overwrite this
            database.set(this.updateRef, database.serverTimestamp());
        }

        sendToAll(data) {
            for (var conx of this.connections) {
                if (conx && conx.peer) {
                    try {
                        conx.peer.send.bind(conx.peer)(data);
                    } catch (err) {
                        console.error(
                            err,
                            'Got an error, interrupted connection? '
                        );
                    }
                }
            }
        }

        sendToAllBig(data) {
            for (var conx of this.connections) {
                if (conx && conx.peer) {
                    try {
                        conx.peer.sendBig.bind(conx.peer)(data);
                    } catch (err) {
                        console.error(
                            err,
                            'Got an error, interrupted connection? '
                        );
                    }
                }
            }
        }

        listenToChannels() {
            // disabling no-loop-func because these loops are correct usage
            // https://eslint.org/docs/rules/no-loop-func
            // when a new channel is added, listen to it.
            database.onChildAdded(this.channelRef, (ev) => {
                if (this.connections.length > this.MAX_CONNECTIONS) {
                    console.error(
                        'Too many connections. TODO:close/remove old stale connections'
                    );
                    return
                }
                var val = ev.val();
                if (this.debug) {
                    console.log(val, 'new child');
                }
                for (var i in val.fromClient) {
                    var sig = val.fromClient[i];
                    if (this.debug) console.log({ sig });
                    if (sig.type === 'offer') {
                        var mykey = ev.key;
                        var { myID } = sig;
                        var channel = new Channel(
                            database.child(this.channelRef, mykey),
                            this._makePeer(myID)
                        );
                        this.connections = [...this.connections, channel];
                        this.fire('addConnection', channel);

                        // on message through webRTC (simple-peer)
                        var answerSentYet = false;
                        channel.peer.on('signal', (data) => {
                            if (data.type === 'answer') {
                                if (answerSentYet) {
                                    console.warn(
                                        'Why am i trying to send multiple answers'
                                    );
                                }
                                database.push(channel.outRef, data);
                                answerSentYet = true;
                            } else if (data.candidate) {
                                database.push(channel.outRef, data);
                            } else {
                                console.warn(
                                    data,
                                    'unexpected message from WebRTC'
                                );
                            }
                        });

                        // on message through firebase
                        database.onChildAdded(channel.inRef, (ev2) => {
                            var val2 = ev2.val();
                            if (this.debug) {
                                console.log(val2, 'child_added -- firebase');
                            }
                            if (val2.candidate) {
                                if (this.debug) {
                                    console.log(
                                        val2,
                                        'server got candidate from firebase'
                                    );
                                }
                                channel.peer.signal(val2);
                            } else if (val2.type === 'offer') {
                                channel.peer.signal(val2);
                            } else if (val2.type === 'answer') ; else {
                                console.warn(
                                    val2,
                                    'unexpected message from Firebase'
                                );
                            }
                        });
                    }
                }
            });
        }

        _makePeer(peerID) {
            if (this.debug)
                console.log('_makePeer called with peerID: ', peerID);
            this.fire('makePeer', undefined);
            var myoptions = {
                initiator: false,
                trickle: true,
                config: {
                    iceServers: this.iceServers,
                },
                peerID,
            };
            if (this.stream) myoptions.stream = this.stream;
            if (this.PER_CHUNK_WAIT !== undefined)
                myoptions.PER_CHUNK_WAIT = this.PER_CHUNK_WAIT;
            var p = new PeerBinary(myoptions);

            // fire events
            p.on('error', (err) => {
                console.error('server: error', err);
                this.fire('error', { peer: p, err: err });
            });
            p.on('connect', () => {
                if (this.debug) console.log('server: client connected');
                this.fire('connect', { peer: p });
            });
            p.on('data', (data) => {
                if (this.debug)
                    console.log('server: server recieved some data: ', data);
                this.fire('data', { peer: p, data: data });
            });
            p.on('close', () => {
                if (this.debug) console.log('server: connection closed', p);
                this._removeConnection(p);
                this.fire('close', { peer: p });
            });
            p.on('dataBig', (data) => {
                if (data && data.type === 'ack') {
                    p.sendBig({
                        type: 'ackack',
                        data: {
                            ack: { ...data.data },
                            ackack: {
                                id: this.id,
                                numConnections: this.connections.length,
                                treeTrimmer: {
                                    rank: this.treeTrimmer.rank,
                                    superior: this.treeTrimmer.superior,
                                },
                                peerID,
                                date: new Date().getTime(),
                            },
                        },
                    });
                }
                this.fire('dataBig', { peer: p, data: data });
            });

            p.on('stream', (stream) => {
                if (this.debug)
                    console.log('Server: connected to stream', stream);
                this.fire('stream', { peer: p, stream: stream });
            });

            p.on('signal', (data) => {
                if (this.debug) console.log('Server: received signal', data);
                this.fire('signal', data);
            });

            //TODO make it so server can register events that will get called on each individual connection
            return p
        }

        getPeerList(callback) {
            return getPeerList(this.database, callback)
        }

        destroy() {
            database.remove(this.channelRef);
            database.remove(this.updateRef);
            database.off(this.channelRef);
            database.off(this.updateRef);
            database.off(this.userRef);

            this.isListening = false;
            for (var x of this.connections) {
                x.destroy();
            }
            this.fire('destroyed', {});
            this.connections = [];
            clearInterval(this._intervalID);
        }

        _removeConnection(peer) {
            var index = -1;
            for (var i = 0; i < this.connections.length; i++) {
                var conn = this.connections[i];
                if (conn.peer == peer) {
                    if (this.debug) console.log('found my connection', i, conn);
                    index = i;
                }
            }
            if (index >= 0) {
                var conn = this.connections[index];
                conn.destroy();

                //remove from list of connections and create new list of connections
                this.connections = [
                    ...this.connections.slice(0, index),
                    ...this.connections.slice(index + 1),
                ];

                this.fire('removeConnection', conn);
                if (this.debug) console.log(this.connections);
            }
        }
    }
}

function P2PClientFactory(options) {
    const { PeerBinary } = options;

    return class P2PClient extends Evented {
        constructor(options = {}) {
            super();

            this.id = 'client_' + Math.floor(Math.random() * 100000);
            this.myID = this.id;
            this.peerID = this.id;

            this.ackID = 0;
            this.ackCallbacks = {};

            this.requestID = 0;
            this.requestCallbacks = {};

            let combinedSettings = { ...settings, ...options };
            if (combinedSettings.debug)
                console.log('settings: ', {
                    settings,
                    options,
                    combinedSettings,
                });
            Object.assign(this, combinedSettings);

            this.iceServers =
                options.iceServers ||
                options.ICE_SERVERS ||
                settings.ICE_SERVERS;

            if (options.database) {
                this.database = options.database;
            } else {
                this.database = getDatabase();
            }

            this.connection = null;
            this.channelRef = null;
            this.stream = undefined;
            this.isStream =
                typeof options.isStream === 'boolean' ? options.isStream : true;
            this.connectionCallbacks = [];
            this.lastNegotiationState = undefined;
            this.debug = !!options.debug;

            this.PER_CHUNK_WAIT = options.PER_CHUNK_WAIT;
        }

        getPeerList(callback) {
            if (this.debug) console.log('Database: ', this.database);
            return getPeerList(this.database, callback)
        }

        ackCallback(ackID, data) {
            if (this.debug) console.log('ackCallback: ', { ackID, data });
            let { callback, timeoutID } = this.ackCallbacks[ackID] || {};
            if (callback) {
                clearTimeout(timeoutID);
                callback(data);
                delete this.ackCallbacks[ackID];
            } else {
                console.warn('Got ackID without a callback registered.', data);
            }
        }

        sendAck(message, callback = () => {}, timeout = 30000) {
            if (!this.connection) {
                console.warn('no connection');
                return
            }

            this.ackID += 1;
            let ackID = this.ackID;

            let timeoutID = setTimeout(() => {
                this.ackCallback(ackID, { error: 'timeout' });
            }, timeout);

            this.ackCallbacks[ackID] = { callback, timeoutID };

            return this.connection.sendBig({
                type: 'ack',
                data: {
                    ackID: this.ackID,
                    peerID: this.serverID,
                    startDate: new Date().getTime(),
                    message,
                },
            })
        }

        requestCallback(requestID, data) {
            if (this.debug) console.log('requestCallback: ', { requestID, data });
            let { callback, timeoutID } = this.requestCallbacks[requestID] || {};

            if (callback) {
                clearTimeout(timeoutID);
                callback(data);
                delete this.requestCallbacks[requestID];
            } else {
                console.warn(
                    'Got requestID without a callback registered.',
                    data
                );
            }
        }

        sendRequest(request, callback = () => {}, timeout = 30000) {
            if (!this.connection) {
                console.warn('no connection');
                return
            }

            this.requestID += 1;
            let requestID = this.requestID;

            let timeoutID = setTimeout(() => {
                this.requestCallback(requestID, { error: 'timeout' });
            }, timeout);

            this.requestCallbacks[requestID] = { callback, timeoutID };

            request.requestID = requestID;
            if (this.debug) console.log('sending request: ', request);

            return this.connection.sendBig(request)
        }

        connectToPeerID(id, callback = () => {}) {
            this.connectionCallbacks.push(callback);
            this.serverID = id;
            this.getPeerList((err, peerList) => {
                if (err) {
                    console.error(err);
                    this._notifyCallbacks(
                        `Got error requesting peer list:${err}`
                    );
                    return
                }
                var peer = peerList[id];
                if (!peer) {
                    console.error('peer not defined. id:', id);
                    this._notifyCallbacks('peer not defined');
                } else {
                    this.id = id;
                    this.serverRef = database.child(this.database, id);
                    database.onValue(
                        this.serverRef,
                        (ev1) => {
                            ev1.val();
                            let pOpts = {
                                initiator: true,
                                trickle: true,
                                config: {
                                    iceServers: this.iceServers,
                                },
                                peerID: id,
                            };

                            if (this.isStream) {
                                pOpts.stream = this.getMyStream();
                            }

                            if (
                                this.PER_CHUNK_WAIT ||
                                this.PER_CHUNK_WAIT === 0
                            ) {
                                pOpts.PER_CHUNK_WAIT = this.PER_CHUNK_WAIT;
                            }

                            var p = new PeerBinary(pOpts);
                            this.connection = p;
                            this._registerEvents();
                            p.on('signal', (data) => {
                                if (data.type == 'offer') {
                                    this._createChannel(data);
                                } else if (data.candidate) {
                                    if (this.debug) {
                                        console.log(
                                            'client recieved candidate from webrtc',
                                            data
                                        );
                                    }
                                    database.push(this.outRef, data);
                                } else {
                                    console.warn(
                                        'Client recieved unexpected signal through WebRTC:',
                                        data
                                    );
                                }
                            });
                        },
                        {
                            onlyOnce: true,
                        }
                    );
                }
            });
        }

        getMyStream() {
            if (this.stream) return this.stream

            // create fake stream if no stream specified, and the server is in streaming mode.
            //    because, at the moment, simple-peer must have a stream from the initiator.
            let fakeCanvas = document.createElement('canvas');
            fakeCanvas.width = fakeCanvas.height = 1;
            var fakeStream = fakeCanvas.captureStream();
            return fakeStream
        }

        disconnect(callback) {
            callback =
                callback ||
                function () {
                    console.log('client disconnected from server', arguments);
                };

            if (this.serverRef) {
                database.off(this.serverRef);
            }
            if (this.outRef) {
                database.off(this.outRef);
            }
            if (this.inRef) {
                database.off(this.inRef);
            }
            if (this.connection) {
                this.connection.destroy(callback);
            } else {
                callback();
            }
            // QUESTION: should I also disconnect from the listeners to the events emitted by this class?
            //     it would be this.off()
        }

        _createChannel(offer) {
            offer.peerID = this.peerID;
            offer.myID = this.myID;
            if (this.debug)
                console.log('Got create channel with offer: ', offer);
            this.channelRef = database.push(database.child(this.serverRef, 'channels'), {
                fromClient: [offer],
            });
            this.outRef = database.child(this.channelRef, 'fromClient');
            this.inRef = database.child(this.channelRef, 'fromServer');
            database.onChildAdded(this.inRef, (ev) => {
                var val = ev.val();
                if (this.debug) console.log(val, 'channel message, client');
                if (val.type === 'answer') {
                    setTimeout(() => {
                        let state =
                            this.connection &&
                            this.connection._pc &&
                            this.connection._pc.signalingState;
                        if (state == this.lastNegotiationState) {
                            if (this.debug)
                                console.log(
                                    'signalstate. skip nested negotiations'
                                );
                            return
                        }
                        if (this.debug) console.log('signal start negotiation');
                        this.lastNegotiationState = state;
                        if (this.debug) console.log('answer', this);
                        if (!this.connection.destroyed)
                            this.connection.signal(val);
                    }, 50); // a slight delay helps establish connection, I think.
                } else if (val.candidate) {
                    if (this.debug)
                        console.log('client recieved candidate from firebase');
                    setTimeout(() => {
                        if (!this.connection.destroyed)
                            this.connection.signal(val);
                    }, 50);
                } else {
                    console.warn(
                        val,
                        'Client recieved unexpected signal through Firebase'
                    );
                }
            });
        }

        _notifyCallbacks(err, connection) {
            try {
                for (var callback of this.connectionCallbacks) {
                    callback(err, connection);
                }
                this.connectionCallbacks = [];
            } catch (err) {
                console.warn(err);
            }
        }

        _registerEvents() {
            // fire events
            this.connection.on('error', (err) => {
                console.error('client: error', err);
                this.fire('error', { peer: this.connection, err: err });
            });
            this.connection.on('connect', () => {
                if (this.debug) console.log('client: client connected');
                this._notifyCallbacks(null, this.connection);
                this.fire('connect', { peer: this.connection });
            });
            this.connection.on('data', (data) => {
                if (this.debug)
                    console.log('client: recieved some data: ', data);
                this.fire('data', { peer: this.connection, data: data });
            });
            this.connection.on('close', (data) => {
                if (this.debug)
                    console.log('connection closed', this.connection);
                this.fire('close', { peer: this.connection });
            });
            this.connection.on('dataBig', (data) => {
                if (data && data.type === 'ackack') {
                    let { ackID } = data.data.ack;
                    this.ackCallback(ackID, data);
                } else {
                    // console.log('~~~ DataBig ~~~~')
                    // console.log(data)
                    let { requestID } = data || {};
                    if (requestID) {
                        this.requestCallback(requestID, data);
                    }
                    // console.log('~~~~~~~~~~~~~~~~')
                    this.fire('dataBig', { peer: this.connection, data: data });
                }
            });
            this.connection.on('stream', (stream) => {
                if (this.debug)
                    console.log('Client: connected to stream', stream);
                this.fire('stream', { peer: this.connection, stream: stream });
            });
            this.connection._pc.addEventListener('signalingstatechange', () => {
                if (this.debug) console.log(
                    'signalState',
                    this.connection &&
                        this.connection._pc &&
                        this.connection._pc.signalingState
                );
            });
        }
    }
}

var encode$1; //encode method dependency injection
function setEncode(newEncode) {
    encode$1 = newEncode;
}

var drawingCanvas; // this is a canvas used by imageToBlob

const MAX_RECURSIVE_DEPTH = 10;
//
// @param  {Function} callback []
//
async function generateWebRTCpayload(obj) {
    // let rand = Math.random()
    // console.time(`generateWebRTCpayload-${rand}`)
    // console.time(`recursivelyEncodeBlobs-${rand}`)
    let deBlobbed = await recursivelyEncodeBlobs(obj);
    // console.timeEnd(`recursivelyEncodeBlobs-${rand}`)
    let result = _generateWebRTCpayload(deBlobbed);
    // console.timeEnd(`generateWebRTCpayload-${rand}`)
    return result
}

function deBlob(obj) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.addEventListener('loadend', function () {
            const view = new Int8Array(reader.result);
            let descript = { isBlob: true, type: obj.type };
            if (obj.lastModified) descript.lastModified = obj.lastModified;
            if (obj.name) descript.name = obj.name;
            if (obj.size) descript.size = obj.size;
            if (obj.exif) descript.exif = obj.exif;
            descript.view = view;
            resolve(descript);
        });
        reader.readAsArrayBuffer(obj);
    })
}

async function recursivelyEncodeBlobs(obj, depth = 0) {
    if (depth > MAX_RECURSIVE_DEPTH) {
        throw (depth)
    }

    if (obj === undefined) return obj

    if (
        (typeof File !== 'undefined' && obj.constructor == File) ||
        (typeof Blob !== 'undefined' && obj.constructor == Blob)
    ) {
        return await deBlob(obj)
    } else if (obj.constructor == Object) {
        let res = {};
        for (var i in obj) {
            if (obj[i] !== undefined) {
                res[i] = await recursivelyEncodeBlobs(obj[i], depth + 1);
            }
        }
        return res
    }
    return obj
}

async function recursivelyDecodeBlobs(obj, depth = 0) {
    if (depth > MAX_RECURSIVE_DEPTH) {
        throw (depth)
    }

    if (obj.constructor == Object && obj.type && obj.isBlob) {
        let descript = {};
        for (var i in obj) {
            if (i !== 'view' && i !== 'chunks') {
                descript[i] = obj[i];
            }
        }
        if (typeof Blob !== 'undefined') {
            return new Blob([obj.view], descript)
        } else {
            return { view: obj.view, descript }
        }
    } else if (obj.constructor == Object) {
        let res = {};
        for (var i in obj) {
            res[i] = await recursivelyDecodeBlobs(obj[i], depth + 1);
        }
        return res
    }

    return obj
}

async function _generateWebRTCpayload(obj, headerOpt = {}) {
    // let rand = Math.random()
    // console.time(`_generateWebRTCpayload-${rand}`)
    let bin = encode$1(obj);
    // console.log({ bin, obj })
    var header = Object.assign(
        {
            iAmAHeader: true,
            payloadID: Math.floor(Math.random() * 100000000),
        },
        headerOpt
    );
    var chunks = arrayBufferToChunks(bin, header.payloadID);
    header.chunkCount = chunks.length;
    // console.timeEnd(`_generateWebRTCpayload-${rand}`)

    let encodedHeader = encode$1(header);
    // console.log(encodedHeader, header)
    return { header: encodedHeader, chunks: chunks }
}

function arrayBufferToChunks(buff, payloadID) {
    // let rand = Math.random()

    // console.time(`chunks-${rand}`)
    var result = [];
    var wholeshebang = new Uint8Array(buff);
    var count = 0;
    payloadID = payloadID || Math.floor(Math.random() * 100000000);
    for (var i = 0; i < buff.byteLength; i += settings.CHUNK_SIZE) {
        var chunksize = Math.min(buff.byteLength - i, settings.CHUNK_SIZE);
        var chunk = wholeshebang.slice(i, i + chunksize);
        var id = count;
        let chbin = encode$1({ payloadID: payloadID, id: id, chunk: chunk });
        result.push(chbin);
        count++;
    }

    // console.log(buff, result)

    // console.timeEnd(`chunks-${rand}`)
    //console.log(`generated ${count} chunks`)
    return result
}

function imageToBlob(img, cb) {
    if (!drawingCanvas) {
        drawingCanvas = document.createElement('canvas');
    }
    drawingCanvas.width = img.width;
    drawingCanvas.height = img.height;
    drawingCanvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    drawingCanvas.toBlob(function (blob) {
        cb(blob);
    });
}

//
// Takes a bunch of possibly out of order chunks and assembles them into one
//
function UnChunkerFactory(options = {}) {
    const decode =
        options.decode ||
        function decode(data) {
            return data
        };

    return class UnChunker {
        constructor(opts = {}) {
            this.payloads = {};
            this.payloadCount = 0;
            this.onData = function (val) {
                console.log('default, data is ready:', val);
            };
        }

        registerChunk(msg) {
            var header = this.parseHeader(msg);
            if (header) {
                this._newPayload(header.payloadID, header);
            } else if (this._isChunk(msg)) {
                //the msg is a chunk hopefully
                try {
                    let val = decode(msg);
                    this._appendToPayload(val);
                    if (this._isPayloadReady(val.payloadID)) {
                        this._assembleChunks(val.payloadID, (result) => {
                            this.onData(result);
                            return result
                        });
                    }
                } catch (err) {
                    console.error(err);
                    console.error('val:', msg);
                }
            } else {
                console.warn('not my type', decode(msg));
            }
            return null
        }

        _newPayload(id, header) {
            this.payloads[id] = Object.assign(header, {
                count: header.chunkCount,
                chunks: [],
                lastUpdate: new Date(),
            });
            this.payloadCount++;
        }

        _appendToPayload(chunk) {
            var pl = this.payloads[chunk.payloadID];
            pl.lastUpdate = new Date();
            pl.chunks.push(chunk);
        }

        async _assembleChunks(payloadID, cb) {
            var pl = this.payloads[payloadID];
            pl.chunks.sort(function (a, b) {
                return Number(a.id) - Number(b.id)
            });
            var totalSize = 0;
            for (var i = 0; i < pl.chunks.length; i++) {
                totalSize += pl.chunks[i].chunk.length;
            }
            var result = new Uint8Array(totalSize);
            var position = 0;
            for (var i = 0; i < pl.chunks.length; i++) {
                var ch = pl.chunks[i];
                result.set(ch.chunk, position);
                position += ch.chunk.length;
            }
            try {
                let val1 = decode(result);
                let val2 = await recursivelyDecodeBlobs(val1);
                cb(val2);
                this._removePayload(payloadID);
            } catch (err) {
                console.error(err);
                console.error('buffer', result);
            }
        }

        _removePayload(id) {
            delete this.payloads[id];
            this.payloadCount--;
        }

        parseHeader(data) {
            if (typeof data == 'object' && !(data instanceof Uint8Array)) {
                if (data.chunkCount && data.chunkCount > 0) {
                    return data
                }
            } else if (data.length && data.length < 4000) {
                // might have been packed or something.
                try {
                    var json = decode(data);
                    if (json) {
                        try {
                            if (json && json.iAmAHeader) {
                                return json
                            }
                        } catch (er) {
                            // probably not a header. Not a big deal
                        }
                    }
                } catch (er) {
                    console.warn(er);
                }
            }
            return undefined
        }

        _isChunk(msg) {
            if (this.payloadCount <= 0) {
                return false
            }
            return msg instanceof Uint8Array || msg instanceof DataView
        }

        _isPayloadReady(id) {
            var pl = this.payloads[id];
            if (pl.chunks.length == pl.count) {
                return true
            }
            return false
        }
    }
}

async function sleep(milliseconds) {
    // console.log(`sleep: ${milliseconds}`)
    // console.time('sleep')
    await new Promise((resolve) => setTimeout(resolve, milliseconds));
    // console.timeEnd('sleep')

    return
}

function PeerBinaryFactory(options) {
    const { UnChunker, Peer, wrtc } = options; // dependency injection
    if (typeof window !== 'undefined') window.simplePeer = Peer;

    return class PeerBinary extends Peer {
        constructor(options) {
            super({ wrtc, ...options });
            this.PER_CHUNK_WAIT =
                options.PER_CHUNK_WAIT !== undefined
                    ? options.PER_CHUNK_WAIT
                    : 0;
            this._registerDataMessage();
            this.unchunker = new UnChunker();
            this.unchunker.onData = (val) => {
                this.emit('dataBig', val);
            };
            this.peerID = options.peerID;
        }

        //want to overide these 2 functions I think.
        _registerDataMessage() {
            this.on('data', (data) => {
                //when its done with a complete chunk, call this.emit('dataBig', completed)
                this.unchunker.registerChunk(data);
            });
        }

        async sendBig(chunk) {
            // let rand = Math.random()
            // console.time(`sendBig-${rand}`)
            console.log(`PER_CHUNK_WAIT: ${this.PER_CHUNK_WAIT}`);
            try {
                let stuff = await generateWebRTCpayload(chunk);
                await this.send(stuff.header);
                for (var i in stuff.chunks) {
                    var ch = stuff.chunks[i];
                    await this.send(ch);
                    if (this.PER_CHUNK_WAIT) {
                        await sleep(this.PER_CHUNK_WAIT); //give the other side time to handle message
                    }
                }
            } catch (error) {
                console.error('GOT AN ERROR: ', error);
            }
            // console.timeEnd(`sendBig-${rand}`)
        }
    }
}

const Peer = require('simple-peer');
const wrtc = require('wrtc');

// import adapter from "webrtc-adapter/src/js/adapter_core.js";
const { decode, encode } = require('msgpack-lite');

const firebase = require('firebase/app');
require('firebase/database');

// initFirebase(firebase)
setEncode(encode);

const UnChunker = UnChunkerFactory({ decode });
const PeerBinary = PeerBinaryFactory({ UnChunker, Peer, wrtc });
const P2PServer = P2PServerFactory({ PeerBinary });
const P2PClient = P2PClientFactory({ PeerBinary });

exports.Channel = Channel;
exports.P2PClient = P2PClient;
exports.P2PServer = P2PServer;
exports.PeerBinary = PeerBinary;
exports.UnChunker = UnChunker;
exports.arrayBufferToChunks = arrayBufferToChunks;
exports.firebase = firebase;
exports.generateWebRTCpayload = generateWebRTCpayload;
exports.imageToBlob = imageToBlob;
exports.recursivelyDecodeBlobs = recursivelyDecodeBlobs;
exports.recursivelyEncodeBlobs = recursivelyEncodeBlobs;
//# sourceMappingURL=build.full.cjs.map
