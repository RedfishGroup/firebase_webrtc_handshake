var getOwnPropertyNames = Object.getOwnPropertyNames, getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Combine two comparators into a single comparators.
 */
function combineComparators(comparatorA, comparatorB) {
    return function isEqual(a, b, state) {
        return comparatorA(a, b, state) && comparatorB(a, b, state);
    };
}
/**
 * Wrap the provided `areItemsEqual` method to manage the circular state, allowing
 * for circular references to be safely included in the comparison without creating
 * stack overflows.
 */
function createIsCircular(areItemsEqual) {
    return function isCircular(a, b, state) {
        if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
            return areItemsEqual(a, b, state);
        }
        var cache = state.cache;
        var cachedA = cache.get(a);
        var cachedB = cache.get(b);
        if (cachedA && cachedB) {
            return cachedA === b && cachedB === a;
        }
        cache.set(a, b);
        cache.set(b, a);
        var result = areItemsEqual(a, b, state);
        cache.delete(a);
        cache.delete(b);
        return result;
    };
}
/**
 * Get the properties to strictly examine, which include both own properties that are
 * not enumerable and symbol properties.
 */
function getStrictProperties(object) {
    return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
}
/**
 * Whether the object contains the property passed as an own property.
 */
var hasOwn = Object.hasOwn ||
    (function (object, property) {
        return hasOwnProperty.call(object, property);
    });
/**
 * Whether the values passed are strictly equal or both NaN.
 */
function sameValueZeroEqual(a, b) {
    return a || b ? a === b : a === b || (a !== a && b !== b);
}

var OWNER = '_owner';
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, keys$1 = Object.keys;
/**
 * Whether the arrays are equal in value.
 */
function areArraysEqual(a, b, state) {
    var index = a.length;
    if (b.length !== index) {
        return false;
    }
    while (index-- > 0) {
        if (!state.equals(a[index], b[index], index, index, a, b, state)) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the dates passed are equal in value.
 */
function areDatesEqual(a, b) {
    return sameValueZeroEqual(a.getTime(), b.getTime());
}
/**
 * Whether the `Map`s are equal in value.
 */
function areMapsEqual(a, b, state) {
    if (a.size !== b.size) {
        return false;
    }
    var matchedIndices = {};
    var aIterable = a.entries();
    var index = 0;
    var aResult;
    var bResult;
    while ((aResult = aIterable.next())) {
        if (aResult.done) {
            break;
        }
        var bIterable = b.entries();
        var hasMatch = false;
        var matchIndex = 0;
        while ((bResult = bIterable.next())) {
            if (bResult.done) {
                break;
            }
            var _a = aResult.value, aKey = _a[0], aValue = _a[1];
            var _b = bResult.value, bKey = _b[0], bValue = _b[1];
            if (!hasMatch &&
                !matchedIndices[matchIndex] &&
                (hasMatch =
                    state.equals(aKey, bKey, index, matchIndex, a, b, state) &&
                        state.equals(aValue, bValue, aKey, bKey, a, b, state))) {
                matchedIndices[matchIndex] = true;
            }
            matchIndex++;
        }
        if (!hasMatch) {
            return false;
        }
        index++;
    }
    return true;
}
/**
 * Whether the objects are equal in value.
 */
function areObjectsEqual(a, b, state) {
    var properties = keys$1(a);
    var index = properties.length;
    if (keys$1(b).length !== index) {
        return false;
    }
    var property;
    // Decrementing `while` showed faster results than either incrementing or
    // decrementing `for` loop and than an incrementing `while` loop. Declarative
    // methods like `some` / `every` were not used to avoid incurring the garbage
    // cost of anonymous callbacks.
    while (index-- > 0) {
        property = properties[index];
        if (property === OWNER &&
            (a.$$typeof || b.$$typeof) &&
            a.$$typeof !== b.$$typeof) {
            return false;
        }
        if (!hasOwn(b, property) ||
            !state.equals(a[property], b[property], property, property, a, b, state)) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the objects are equal in value with strict property checking.
 */
function areObjectsEqualStrict(a, b, state) {
    var properties = getStrictProperties(a);
    var index = properties.length;
    if (getStrictProperties(b).length !== index) {
        return false;
    }
    var property;
    var descriptorA;
    var descriptorB;
    // Decrementing `while` showed faster results than either incrementing or
    // decrementing `for` loop and than an incrementing `while` loop. Declarative
    // methods like `some` / `every` were not used to avoid incurring the garbage
    // cost of anonymous callbacks.
    while (index-- > 0) {
        property = properties[index];
        if (property === OWNER &&
            (a.$$typeof || b.$$typeof) &&
            a.$$typeof !== b.$$typeof) {
            return false;
        }
        if (!hasOwn(b, property)) {
            return false;
        }
        if (!state.equals(a[property], b[property], property, property, a, b, state)) {
            return false;
        }
        descriptorA = getOwnPropertyDescriptor(a, property);
        descriptorB = getOwnPropertyDescriptor(b, property);
        if ((descriptorA || descriptorB) &&
            (!descriptorA ||
                !descriptorB ||
                descriptorA.configurable !== descriptorB.configurable ||
                descriptorA.enumerable !== descriptorB.enumerable ||
                descriptorA.writable !== descriptorB.writable)) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the primitive wrappers passed are equal in value.
 */
function arePrimitiveWrappersEqual(a, b) {
    return sameValueZeroEqual(a.valueOf(), b.valueOf());
}
/**
 * Whether the regexps passed are equal in value.
 */
function areRegExpsEqual(a, b) {
    return a.source === b.source && a.flags === b.flags;
}
/**
 * Whether the `Set`s are equal in value.
 */
function areSetsEqual(a, b, state) {
    if (a.size !== b.size) {
        return false;
    }
    var matchedIndices = {};
    var aIterable = a.values();
    var aResult;
    var bResult;
    while ((aResult = aIterable.next())) {
        if (aResult.done) {
            break;
        }
        var bIterable = b.values();
        var hasMatch = false;
        var matchIndex = 0;
        while ((bResult = bIterable.next())) {
            if (bResult.done) {
                break;
            }
            if (!hasMatch &&
                !matchedIndices[matchIndex] &&
                (hasMatch = state.equals(aResult.value, bResult.value, aResult.value, bResult.value, a, b, state))) {
                matchedIndices[matchIndex] = true;
            }
            matchIndex++;
        }
        if (!hasMatch) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the TypedArray instances are equal in value.
 */
function areTypedArraysEqual(a, b) {
    var index = a.length;
    if (b.length !== index) {
        return false;
    }
    while (index-- > 0) {
        if (a[index] !== b[index]) {
            return false;
        }
    }
    return true;
}

var ARGUMENTS_TAG = '[object Arguments]';
var BOOLEAN_TAG = '[object Boolean]';
var DATE_TAG = '[object Date]';
var MAP_TAG = '[object Map]';
var NUMBER_TAG = '[object Number]';
var OBJECT_TAG = '[object Object]';
var REG_EXP_TAG = '[object RegExp]';
var SET_TAG = '[object Set]';
var STRING_TAG = '[object String]';
var isArray$1 = Array.isArray;
var isTypedArray = typeof ArrayBuffer === 'function' && ArrayBuffer.isView
    ? ArrayBuffer.isView
    : null;
var assign$1 = Object.assign;
var getTag = Object.prototype.toString.call.bind(Object.prototype.toString);
/**
 * Create a comparator method based on the type-specific equality comparators passed.
 */
function createEqualityComparator(_a) {
    var areArraysEqual = _a.areArraysEqual, areDatesEqual = _a.areDatesEqual, areMapsEqual = _a.areMapsEqual, areObjectsEqual = _a.areObjectsEqual, arePrimitiveWrappersEqual = _a.arePrimitiveWrappersEqual, areRegExpsEqual = _a.areRegExpsEqual, areSetsEqual = _a.areSetsEqual, areTypedArraysEqual = _a.areTypedArraysEqual;
    /**
     * compare the value of the two objects and return true if they are equivalent in values
     */
    return function comparator(a, b, state) {
        // If the items are strictly equal, no need to do a value comparison.
        if (a === b) {
            return true;
        }
        // If the items are not non-nullish objects, then the only possibility
        // of them being equal but not strictly is if they are both `NaN`. Since
        // `NaN` is uniquely not equal to itself, we can use self-comparison of
        // both objects, which is faster than `isNaN()`.
        if (a == null ||
            b == null ||
            typeof a !== 'object' ||
            typeof b !== 'object') {
            return a !== a && b !== b;
        }
        var constructor = a.constructor;
        // Checks are listed in order of commonality of use-case:
        //   1. Common complex object types (plain object, array)
        //   2. Common data values (date, regexp)
        //   3. Less-common complex object types (map, set)
        //   4. Less-common data values (promise, primitive wrappers)
        // Inherently this is both subjective and assumptive, however
        // when reviewing comparable libraries in the wild this order
        // appears to be generally consistent.
        // Constructors should match, otherwise there is potential for false positives
        // between class and subclass or custom object and POJO.
        if (constructor !== b.constructor) {
            return false;
        }
        // `isPlainObject` only checks against the object's own realm. Cross-realm
        // comparisons are rare, and will be handled in the ultimate fallback, so
        // we can avoid capturing the string tag.
        if (constructor === Object) {
            return areObjectsEqual(a, b, state);
        }
        // `isArray()` works on subclasses and is cross-realm, so we can avoid capturing
        // the string tag or doing an `instanceof` check.
        if (isArray$1(a)) {
            return areArraysEqual(a, b, state);
        }
        // `isTypedArray()` works on all possible TypedArray classes, so we can avoid
        // capturing the string tag or comparing against all possible constructors.
        if (isTypedArray != null && isTypedArray(a)) {
            return areTypedArraysEqual(a, b, state);
        }
        // Try to fast-path equality checks for other complex object types in the
        // same realm to avoid capturing the string tag. Strict equality is used
        // instead of `instanceof` because it is more performant for the common
        // use-case. If someone is subclassing a native class, it will be handled
        // with the string tag comparison.
        if (constructor === Date) {
            return areDatesEqual(a, b, state);
        }
        if (constructor === RegExp) {
            return areRegExpsEqual(a, b, state);
        }
        if (constructor === Map) {
            return areMapsEqual(a, b, state);
        }
        if (constructor === Set) {
            return areSetsEqual(a, b, state);
        }
        // Since this is a custom object, capture the string tag to determing its type.
        // This is reasonably performant in modern environments like v8 and SpiderMonkey.
        var tag = getTag(a);
        if (tag === DATE_TAG) {
            return areDatesEqual(a, b, state);
        }
        if (tag === REG_EXP_TAG) {
            return areRegExpsEqual(a, b, state);
        }
        if (tag === MAP_TAG) {
            return areMapsEqual(a, b, state);
        }
        if (tag === SET_TAG) {
            return areSetsEqual(a, b, state);
        }
        if (tag === OBJECT_TAG) {
            // The exception for value comparison is custom `Promise`-like class instances. These should
            // be treated the same as standard `Promise` objects, which means strict equality, and if
            // it reaches this point then that strict equality comparison has already failed.
            return (typeof a.then !== 'function' &&
                typeof b.then !== 'function' &&
                areObjectsEqual(a, b, state));
        }
        // If an arguments tag, it should be treated as a standard object.
        if (tag === ARGUMENTS_TAG) {
            return areObjectsEqual(a, b, state);
        }
        // As the penultimate fallback, check if the values passed are primitive wrappers. This
        // is very rare in modern JS, which is why it is deprioritized compared to all other object
        // types.
        if (tag === BOOLEAN_TAG || tag === NUMBER_TAG || tag === STRING_TAG) {
            return arePrimitiveWrappersEqual(a, b, state);
        }
        // If not matching any tags that require a specific type of comparison, then we hard-code false because
        // the only thing remaining is strict equality, which has already been compared. This is for a few reasons:
        //   - Certain types that cannot be introspected (e.g., `WeakMap`). For these types, this is the only
        //     comparison that can be made.
        //   - For types that can be introspected, but rarely have requirements to be compared
        //     (`ArrayBuffer`, `DataView`, etc.), the cost is avoided to prioritize the common
        //     use-cases (may be included in a future release, if requested enough).
        //   - For types that can be introspected but do not have an objective definition of what
        //     equality is (`Error`, etc.), the subjective decision is to be conservative and strictly compare.
        // In all cases, these decisions should be reevaluated based on changes to the language and
        // common development practices.
        return false;
    };
}
/**
 * Create the configuration object used for building comparators.
 */
function createEqualityComparatorConfig(_a) {
    var circular = _a.circular, createCustomConfig = _a.createCustomConfig, strict = _a.strict;
    var config = {
        areArraysEqual: strict
            ? areObjectsEqualStrict
            : areArraysEqual,
        areDatesEqual: areDatesEqual,
        areMapsEqual: strict
            ? combineComparators(areMapsEqual, areObjectsEqualStrict)
            : areMapsEqual,
        areObjectsEqual: strict
            ? areObjectsEqualStrict
            : areObjectsEqual,
        arePrimitiveWrappersEqual: arePrimitiveWrappersEqual,
        areRegExpsEqual: areRegExpsEqual,
        areSetsEqual: strict
            ? combineComparators(areSetsEqual, areObjectsEqualStrict)
            : areSetsEqual,
        areTypedArraysEqual: strict
            ? areObjectsEqualStrict
            : areTypedArraysEqual,
    };
    if (createCustomConfig) {
        config = assign$1({}, config, createCustomConfig(config));
    }
    if (circular) {
        var areArraysEqual$1 = createIsCircular(config.areArraysEqual);
        var areMapsEqual$1 = createIsCircular(config.areMapsEqual);
        var areObjectsEqual$1 = createIsCircular(config.areObjectsEqual);
        var areSetsEqual$1 = createIsCircular(config.areSetsEqual);
        config = assign$1({}, config, {
            areArraysEqual: areArraysEqual$1,
            areMapsEqual: areMapsEqual$1,
            areObjectsEqual: areObjectsEqual$1,
            areSetsEqual: areSetsEqual$1,
        });
    }
    return config;
}
/**
 * Default equality comparator pass-through, used as the standard `isEqual` creator for
 * use inside the built comparator.
 */
function createInternalEqualityComparator(compare) {
    return function (a, b, _indexOrKeyA, _indexOrKeyB, _parentA, _parentB, state) {
        return compare(a, b, state);
    };
}
/**
 * Create the `isEqual` function used by the consuming application.
 */
function createIsEqual(_a) {
    var circular = _a.circular, comparator = _a.comparator, createState = _a.createState, equals = _a.equals, strict = _a.strict;
    if (createState) {
        return function isEqual(a, b) {
            var _a = createState(), _b = _a.cache, cache = _b === void 0 ? circular ? new WeakMap() : undefined : _b, meta = _a.meta;
            return comparator(a, b, {
                cache: cache,
                equals: equals,
                meta: meta,
                strict: strict,
            });
        };
    }
    if (circular) {
        return function isEqual(a, b) {
            return comparator(a, b, {
                cache: new WeakMap(),
                equals: equals,
                meta: undefined,
                strict: strict,
            });
        };
    }
    var state = {
        cache: undefined,
        equals: equals,
        meta: undefined,
        strict: strict,
    };
    return function isEqual(a, b) {
        return comparator(a, b, state);
    };
}

/**
 * Whether the items passed are deeply-equal in value.
 */
var deepEqual = createCustomEqual();
/**
 * Whether the items passed are deeply-equal in value based on strict comparison.
 */
createCustomEqual({ strict: true });
/**
 * Whether the items passed are deeply-equal in value, including circular references.
 */
createCustomEqual({ circular: true });
/**
 * Whether the items passed are deeply-equal in value, including circular references,
 * based on strict comparison.
 */
createCustomEqual({
    circular: true,
    strict: true,
});
/**
 * Whether the items passed are shallowly-equal in value.
 */
createCustomEqual({
    createInternalComparator: function () { return sameValueZeroEqual; },
});
/**
 * Whether the items passed are shallowly-equal in value based on strict comparison
 */
createCustomEqual({
    strict: true,
    createInternalComparator: function () { return sameValueZeroEqual; },
});
/**
 * Whether the items passed are shallowly-equal in value, including circular references.
 */
createCustomEqual({
    circular: true,
    createInternalComparator: function () { return sameValueZeroEqual; },
});
/**
 * Whether the items passed are shallowly-equal in value, including circular references,
 * based on strict comparison.
 */
createCustomEqual({
    circular: true,
    createInternalComparator: function () { return sameValueZeroEqual; },
    strict: true,
});
/**
 * Create a custom equality comparison method.
 *
 * This can be done to create very targeted comparisons in extreme hot-path scenarios
 * where the standard methods are not performant enough, but can also be used to provide
 * support for legacy environments that do not support expected features like
 * `RegExp.prototype.flags` out of the box.
 */
function createCustomEqual(options) {
    if (options === void 0) { options = {}; }
    var _a = options.circular, circular = _a === void 0 ? false : _a, createCustomInternalComparator = options.createInternalComparator, createState = options.createState, _b = options.strict, strict = _b === void 0 ? false : _b;
    var config = createEqualityComparatorConfig(options);
    var comparator = createEqualityComparator(config);
    var equals = createCustomInternalComparator
        ? createCustomInternalComparator(comparator)
        : createInternalEqualityComparator(comparator);
    return createIsEqual({ circular: circular, comparator: comparator, createState: createState, equals: equals, strict: strict });
}

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
    POLLING_FREQUENCY: 30000,
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

class Channel {
    constructor(fbref, peer, firebase) {
        this.firebase = firebase;
        this.outRef = firebase.child(fbref, 'fromServer'); //firebase
        this.inRef = firebase.child(fbref, 'fromClient');
        this.peer = peer; // simple-peer
    }

    destroy() {
        this.firebase.off(this.outRef);
        this.firebase.off(this.inRef);
        this.peer.destroy();
    }
}

/**
 *
 * @param {*} database
 * @param {*} callback
 */
function getPeerList(database, callback, firebase, onlyOnce = true) {
    console.log('getPeerList: ', database.toString());
    firebase.onValue(
        database,
        (ev) => {
            var val = ev.val();
            if (callback) callback(null, val);
        },
        {
            onlyOnce,
        }
    );
}

/**  Description: class for monitoring firebase references
 and removing children that have not updated recently
*/
class firebaseTreeTrimmer {
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
        Object.assign(this, options);

        this.firebase = options.firebase;
        this.monitorRate = options.monitorRate || 60000;
        this.monitorReference = this.monitor.bind(this);
        this.trimmerRemoveRate = options.trimmerRemoveRate || 5 * 60000;
        
        this.firebase
            .onDisconnect(this.firebase.child(this.treeTrimmingRef, this.id))
            .remove();

        this.monitor();
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
                    );
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
                setTimeout(this.monitorReference, this.monitorRate);
            },
            {
                onlyOnce: true,
            }
        );

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
                            this.firebase.child(heartbeatRef, child.key)
                        );
                        this.firebase.remove(
                            this.firebase.child(channelsRef, child.key)
                        );
                        this.firebase.remove(
                            this.firebase.child(peersRef, child.key)
                        );
                    }
                });
            },
            {
                onlyOnce: true,
            }
        );
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
                    );
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

            if (!options.firebase)
                throw new Error('firebase must be passed in the options object')

            if (!options.database)
                throw new Error('database must be passed in the options object')

            this.firebase = options.firebase;

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

            this.database = options.database;
            console.log('Database: ', this.database.toString());

            this.peerInfoRef = this.firebase.child(
                this.database.parent,
                'peerInfo'
            );

            this.heartbeatRef = this.firebase.child(
                this.database.parent,
                'heartbeat'
            );

            this.debug = !!options.debug;
            this.initialPeerInfo = initialPeerInfo;
            this.initialPeerInfo.id = this.id;
            this.monitorRate = options.monitorRate;
            this.trimmerRemoveRate = options.trimmerRemoveRate;
            console.log('monitorRate: ', this.monitorRate);

            if (this.debug) console.log(this.id);
            if (!options.dontCallInitYet) {
                this.init();
            }

            this._peerInfo = null;

            this.resolveReady = null;
            this.rejectReady = null;
            this.readyPromise = new Promise((resolve, reject) => {
                this.resolveReady = resolve;
                this.rejectReady = reject;
            });
        }

        ready() {
            return this.readyPromise
        }

        peerListPromise() {
            return new Promise((resolve, reject) => {
                return getPeerList(
                    this.peerInfoRef,
                    (err, val) => {
                        if (err) return reject(err)
                        resolve(val);
                    },
                    this.firebase
                )
            })
        }

        init() {
            this.database;

            // the below assumes that tree trimming would happen at the same lavel as the peers ref or would be passed explicitly
            this.treeTrimmer = new firebaseTreeTrimmer({
                peersRef: this.peerInfoRef,
                heartbeatRef: this.heartbeatRef,
                channelsRef: this.database,
                treeTrimmingRef:
                    this.treeTrimmingRef ||
                    this.firebase.child(this.database.parent, 'treeTrimming'),
                id: this.id,
                firebase: this.firebase,
                monitorRate: this.monitorRate || 60000,
                trimmerRemoveRate: this.trimmerRemoveRate,
            });

            this.userRef = this.firebase.child(this.database, this.id);

            if (this.debug)
                console.log(
                    'userRef: ' + this.userRef.toString(),
                    this.initialPeerInfo
                );

            this.firebase.onValue(
                this.firebase.child(this.peerInfoRef, this.id),
                (snapshot) => {
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
                        this.firebase.update(
                            this.firebase.child(this.peerInfoRef, this.id),
                            {
                                ...this._peerInfo,
                                lastUpdate: this.firebase.serverTimestamp(),
                            }
                        );
                        this.firebase.update(
                            this.firebase.child(this.heartbeatRef, this.id),
                            {
                                lastUpdate: this.firebase.serverTimestamp(),
                            }
                        );
                    } else if (this._peerInfo) ; else {
                        console.warn(
                            'Appears we have not yet set peerInfo: ',
                            this._peerInfo,
                            newPeerInfo
                        );
                    }
                }
            );

            this.firebase.onDisconnect(this.userRef).remove();
            this.firebase
                .onDisconnect(this.firebase.child(this.peerInfoRef, this.id))
                .remove();
            this.firebase
                .onDisconnect(this.firebase.child(this.heartbeatRef, this.id))
                .remove();

            if (this.initialPeerInfo) {
                if (this.debug)
                    console.log(
                        'UserRef: ' + this.userRef,
                        this.initialPeerInfo
                    );
                this.firebase
                    .update(
                        this.firebase.child(this.peerInfoRef, this.id),
                        this.initialPeerInfo
                    )
                    .then(() => {
                        console.log('update finished');
                        this.resolveReady(this.userRef);
                    })
                    .catch((e) => {
                        this.rejectReady(e);
                        console.error('propblem: ', e);
                    });
            }

            this.updateRef = this.firebase.child(
                this.firebase.child(this.heartbeatRef, this.id),
                'lastUpdate'
            );
            this.firebase.set(this.updateRef, this.firebase.serverTimestamp());

            this.channelRef = this.firebase.child(this.userRef, 'channels');
            if (this.stream) {
                this.firebase.set(
                    this.firebase.child(
                        this.firebase.child(this.peerInfoRef, this.id),
                        'isStream'
                    ),
                    true
                );
            }
            this.firebase.set(this.channelRef, []);

            this.connections = [];
            console.log('POLLING_FREQUENCY: ', this.POLLING_FREQUENCY);
            this._intervalID = setInterval(() => {
                // console.log('setInterval: ', this.POLLING_FREQUENCY)
                this.fire('updateTimeStamp');
                this._updateOnFireBase();
            }, this.POLLING_FREQUENCY);

            this.listenToChannels();
            this.isListening = true;
            this.fire('init', undefined);
        }

        _updateOnFireBase() {
            // one may want to overwrite this
            // console.log('updateOnFirebase')
            this.firebase.set(this.updateRef, this.firebase.serverTimestamp());
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

        async updatePeerInfo(newPeerInfo) {
            return this.firebase.update(
                this.firebase.child(this.peerInfoRef, this.id),
                { ...newPeerInfo, lastUpdate: this.firebase.serverTimestamp() }
            )
        }

        listenToChannels() {
            // disabling no-loop-func because these loops are correct usage
            // https://eslint.org/docs/rules/no-loop-func
            // when a new channel is added, listen to it.

            if (this.debug)
                console.log('channelRef: ', this.channelRef.toString());

            this.firebase.onChildAdded(this.channelRef, (ev) => {
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
                    if (this.debug) console.log('signal: ', { sig });
                    if (sig.type === 'offer') {
                        var mykey = ev.key;
                        var { serverID } = sig;
                        console.log('listener create channel: ', sig);
                        var channel = new Channel(
                            this.firebase.child(this.channelRef, mykey),
                            this._makePeer(serverID),
                            this.firebase
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
                                this.firebase.push(channel.outRef, data);
                                answerSentYet = true;
                            } else if (data.candidate) {
                                this.firebase.push(channel.outRef, data);
                            } else {
                                console.warn(
                                    data,
                                    'unexpected message from WebRTC'
                                );
                            }
                        });

                        // on message through firebase
                        this.firebase.onChildAdded(channel.inRef, (ev2) => {
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
            return getPeerList(this.peerInfoRef, callback, this.firebase)
        }

        onPeerList(callback) {
            return getPeerList(
                this.peerInfoRef,
                callback,
                this.firebase,
                false
            )
        }

        destroy() {
            this.firebase.remove(this.channelRef);
            this.firebase.remove(this.updateRef);
            this.firebase.off(this.channelRef);
            this.firebase.off(this.updateRef);
            this.firebase.off(this.userRef);

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

            if (!options.firebase)
                throw new Error('firebase must be passed in the options object')

            if (!options.database)
                throw new Error('database must be passed in the options object')

            this.firebase = options.firebase;

            this.id =
                options.peerID || 'client_' + Math.floor(Math.random() * 100000);
            this.myID = this.id;
            this.peerID = this.id;
            this.serverID = options.serverID;

            console.log('P2PClient: ', this);

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

            this.database = options.database;

            this.peerInfoRef = this.firebase.child(
                this.database.parent,
                'peerInfo'
            );

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
            if (this.debug) console.log('Database: ', this.peerInfoRef);
            return getPeerList(this.peerInfoRef, callback, this.firebase)
        }

        peerListPromise() {
            return new Promise((resolve, reject) => {
                return getPeerList(this.peerInfoRef, resolve, this.firebase)
            })
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
            if (this.debug)
                console.log('requestCallback: ', { requestID, data });
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
            this.getPeerList((err, peerList) => {
                if (err) {
                    console.error(err);
                    this._notifyCallbacks(
                        `Got error requesting peer list: ${err}`
                    );
                    return
                }
                var peer = peerList[id];
                if (!peer) {
                    console.error(`peer not defined. id: ${id}`);
                    this._notifyCallbacks('peer not defined');
                } else {
                    this.id = id;
                    this.serverRef = this.firebase.child(this.database, id);
                    this.firebase.onValue(
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
                                            'client received candidate from webrtc',
                                            data
                                        );
                                    }
                                    this.firebase.push(this.outRef, data);
                                } else {
                                    console.warn(
                                        'Client received unexpected signal through WebRTC:',
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
                this.firebase.off(this.serverRef);
            }
            if (this.outRef) {
                this.firebase.off(this.outRef);
            }
            if (this.inRef) {
                this.firebase.off(this.inRef);
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
            offer.serverID = this.serverID;
            if (this.debug)
                console.log('Got create channel with offer: ', offer, this);
            this.channelRef = this.firebase.push(
                this.firebase.child(this.serverRef, 'channels'),
                {
                    fromClient: [offer],
                }
            );
            this.outRef = this.firebase.child(this.channelRef, 'fromClient');
            this.inRef = this.firebase.child(this.channelRef, 'fromServer');
            this.firebase.onChildAdded(this.inRef, (ev) => {
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
                if (this.debug)
                    console.log(
                        'signalState',
                        this.connection &&
                            this.connection._pc &&
                            this.connection._pc.signalingState
                    );
            });
        }
    }
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var global$1 = (typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {});

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser$2 = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop$2() {}

var on = noop$2;
var addListener = noop$2;
var once$2 = noop$2;
var off = noop$2;
var removeListener = noop$2;
var removeAllListeners = noop$2;
var emit = noop$2;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var process = {
  nextTick: nextTick,
  title: title,
  browser: browser$2,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once$2,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = require('./common')(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};

var browser$1 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(browser$1);

// originally pulled out of simple-peer

var getBrowserRtc = function getBrowserRTC () {
  if (typeof globalThis === 'undefined') return null
  var wrtc = {
    RTCPeerConnection: globalThis.RTCPeerConnection || globalThis.mozRTCPeerConnection ||
      globalThis.webkitRTCPeerConnection,
    RTCSessionDescription: globalThis.RTCSessionDescription ||
      globalThis.mozRTCSessionDescription || globalThis.webkitRTCSessionDescription,
    RTCIceCandidate: globalThis.RTCIceCandidate || globalThis.mozRTCIceCandidate ||
      globalThis.webkitRTCIceCandidate
  };
  if (!wrtc.RTCPeerConnection) return null
  return wrtc
};

// limit of Crypto.getRandomValues()
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
var MAX_BYTES = 65536;

// Node supports requesting up to this number of bytes
// https://github.com/nodejs/node/blob/master/lib/internal/crypto/random.js#L48
var MAX_UINT32 = 4294967295;

function oldBrowser () {
  throw new Error('Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11')
}

var Buffer$4 = require('safe-buffer').Buffer;
var crypto = global$1.crypto || global$1.msCrypto;

if (crypto && crypto.getRandomValues) {
  module.exports = randomBytes;
} else {
  module.exports = oldBrowser;
}

function randomBytes (size, cb) {
  // phantomjs needs to throw
  if (size > MAX_UINT32) throw new RangeError('requested too many random bytes')

  var bytes = Buffer$4.allocUnsafe(size);

  if (size > 0) {  // getRandomValues fails on IE if size == 0
    if (size > MAX_BYTES) { // this is the max bytes crypto.getRandomValues
      // can do at once see https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
      for (var generated = 0; generated < size; generated += MAX_BYTES) {
        // buffer.slice automatically checks if the end is past the end of
        // the buffer so we don't have to here
        crypto.getRandomValues(bytes.slice(generated, generated + MAX_BYTES));
      }
    } else {
      crypto.getRandomValues(bytes);
    }
  }

  if (typeof cb === 'function') {
    return nextTick(function () {
      cb(null, bytes);
    })
  }

  return bytes
}

var browser = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var require$$2$1 = /*@__PURE__*/getAugmentedNamespace(browser);

var readableBrowser = {exports: {}};

module.exports = Readable$1;
/*<replacement>*/

var Duplex$3;
/*</replacement>*/

Readable$1.ReadableState = ReadableState;
/*<replacement>*/

require('events').EventEmitter;

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/


var Stream$1 = require('./internal/streams/stream');
/*</replacement>*/


var Buffer$3 = require('buffer').Buffer;

var OurUint8Array$1 = global$1.Uint8Array || function () {};

function _uint8ArrayToBuffer$1(chunk) {
  return Buffer$3.from(chunk);
}

function _isUint8Array$1(obj) {
  return Buffer$3.isBuffer(obj) || obj instanceof OurUint8Array$1;
}
/*<replacement>*/


var debugUtil = require('util');

var debug$1;

if (debugUtil && debugUtil.debuglog) {
  debug$1 = debugUtil.debuglog('stream');
} else {
  debug$1 = function debug() {};
}
/*</replacement>*/


var BufferList = require('./internal/streams/buffer_list');

var destroyImpl$1 = require('./internal/streams/destroy');

var _require$1 = require('./internal/streams/state'),
    getHighWaterMark$1 = _require$1.getHighWaterMark;

var _require$codes$3 = require('../errors').codes,
    ERR_INVALID_ARG_TYPE$1 = _require$codes$3.ERR_INVALID_ARG_TYPE,
    ERR_STREAM_PUSH_AFTER_EOF = _require$codes$3.ERR_STREAM_PUSH_AFTER_EOF,
    ERR_METHOD_NOT_IMPLEMENTED$2 = _require$codes$3.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes$3.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


var StringDecoder;
var createReadableStreamAsyncIterator;
var from$1;

require('inherits')(Readable$1, Stream$1);

var errorOrDestroy$1 = destroyImpl$1.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream, isDuplex) {
  Duplex$3 = Duplex$3 || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex$3; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  this.highWaterMark = getHighWaterMark$1(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;

  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable$1(options) {
  Duplex$3 = Duplex$3 || require('./_stream_duplex');
  if (!(this instanceof Readable$1)) return new Readable$1(options); // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex$3;
  this._readableState = new ReadableState(options, this, isDuplex); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream$1.call(this);
}

Object.defineProperty(Readable$1.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable$1.prototype.destroy = destroyImpl$1.destroy;
Readable$1.prototype._undestroy = destroyImpl$1.undestroy;

Readable$1.prototype._destroy = function (err, cb) {
  cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.


Readable$1.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;

      if (encoding !== state.encoding) {
        chunk = Buffer$3.from(chunk, encoding);
        encoding = '';
      }

      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()


Readable$1.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  debug$1('readableAddChunk', chunk);
  var state = stream._readableState;

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

    if (er) {
      errorOrDestroy$1(stream, er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer$3.prototype) {
        chunk = _uint8ArrayToBuffer$1(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) errorOrDestroy$1(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy$1(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed) {
        return false;
      } else {
        state.reading = false;

        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
      maybeReadMore(stream, state);
    }
  } // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.


  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    state.awaitDrain = 0;
    stream.emit('data', chunk);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }

  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;

  if (!_isUint8Array$1(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE$1('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }

  return er;
}

Readable$1.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable$1.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

  var p = this._readableState.buffer.head;
  var content = '';

  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }

  this._readableState.buffer.clear();

  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
}; // Don't raise the hwm > 1GB


var MAX_HWM = 0x40000000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }

  return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n; // Don't have enough

  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }

  return state.length;
} // you can override either this method, or the async _read(n) below.


Readable$1.prototype.read = function (n) {
  debug$1('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
    debug$1('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.
  // if we need a readable event, then we need to do some reading.


  var doRead = state.needReadable;
  debug$1('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug$1('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state.ended || state.reading) {
    doRead = false;
    debug$1('reading or ended', doRead);
  } else if (doRead) {
    debug$1('do read');
    state.reading = true;
    state.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state.length === 0) state.needReadable = true; // call internal read method

    this._read(state.highWaterMark);

    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    state.awaitDrain = 0;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream, state) {
  debug$1('onEofChunk');
  if (state.ended) return;

  if (state.decoder) {
    var chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true;

  if (state.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;

    if (!state.emittedReadable) {
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream) {
  var state = stream._readableState;
  debug$1('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug$1('emitReadable', state.flowing);
    state.emittedReadable = true;
    nextTick(emitReadable_, stream);
  }
}

function emitReadable_(stream) {
  var state = stream._readableState;
  debug$1('emitReadable_', state.destroyed, state.length, state.ended);

  if (!state.destroyed && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  } // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.


  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    var len = state.length;
    debug$1('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) // didn't get any data, stop spinning.
      break;
  }

  state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable$1.prototype._read = function (n) {
  errorOrDestroy$1(this, new ERR_METHOD_NOT_IMPLEMENTED$2('_read()'));
};

Readable$1.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;

    case 1:
      state.pipes = [state.pipes, dest];
      break;

    default:
      state.pipes.push(dest);
      break;
  }

  state.pipesCount += 1;
  debug$1('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);

  function onunpipe(readable, unpipeInfo) {
    debug$1('onunpipe');

    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug$1('onend');
    dest.end();
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug$1('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  src.on('data', ondata);

  function ondata(chunk) {
    debug$1('ondata');
    var ret = dest.write(chunk);
    debug$1('dest.write', ret);

    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug$1('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug$1('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy$1(dest, er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }

  dest.once('close', onclose);

  function onfinish() {
    debug$1('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }

  dest.once('finish', onfinish);

  function unpipe() {
    debug$1('unpipe');
    src.unpipe(dest);
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state.flowing) {
    debug$1('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
    var state = src._readableState;
    debug$1('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;

    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable$1.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state.pipesCount === 0) return this; // just one destination.  most common case.

  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes; // got a match.

    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, {
        hasUnpiped: false
      });
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable$1.prototype.on = function (ev, fn) {
  var res = Stream$1.prototype.on.call(this, ev, fn);
  var state = this._readableState;

  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug$1('on readable', state.length, state.reading);

      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        nextTick(nReadingNextTick, this);
      }
    }
  }

  return res;
};

Readable$1.prototype.addListener = Readable$1.prototype.on;

Readable$1.prototype.removeListener = function (ev, fn) {
  var res = Stream$1.prototype.removeListener.call(this, ev, fn);

  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    nextTick(updateReadableListening, this);
  }

  return res;
};

Readable$1.prototype.removeAllListeners = function (ev) {
  var res = Stream$1.prototype.removeAllListeners.apply(this, arguments);

  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    nextTick(updateReadableListening, this);
  }

  return res;
};

function updateReadableListening(self) {
  var state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;

  if (state.resumeScheduled && !state.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}

function nReadingNextTick(self) {
  debug$1('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable$1.prototype.resume = function () {
  var state = this._readableState;

  if (!state.flowing) {
    debug$1('resume'); // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()

    state.flowing = !state.readableListening;
    resume(this, state);
  }

  state.paused = false;
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  debug$1('resume', state.reading);

  if (!state.reading) {
    stream.read(0);
  }

  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable$1.prototype.pause = function () {
  debug$1('call pause flowing=%j', this._readableState.flowing);

  if (this._readableState.flowing !== false) {
    debug$1('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  this._readableState.paused = true;
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug$1('flow', state.flowing);

  while (state.flowing && stream.read() !== null) {
  }
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.


Readable$1.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;
  stream.on('end', function () {
    debug$1('wrapped end');

    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });
  stream.on('data', function (chunk) {
    debug$1('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
  // underlying stream.


  this._read = function (n) {
    debug$1('wrapped _read', n);

    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

if (typeof Symbol === 'function') {
  Readable$1.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator === undefined) {
      createReadableStreamAsyncIterator = require('./internal/streams/async_iterator');
    }

    return createReadableStreamAsyncIterator(this);
  };
}

Object.defineProperty(Readable$1.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable$1.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable$1.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
}); // exposed for testing purposes only.

Readable$1._fromList = fromList;
Object.defineProperty(Readable$1.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;
  debug$1('endReadable', state.endEmitted);

  if (!state.endEmitted) {
    state.ended = true;
    nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  debug$1('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');

    if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream._writableState;

      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}

if (typeof Symbol === 'function') {
  Readable$1.from = function (iterable, opts) {
    if (from$1 === undefined) {
      from$1 = require('./internal/streams/from');
    }

    return from$1(Readable$1, iterable, opts);
  };
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}

var _stream_readable = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(_stream_readable);

module.exports = Writable$1;
// there will be only 2 of these for each stream


function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/


var Duplex$2;
/*</replacement>*/

Writable$1.WritableState = WritableState;
/*<replacement>*/

var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/

var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer$2 = require('buffer').Buffer;

var OurUint8Array = global$1.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer$2.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer$2.isBuffer(obj) || obj instanceof OurUint8Array;
}

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes$2 = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes$2.ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED$1 = _require$codes$2.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK$1 = _require$codes$2.ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE = _require$codes$2.ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED$1 = _require$codes$2.ERR_STREAM_DESTROYED,
    ERR_STREAM_NULL_VALUES = _require$codes$2.ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END = _require$codes$2.ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING = _require$codes$2.ERR_UNKNOWN_ENCODING;

var errorOrDestroy = destroyImpl.errorOrDestroy;

require('inherits')(Writable$1, Stream);

function nop() {}

function WritableState(options, stream, isDuplex) {
  Duplex$2 = Duplex$2 || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex$2; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

  this.autoDestroy = !!options.autoDestroy; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two

  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];

  while (current) {
    out.push(current);
    current = current.next;
  }

  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable$1, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable$1) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable$1(options) {
  Duplex$2 = Duplex$2 || require('./_stream_duplex'); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex$2;
  if (!isDuplex && !realHasInstance.call(Writable$1, this)) return new Writable$1(options);
  this._writableState = new WritableState(options, this, isDuplex); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable$1.prototype.pipe = function () {
  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};

function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

  errorOrDestroy(stream, er);
  nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var er;

  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }

  if (er) {
    errorOrDestroy(stream, er);
    nextTick(cb, er);
    return false;
  }

  return true;
}

Writable$1.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer$2.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable$1.prototype.cork = function () {
  this._writableState.corked++;
};

Writable$1.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable$1.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

Object.defineProperty(Writable$1.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer$2.from(chunk, encoding);
  }

  return chunk;
}

Object.defineProperty(Writable$1.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.

function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);

    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }

  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };

    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }

    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED$1('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er); // this can emit finish, but finish must
    // always follow error

    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK$1();
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state) || stream.destroyed;

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      nextTick(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;

    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }

    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite

    state.pendingcb++;
    state.lastBufferedRequest = null;

    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }

    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.

      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable$1.prototype._write = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED$1('_write()'));
};

Writable$1.prototype._writev = null;

Writable$1.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending) endWritable(this, state, cb);
  return this;
};

Object.defineProperty(Writable$1.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      errorOrDestroy(stream, err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish$1(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);

  if (need) {
    prefinish$1(stream, state);

    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');

      if (state.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream._readableState;

        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) nextTick(cb);else stream.once('finish', cb);
  }

  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;

  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  } // reuse the free corkReq.


  state.corkedRequestsFree.next = corkReq;
}

Object.defineProperty(Writable$1.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable$1.prototype.destroy = destroyImpl.destroy;
Writable$1.prototype._undestroy = destroyImpl.undestroy;

Writable$1.prototype._destroy = function (err, cb) {
  cb(err);
};

var _stream_writable = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var require$$1 = /*@__PURE__*/getAugmentedNamespace(_stream_writable);

/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


module.exports = Duplex$1;

var Readable = require('./_stream_readable');

var Writable = require('./_stream_writable');

require('inherits')(Duplex$1, Readable);

{
  // Allow the keys array to be GC'ed.
  var keys = objectKeys(Writable.prototype);

  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex$1.prototype[method]) Duplex$1.prototype[method] = Writable.prototype[method];
  }
}

function Duplex$1(options) {
  if (!(this instanceof Duplex$1)) return new Duplex$1(options);
  Readable.call(this, options);
  Writable.call(this, options);
  this.allowHalfOpen = true;

  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;

    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}

Object.defineProperty(Duplex$1.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex$1.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex$1.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
}); // the no-half-open enforcer

function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex$1.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

var _stream_duplex = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var require$$2 = /*@__PURE__*/getAugmentedNamespace(_stream_duplex);

var errorsBrowser = {};

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
errorsBrowser.codes = codes;

var inherits_browser = {exports: {}};

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  inherits_browser.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  // old school shim for old browsers
  inherits_browser.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}

var inherits_browserExports = inherits_browser.exports;

var _stream_transform = Transform$1;

var _require$codes$1 = errorsBrowser.codes,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes$1.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes$1.ERR_MULTIPLE_CALLBACK,
    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes$1.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes$1.ERR_TRANSFORM_WITH_LENGTH_0;

var Duplex = require$$2;

inherits_browserExports(Transform$1, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
  }

  ts.writechunk = null;
  ts.writecb = null;
  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;

  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform$1(options) {
  if (!(this instanceof Transform$1)) return new Transform$1(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform$1.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.


Transform$1.prototype._transform = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};

Transform$1.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;

  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform$1.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform$1.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}

var _stream_passthrough = PassThrough;

var Transform = _stream_transform;

inherits_browserExports(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

var ERR_STREAM_PREMATURE_CLOSE = errorsBrowser.codes.ERR_STREAM_PREMATURE_CLOSE;

function once$1(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    callback.apply(this, args);
  };
}

function noop$1() {}

function isRequest$1(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function eos$1(stream, opts, callback) {
  if (typeof opts === 'function') return eos$1(stream, null, opts);
  if (!opts) opts = {};
  callback = once$1(callback || noop$1);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;

  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };

  var writableEnded = stream._writableState && stream._writableState.finished;

  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };

  var readableEnded = stream._readableState && stream._readableState.endEmitted;

  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };

  var onerror = function onerror(err) {
    callback.call(stream, err);
  };

  var onclose = function onclose() {
    var err;

    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }

    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };

  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };

  if (isRequest$1(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}

var endOfStream = eos$1;

var eos;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}

var _require$codes = errorsBrowser.codes,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = endOfStream;
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true; // request.destroy just do .end - .abort is what we want

    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}

function call(fn) {
  fn();
}

function pipe(from, to) {
  return from.pipe(to);
}

function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}

function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];

  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}

var pipeline_1 = pipeline;

(function (module, exports) {
	exports = module.exports = require$$0;
	exports.Stream = exports;
	exports.Readable = exports;
	exports.Writable = require$$1;
	exports.Duplex = require$$2;
	exports.Transform = _stream_transform;
	exports.PassThrough = _stream_passthrough;
	exports.finished = endOfStream;
	exports.pipeline = pipeline_1; 
} (readableBrowser, readableBrowser.exports));

var readableBrowserExports = readableBrowser.exports;

/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
let promise;

module.exports = typeof queueMicrotask === 'function'
  ? queueMicrotask.bind(typeof window !== 'undefined' ? window : global$1)
  // reuse resolved promise, and allocate it lazily
  : cb => (promise || (promise = Promise.resolve()))
    .then(cb)
    .catch(err => setTimeout(() => { throw err }, 0));

var queueMicrotask$2 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var require$$4 = /*@__PURE__*/getAugmentedNamespace(queueMicrotask$2);

/**
 * @typedef {{ [key: string]: any }} Extensions
 * @typedef {Error} Err
 * @property {string} message
 */

/**
 *
 * @param {Error} obj
 * @param {Extensions} props
 * @returns {Error & Extensions}
 */
function assign(obj, props) {
    for (const key in props) {
        Object.defineProperty(obj, key, {
            value: props[key],
            enumerable: true,
            configurable: true,
        });
    }

    return obj;
}

/**
 *
 * @param {any} err - An Error
 * @param {string|Extensions} code - A string code or props to set on the error
 * @param {Extensions} [props] - Props to set on the error
 * @returns {Error & Extensions}
 */
function createError(err, code, props) {
    if (!err || typeof err === 'string') {
        throw new TypeError('Please pass an Error to err-code');
    }

    if (!props) {
        props = {};
    }

    if (typeof code === 'object') {
        props = code;
        code = '';
    }

    if (code) {
        props.code = code;
    }

    try {
        return assign(err, props);
    } catch (_) {
        props.message = err.message;
        props.stack = err.stack;

        const ErrClass = function () {};

        ErrClass.prototype = Object.create(Object.getPrototypeOf(err));

        // @ts-ignore
        const output = assign(new ErrClass(), props);

        return output;
    }
}

var errCode$1 = createError;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var inited = false;
function init () {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

function toByteArray (b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

function read (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

function write (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
}

var toString = {}.toString;

var isArray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

var INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer$1.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
  ? global$1.TYPED_ARRAY_SUPPORT
  : true;

/*
 * Export kMaxLength after typed array support is determined.
 */
var _kMaxLength = kMaxLength();

function kMaxLength () {
  return Buffer$1.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer$1.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer$1(length);
    }
    that.length = length;
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer$1 (arg, encodingOrOffset, length) {
  if (!Buffer$1.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer$1)) {
    return new Buffer$1(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer$1.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer$1._augment = function (arr) {
  arr.__proto__ = Buffer$1.prototype;
  return arr
};

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer$1.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
};

if (Buffer$1.TYPED_ARRAY_SUPPORT) {
  Buffer$1.prototype.__proto__ = Uint8Array.prototype;
  Buffer$1.__proto__ = Uint8Array;
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer$1[Symbol.species] === Buffer$1) ;
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer$1.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
};

function allocUnsafe (that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer$1.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer$1.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer$1.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
};

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer$1.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer$1.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that
}

function fromObject (that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len);
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer$1.alloc(+length)
}
Buffer$1.isBuffer = isBuffer;
function internalIsBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer$1.compare = function compare (a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer$1.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer$1.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer$1.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer$1.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer$1.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer$1.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer$1.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer$1.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer$1.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer$1.prototype.toString = function toString () {
  var length = this.length | 0;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer$1.prototype.equals = function equals (b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer$1.compare(this, b) === 0
};

Buffer$1.prototype.inspect = function inspect () {
  var str = '';
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer$1.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer$1.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer$1.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer$1.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer$1.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer$1.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer$1.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer$1.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf)
  } else {
    return fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res
}

Buffer$1.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer$1.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer$1(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer$1.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer$1.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer$1.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer$1.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer$1.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer$1.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer$1.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer$1.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer$1.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer$1.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer$1.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer$1.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer$1.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer$1.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer$1.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4)
};

Buffer$1.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4)
};

Buffer$1.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8)
};

Buffer$1.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer$1.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer$1.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer$1.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer$1.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = (value & 0xff);
  return offset + 1
};

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer$1.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer$1.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
  }
}

Buffer$1.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24);
    this[offset + 2] = (value >>> 16);
    this[offset + 1] = (value >>> 8);
    this[offset] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer$1.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

Buffer$1.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer$1.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer$1.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer$1.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer$1.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer$1.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

Buffer$1.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    this[offset + 2] = (value >>> 16);
    this[offset + 3] = (value >>> 24);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer$1.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer$1.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer$1.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer$1.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer$1.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer$1.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer$1.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer$1.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer$1.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val)
      ? val
      : utf8ToBytes(new Buffer$1(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}


function base64ToBytes (str) {
  return toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
}

function isFastBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
}

var bufferEs6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Buffer: Buffer$1,
    INSPECT_MAX_BYTES: INSPECT_MAX_BYTES,
    SlowBuffer: SlowBuffer,
    isBuffer: isBuffer,
    kMaxLength: _kMaxLength
});

var require$$6 = /*@__PURE__*/getAugmentedNamespace(bufferEs6);

/*! simple-peer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

const debug = require$$0$1('simple-peer');
const getBrowserRTC = getBrowserRtc;
const randombytes = require$$2$1;
const stream = readableBrowserExports;
const queueMicrotask$1 = require$$4; // TODO: remove when Node 10 is not supported
const errCode = errCode$1;
const { Buffer } = require$$6;

const MAX_BUFFERED_AMOUNT = 64 * 1024;
const ICECOMPLETE_TIMEOUT = 5 * 1000;
const CHANNEL_CLOSING_TIMEOUT = 5 * 1000;

// HACK: Filter trickle lines when trickle is disabled #354
function filterTrickle (sdp) {
  return sdp.replace(/a=ice-options:trickle\s\n/g, '')
}

function warn (message) {
  console.warn(message);
}

/**
 * WebRTC peer connection. Same API as node core `net.Socket`, plus a few extra methods.
 * Duplex stream.
 * @param {Object} opts
 */
class Peer extends stream.Duplex {
  constructor (opts) {
    opts = Object.assign({
      allowHalfOpen: false
    }, opts);

    super(opts);

    this._id = randombytes(4).toString('hex').slice(0, 7);
    this._debug('new peer %o', opts);

    this.channelName = opts.initiator
      ? opts.channelName || randombytes(20).toString('hex')
      : null;

    this.initiator = opts.initiator || false;
    this.channelConfig = opts.channelConfig || Peer.channelConfig;
    this.channelNegotiated = this.channelConfig.negotiated;
    this.config = Object.assign({}, Peer.config, opts.config);
    this.offerOptions = opts.offerOptions || {};
    this.answerOptions = opts.answerOptions || {};
    this.sdpTransform = opts.sdpTransform || (sdp => sdp);
    this.streams = opts.streams || (opts.stream ? [opts.stream] : []); // support old "stream" option
    this.trickle = opts.trickle !== undefined ? opts.trickle : true;
    this.allowHalfTrickle = opts.allowHalfTrickle !== undefined ? opts.allowHalfTrickle : false;
    this.iceCompleteTimeout = opts.iceCompleteTimeout || ICECOMPLETE_TIMEOUT;

    this.destroyed = false;
    this.destroying = false;
    this._connected = false;

    this.remoteAddress = undefined;
    this.remoteFamily = undefined;
    this.remotePort = undefined;
    this.localAddress = undefined;
    this.localFamily = undefined;
    this.localPort = undefined;

    this._wrtc = (opts.wrtc && typeof opts.wrtc === 'object')
      ? opts.wrtc
      : getBrowserRTC();

    if (!this._wrtc) {
      if (typeof window === 'undefined') {
        throw errCode(new Error('No WebRTC support: Specify `opts.wrtc` option in this environment'), 'ERR_WEBRTC_SUPPORT')
      } else {
        throw errCode(new Error('No WebRTC support: Not a supported browser'), 'ERR_WEBRTC_SUPPORT')
      }
    }

    this._pcReady = false;
    this._channelReady = false;
    this._iceComplete = false; // ice candidate trickle done (got null candidate)
    this._iceCompleteTimer = null; // send an offer/answer anyway after some timeout
    this._channel = null;
    this._pendingCandidates = [];

    this._isNegotiating = false; // is this peer waiting for negotiation to complete?
    this._firstNegotiation = true;
    this._batchedNegotiation = false; // batch synchronous negotiations
    this._queuedNegotiation = false; // is there a queued negotiation request?
    this._sendersAwaitingStable = [];
    this._senderMap = new Map();
    this._closingInterval = null;

    this._remoteTracks = [];
    this._remoteStreams = [];

    this._chunk = null;
    this._cb = null;
    this._interval = null;

    try {
      this._pc = new (this._wrtc.RTCPeerConnection)(this.config);
    } catch (err) {
      this.destroy(errCode(err, 'ERR_PC_CONSTRUCTOR'));
      return
    }

    // We prefer feature detection whenever possible, but sometimes that's not
    // possible for certain implementations.
    this._isReactNativeWebrtc = typeof this._pc._peerConnectionId === 'number';

    this._pc.oniceconnectionstatechange = () => {
      this._onIceStateChange();
    };
    this._pc.onicegatheringstatechange = () => {
      this._onIceStateChange();
    };
    this._pc.onconnectionstatechange = () => {
      this._onConnectionStateChange();
    };
    this._pc.onsignalingstatechange = () => {
      this._onSignalingStateChange();
    };
    this._pc.onicecandidate = event => {
      this._onIceCandidate(event);
    };

    // HACK: Fix for odd Firefox behavior, see: https://github.com/feross/simple-peer/pull/783
    if (typeof this._pc.peerIdentity === 'object') {
      this._pc.peerIdentity.catch(err => {
        this.destroy(errCode(err, 'ERR_PC_PEER_IDENTITY'));
      });
    }

    // Other spec events, unused by this implementation:
    // - onconnectionstatechange
    // - onicecandidateerror
    // - onfingerprintfailure
    // - onnegotiationneeded

    if (this.initiator || this.channelNegotiated) {
      this._setupData({
        channel: this._pc.createDataChannel(this.channelName, this.channelConfig)
      });
    } else {
      this._pc.ondatachannel = event => {
        this._setupData(event);
      };
    }

    if (this.streams) {
      this.streams.forEach(stream => {
        this.addStream(stream);
      });
    }
    this._pc.ontrack = event => {
      this._onTrack(event);
    };

    this._debug('initial negotiation');
    this._needsNegotiation();

    this._onFinishBound = () => {
      this._onFinish();
    };
    this.once('finish', this._onFinishBound);
  }

  get bufferSize () {
    return (this._channel && this._channel.bufferedAmount) || 0
  }

  // HACK: it's possible channel.readyState is "closing" before peer.destroy() fires
  // https://bugs.chromium.org/p/chromium/issues/detail?id=882743
  get connected () {
    return (this._connected && this._channel.readyState === 'open')
  }

  address () {
    return { port: this.localPort, family: this.localFamily, address: this.localAddress }
  }

  signal (data) {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot signal after peer is destroyed'), 'ERR_DESTROYED')
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (err) {
        data = {};
      }
    }
    this._debug('signal()');

    if (data.renegotiate && this.initiator) {
      this._debug('got request to renegotiate');
      this._needsNegotiation();
    }
    if (data.transceiverRequest && this.initiator) {
      this._debug('got request for transceiver');
      this.addTransceiver(data.transceiverRequest.kind, data.transceiverRequest.init);
    }
    if (data.candidate) {
      if (this._pc.remoteDescription && this._pc.remoteDescription.type) {
        this._addIceCandidate(data.candidate);
      } else {
        this._pendingCandidates.push(data.candidate);
      }
    }
    if (data.sdp) {
      this._pc.setRemoteDescription(new (this._wrtc.RTCSessionDescription)(data))
        .then(() => {
          if (this.destroyed) return

          this._pendingCandidates.forEach(candidate => {
            this._addIceCandidate(candidate);
          });
          this._pendingCandidates = [];

          if (this._pc.remoteDescription.type === 'offer') this._createAnswer();
        })
        .catch(err => {
          this.destroy(errCode(err, 'ERR_SET_REMOTE_DESCRIPTION'));
        });
    }
    if (!data.sdp && !data.candidate && !data.renegotiate && !data.transceiverRequest) {
      this.destroy(errCode(new Error('signal() called with invalid signal data'), 'ERR_SIGNALING'));
    }
  }

  _addIceCandidate (candidate) {
    const iceCandidateObj = new this._wrtc.RTCIceCandidate(candidate);
    this._pc.addIceCandidate(iceCandidateObj)
      .catch(err => {
        if (!iceCandidateObj.address || iceCandidateObj.address.endsWith('.local')) {
          warn('Ignoring unsupported ICE candidate.');
        } else {
          this.destroy(errCode(err, 'ERR_ADD_ICE_CANDIDATE'));
        }
      });
  }

  /**
   * Send text/binary data to the remote peer.
   * @param {ArrayBufferView|ArrayBuffer|Buffer|string|Blob} chunk
   */
  send (chunk) {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot send after peer is destroyed'), 'ERR_DESTROYED')
    this._channel.send(chunk);
  }

  /**
   * Add a Transceiver to the connection.
   * @param {String} kind
   * @param {Object} init
   */
  addTransceiver (kind, init) {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot addTransceiver after peer is destroyed'), 'ERR_DESTROYED')
    this._debug('addTransceiver()');

    if (this.initiator) {
      try {
        this._pc.addTransceiver(kind, init);
        this._needsNegotiation();
      } catch (err) {
        this.destroy(errCode(err, 'ERR_ADD_TRANSCEIVER'));
      }
    } else {
      this.emit('signal', { // request initiator to renegotiate
        type: 'transceiverRequest',
        transceiverRequest: { kind, init }
      });
    }
  }

  /**
   * Add a MediaStream to the connection.
   * @param {MediaStream} stream
   */
  addStream (stream) {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot addStream after peer is destroyed'), 'ERR_DESTROYED')
    this._debug('addStream()');

    stream.getTracks().forEach(track => {
      this.addTrack(track, stream);
    });
  }

  /**
   * Add a MediaStreamTrack to the connection.
   * @param {MediaStreamTrack} track
   * @param {MediaStream} stream
   */
  addTrack (track, stream) {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot addTrack after peer is destroyed'), 'ERR_DESTROYED')
    this._debug('addTrack()');

    const submap = this._senderMap.get(track) || new Map(); // nested Maps map [track, stream] to sender
    let sender = submap.get(stream);
    if (!sender) {
      sender = this._pc.addTrack(track, stream);
      submap.set(stream, sender);
      this._senderMap.set(track, submap);
      this._needsNegotiation();
    } else if (sender.removed) {
      throw errCode(new Error('Track has been removed. You should enable/disable tracks that you want to re-add.'), 'ERR_SENDER_REMOVED')
    } else {
      throw errCode(new Error('Track has already been added to that stream.'), 'ERR_SENDER_ALREADY_ADDED')
    }
  }

  /**
   * Replace a MediaStreamTrack by another in the connection.
   * @param {MediaStreamTrack} oldTrack
   * @param {MediaStreamTrack} newTrack
   * @param {MediaStream} stream
   */
  replaceTrack (oldTrack, newTrack, stream) {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot replaceTrack after peer is destroyed'), 'ERR_DESTROYED')
    this._debug('replaceTrack()');

    const submap = this._senderMap.get(oldTrack);
    const sender = submap ? submap.get(stream) : null;
    if (!sender) {
      throw errCode(new Error('Cannot replace track that was never added.'), 'ERR_TRACK_NOT_ADDED')
    }
    if (newTrack) this._senderMap.set(newTrack, submap);

    if (sender.replaceTrack != null) {
      sender.replaceTrack(newTrack);
    } else {
      this.destroy(errCode(new Error('replaceTrack is not supported in this browser'), 'ERR_UNSUPPORTED_REPLACETRACK'));
    }
  }

  /**
   * Remove a MediaStreamTrack from the connection.
   * @param {MediaStreamTrack} track
   * @param {MediaStream} stream
   */
  removeTrack (track, stream) {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot removeTrack after peer is destroyed'), 'ERR_DESTROYED')
    this._debug('removeSender()');

    const submap = this._senderMap.get(track);
    const sender = submap ? submap.get(stream) : null;
    if (!sender) {
      throw errCode(new Error('Cannot remove track that was never added.'), 'ERR_TRACK_NOT_ADDED')
    }
    try {
      sender.removed = true;
      this._pc.removeTrack(sender);
    } catch (err) {
      if (err.name === 'NS_ERROR_UNEXPECTED') {
        this._sendersAwaitingStable.push(sender); // HACK: Firefox must wait until (signalingState === stable) https://bugzilla.mozilla.org/show_bug.cgi?id=1133874
      } else {
        this.destroy(errCode(err, 'ERR_REMOVE_TRACK'));
      }
    }
    this._needsNegotiation();
  }

  /**
   * Remove a MediaStream from the connection.
   * @param {MediaStream} stream
   */
  removeStream (stream) {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot removeStream after peer is destroyed'), 'ERR_DESTROYED')
    this._debug('removeSenders()');

    stream.getTracks().forEach(track => {
      this.removeTrack(track, stream);
    });
  }

  _needsNegotiation () {
    this._debug('_needsNegotiation');
    if (this._batchedNegotiation) return // batch synchronous renegotiations
    this._batchedNegotiation = true;
    queueMicrotask$1(() => {
      this._batchedNegotiation = false;
      if (this.initiator || !this._firstNegotiation) {
        this._debug('starting batched negotiation');
        this.negotiate();
      } else {
        this._debug('non-initiator initial negotiation request discarded');
      }
      this._firstNegotiation = false;
    });
  }

  negotiate () {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot negotiate after peer is destroyed'), 'ERR_DESTROYED')

    if (this.initiator) {
      if (this._isNegotiating) {
        this._queuedNegotiation = true;
        this._debug('already negotiating, queueing');
      } else {
        this._debug('start negotiation');
        setTimeout(() => { // HACK: Chrome crashes if we immediately call createOffer
          this._createOffer();
        }, 0);
      }
    } else {
      if (this._isNegotiating) {
        this._queuedNegotiation = true;
        this._debug('already negotiating, queueing');
      } else {
        this._debug('requesting negotiation from initiator');
        this.emit('signal', { // request initiator to renegotiate
          type: 'renegotiate',
          renegotiate: true
        });
      }
    }
    this._isNegotiating = true;
  }

  // TODO: Delete this method once readable-stream is updated to contain a default
  // implementation of destroy() that automatically calls _destroy()
  // See: https://github.com/nodejs/readable-stream/issues/283
  destroy (err) {
    this._destroy(err, () => {});
  }

  _destroy (err, cb) {
    if (this.destroyed || this.destroying) return
    this.destroying = true;

    this._debug('destroying (error: %s)', err && (err.message || err));

    queueMicrotask$1(() => { // allow events concurrent with the call to _destroy() to fire (see #692)
      this.destroyed = true;
      this.destroying = false;

      this._debug('destroy (error: %s)', err && (err.message || err));

      this.readable = this.writable = false;

      if (!this._readableState.ended) this.push(null);
      if (!this._writableState.finished) this.end();

      this._connected = false;
      this._pcReady = false;
      this._channelReady = false;
      this._remoteTracks = null;
      this._remoteStreams = null;
      this._senderMap = null;

      clearInterval(this._closingInterval);
      this._closingInterval = null;

      clearInterval(this._interval);
      this._interval = null;
      this._chunk = null;
      this._cb = null;

      if (this._onFinishBound) this.removeListener('finish', this._onFinishBound);
      this._onFinishBound = null;

      if (this._channel) {
        try {
          this._channel.close();
        } catch (err) {}

        // allow events concurrent with destruction to be handled
        this._channel.onmessage = null;
        this._channel.onopen = null;
        this._channel.onclose = null;
        this._channel.onerror = null;
      }
      if (this._pc) {
        try {
          this._pc.close();
        } catch (err) {}

        // allow events concurrent with destruction to be handled
        this._pc.oniceconnectionstatechange = null;
        this._pc.onicegatheringstatechange = null;
        this._pc.onsignalingstatechange = null;
        this._pc.onicecandidate = null;
        this._pc.ontrack = null;
        this._pc.ondatachannel = null;
      }
      this._pc = null;
      this._channel = null;

      if (err) this.emit('error', err);
      this.emit('close');
      cb();
    });
  }

  _setupData (event) {
    if (!event.channel) {
      // In some situations `pc.createDataChannel()` returns `undefined` (in wrtc),
      // which is invalid behavior. Handle it gracefully.
      // See: https://github.com/feross/simple-peer/issues/163
      return this.destroy(errCode(new Error('Data channel event is missing `channel` property'), 'ERR_DATA_CHANNEL'))
    }

    this._channel = event.channel;
    this._channel.binaryType = 'arraybuffer';

    if (typeof this._channel.bufferedAmountLowThreshold === 'number') {
      this._channel.bufferedAmountLowThreshold = MAX_BUFFERED_AMOUNT;
    }

    this.channelName = this._channel.label;

    this._channel.onmessage = event => {
      this._onChannelMessage(event);
    };
    this._channel.onbufferedamountlow = () => {
      this._onChannelBufferedAmountLow();
    };
    this._channel.onopen = () => {
      this._onChannelOpen();
    };
    this._channel.onclose = () => {
      this._onChannelClose();
    };
    this._channel.onerror = event => {
      const err = event.error instanceof Error
        ? event.error
        : new Error(`Datachannel error: ${event.message} ${event.filename}:${event.lineno}:${event.colno}`);
      this.destroy(errCode(err, 'ERR_DATA_CHANNEL'));
    };

    // HACK: Chrome will sometimes get stuck in readyState "closing", let's check for this condition
    // https://bugs.chromium.org/p/chromium/issues/detail?id=882743
    let isClosing = false;
    this._closingInterval = setInterval(() => { // No "onclosing" event
      if (this._channel && this._channel.readyState === 'closing') {
        if (isClosing) this._onChannelClose(); // closing timed out: equivalent to onclose firing
        isClosing = true;
      } else {
        isClosing = false;
      }
    }, CHANNEL_CLOSING_TIMEOUT);
  }

  _read () {}

  _write (chunk, encoding, cb) {
    if (this.destroyed) return cb(errCode(new Error('cannot write after peer is destroyed'), 'ERR_DATA_CHANNEL'))

    if (this._connected) {
      try {
        this.send(chunk);
      } catch (err) {
        return this.destroy(errCode(err, 'ERR_DATA_CHANNEL'))
      }
      if (this._channel.bufferedAmount > MAX_BUFFERED_AMOUNT) {
        this._debug('start backpressure: bufferedAmount %d', this._channel.bufferedAmount);
        this._cb = cb;
      } else {
        cb(null);
      }
    } else {
      this._debug('write before connect');
      this._chunk = chunk;
      this._cb = cb;
    }
  }

  // When stream finishes writing, close socket. Half open connections are not
  // supported.
  _onFinish () {
    if (this.destroyed) return

    // Wait a bit before destroying so the socket flushes.
    // TODO: is there a more reliable way to accomplish this?
    const destroySoon = () => {
      setTimeout(() => this.destroy(), 1000);
    };

    if (this._connected) {
      destroySoon();
    } else {
      this.once('connect', destroySoon);
    }
  }

  _startIceCompleteTimeout () {
    if (this.destroyed) return
    if (this._iceCompleteTimer) return
    this._debug('started iceComplete timeout');
    this._iceCompleteTimer = setTimeout(() => {
      if (!this._iceComplete) {
        this._iceComplete = true;
        this._debug('iceComplete timeout completed');
        this.emit('iceTimeout');
        this.emit('_iceComplete');
      }
    }, this.iceCompleteTimeout);
  }

  _createOffer () {
    if (this.destroyed) return

    this._pc.createOffer(this.offerOptions)
      .then(offer => {
        if (this.destroyed) return
        if (!this.trickle && !this.allowHalfTrickle) offer.sdp = filterTrickle(offer.sdp);
        offer.sdp = this.sdpTransform(offer.sdp);

        const sendOffer = () => {
          if (this.destroyed) return
          const signal = this._pc.localDescription || offer;
          this._debug('signal');
          this.emit('signal', {
            type: signal.type,
            sdp: signal.sdp
          });
        };

        const onSuccess = () => {
          this._debug('createOffer success');
          if (this.destroyed) return
          if (this.trickle || this._iceComplete) sendOffer();
          else this.once('_iceComplete', sendOffer); // wait for candidates
        };

        const onError = err => {
          this.destroy(errCode(err, 'ERR_SET_LOCAL_DESCRIPTION'));
        };

        this._pc.setLocalDescription(offer)
          .then(onSuccess)
          .catch(onError);
      })
      .catch(err => {
        this.destroy(errCode(err, 'ERR_CREATE_OFFER'));
      });
  }

  _requestMissingTransceivers () {
    if (this._pc.getTransceivers) {
      this._pc.getTransceivers().forEach(transceiver => {
        if (!transceiver.mid && transceiver.sender.track && !transceiver.requested) {
          transceiver.requested = true; // HACK: Safari returns negotiated transceivers with a null mid
          this.addTransceiver(transceiver.sender.track.kind);
        }
      });
    }
  }

  _createAnswer () {
    if (this.destroyed) return

    this._pc.createAnswer(this.answerOptions)
      .then(answer => {
        if (this.destroyed) return
        if (!this.trickle && !this.allowHalfTrickle) answer.sdp = filterTrickle(answer.sdp);
        answer.sdp = this.sdpTransform(answer.sdp);

        const sendAnswer = () => {
          if (this.destroyed) return
          const signal = this._pc.localDescription || answer;
          this._debug('signal');
          this.emit('signal', {
            type: signal.type,
            sdp: signal.sdp
          });
          if (!this.initiator) this._requestMissingTransceivers();
        };

        const onSuccess = () => {
          if (this.destroyed) return
          if (this.trickle || this._iceComplete) sendAnswer();
          else this.once('_iceComplete', sendAnswer);
        };

        const onError = err => {
          this.destroy(errCode(err, 'ERR_SET_LOCAL_DESCRIPTION'));
        };

        this._pc.setLocalDescription(answer)
          .then(onSuccess)
          .catch(onError);
      })
      .catch(err => {
        this.destroy(errCode(err, 'ERR_CREATE_ANSWER'));
      });
  }

  _onConnectionStateChange () {
    if (this.destroyed) return
    if (this._pc.connectionState === 'failed') {
      this.destroy(errCode(new Error('Connection failed.'), 'ERR_CONNECTION_FAILURE'));
    }
  }

  _onIceStateChange () {
    if (this.destroyed) return
    const iceConnectionState = this._pc.iceConnectionState;
    const iceGatheringState = this._pc.iceGatheringState;

    this._debug(
      'iceStateChange (connection: %s) (gathering: %s)',
      iceConnectionState,
      iceGatheringState
    );
    this.emit('iceStateChange', iceConnectionState, iceGatheringState);

    if (iceConnectionState === 'connected' || iceConnectionState === 'completed') {
      this._pcReady = true;
      this._maybeReady();
    }
    if (iceConnectionState === 'failed') {
      this.destroy(errCode(new Error('Ice connection failed.'), 'ERR_ICE_CONNECTION_FAILURE'));
    }
    if (iceConnectionState === 'closed') {
      this.destroy(errCode(new Error('Ice connection closed.'), 'ERR_ICE_CONNECTION_CLOSED'));
    }
  }

  getStats (cb) {
    // statreports can come with a value array instead of properties
    const flattenValues = report => {
      if (Object.prototype.toString.call(report.values) === '[object Array]') {
        report.values.forEach(value => {
          Object.assign(report, value);
        });
      }
      return report
    };

    // Promise-based getStats() (standard)
    if (this._pc.getStats.length === 0 || this._isReactNativeWebrtc) {
      this._pc.getStats()
        .then(res => {
          const reports = [];
          res.forEach(report => {
            reports.push(flattenValues(report));
          });
          cb(null, reports);
        }, err => cb(err));

    // Single-parameter callback-based getStats() (non-standard)
    } else if (this._pc.getStats.length > 0) {
      this._pc.getStats(res => {
        // If we destroy connection in `connect` callback this code might happen to run when actual connection is already closed
        if (this.destroyed) return

        const reports = [];
        res.result().forEach(result => {
          const report = {};
          result.names().forEach(name => {
            report[name] = result.stat(name);
          });
          report.id = result.id;
          report.type = result.type;
          report.timestamp = result.timestamp;
          reports.push(flattenValues(report));
        });
        cb(null, reports);
      }, err => cb(err));

    // Unknown browser, skip getStats() since it's anyone's guess which style of
    // getStats() they implement.
    } else {
      cb(null, []);
    }
  }

  _maybeReady () {
    this._debug('maybeReady pc %s channel %s', this._pcReady, this._channelReady);
    if (this._connected || this._connecting || !this._pcReady || !this._channelReady) return

    this._connecting = true;

    // HACK: We can't rely on order here, for details see https://github.com/js-platform/node-webrtc/issues/339
    const findCandidatePair = () => {
      if (this.destroyed) return

      this.getStats((err, items) => {
        if (this.destroyed) return

        // Treat getStats error as non-fatal. It's not essential.
        if (err) items = [];

        const remoteCandidates = {};
        const localCandidates = {};
        const candidatePairs = {};
        let foundSelectedCandidatePair = false;

        items.forEach(item => {
          // TODO: Once all browsers support the hyphenated stats report types, remove
          // the non-hypenated ones
          if (item.type === 'remotecandidate' || item.type === 'remote-candidate') {
            remoteCandidates[item.id] = item;
          }
          if (item.type === 'localcandidate' || item.type === 'local-candidate') {
            localCandidates[item.id] = item;
          }
          if (item.type === 'candidatepair' || item.type === 'candidate-pair') {
            candidatePairs[item.id] = item;
          }
        });

        const setSelectedCandidatePair = selectedCandidatePair => {
          foundSelectedCandidatePair = true;

          let local = localCandidates[selectedCandidatePair.localCandidateId];

          if (local && (local.ip || local.address)) {
            // Spec
            this.localAddress = local.ip || local.address;
            this.localPort = Number(local.port);
          } else if (local && local.ipAddress) {
            // Firefox
            this.localAddress = local.ipAddress;
            this.localPort = Number(local.portNumber);
          } else if (typeof selectedCandidatePair.googLocalAddress === 'string') {
            // TODO: remove this once Chrome 58 is released
            local = selectedCandidatePair.googLocalAddress.split(':');
            this.localAddress = local[0];
            this.localPort = Number(local[1]);
          }
          if (this.localAddress) {
            this.localFamily = this.localAddress.includes(':') ? 'IPv6' : 'IPv4';
          }

          let remote = remoteCandidates[selectedCandidatePair.remoteCandidateId];

          if (remote && (remote.ip || remote.address)) {
            // Spec
            this.remoteAddress = remote.ip || remote.address;
            this.remotePort = Number(remote.port);
          } else if (remote && remote.ipAddress) {
            // Firefox
            this.remoteAddress = remote.ipAddress;
            this.remotePort = Number(remote.portNumber);
          } else if (typeof selectedCandidatePair.googRemoteAddress === 'string') {
            // TODO: remove this once Chrome 58 is released
            remote = selectedCandidatePair.googRemoteAddress.split(':');
            this.remoteAddress = remote[0];
            this.remotePort = Number(remote[1]);
          }
          if (this.remoteAddress) {
            this.remoteFamily = this.remoteAddress.includes(':') ? 'IPv6' : 'IPv4';
          }

          this._debug(
            'connect local: %s:%s remote: %s:%s',
            this.localAddress,
            this.localPort,
            this.remoteAddress,
            this.remotePort
          );
        };

        items.forEach(item => {
          // Spec-compliant
          if (item.type === 'transport' && item.selectedCandidatePairId) {
            setSelectedCandidatePair(candidatePairs[item.selectedCandidatePairId]);
          }

          // Old implementations
          if (
            (item.type === 'googCandidatePair' && item.googActiveConnection === 'true') ||
            ((item.type === 'candidatepair' || item.type === 'candidate-pair') && item.selected)
          ) {
            setSelectedCandidatePair(item);
          }
        });

        // Ignore candidate pair selection in browsers like Safari 11 that do not have any local or remote candidates
        // But wait until at least 1 candidate pair is available
        if (!foundSelectedCandidatePair && (!Object.keys(candidatePairs).length || Object.keys(localCandidates).length)) {
          setTimeout(findCandidatePair, 100);
          return
        } else {
          this._connecting = false;
          this._connected = true;
        }

        if (this._chunk) {
          try {
            this.send(this._chunk);
          } catch (err) {
            return this.destroy(errCode(err, 'ERR_DATA_CHANNEL'))
          }
          this._chunk = null;
          this._debug('sent chunk from "write before connect"');

          const cb = this._cb;
          this._cb = null;
          cb(null);
        }

        // If `bufferedAmountLowThreshold` and 'onbufferedamountlow' are unsupported,
        // fallback to using setInterval to implement backpressure.
        if (typeof this._channel.bufferedAmountLowThreshold !== 'number') {
          this._interval = setInterval(() => this._onInterval(), 150);
          if (this._interval.unref) this._interval.unref();
        }

        this._debug('connect');
        this.emit('connect');
      });
    };
    findCandidatePair();
  }

  _onInterval () {
    if (!this._cb || !this._channel || this._channel.bufferedAmount > MAX_BUFFERED_AMOUNT) {
      return
    }
    this._onChannelBufferedAmountLow();
  }

  _onSignalingStateChange () {
    if (this.destroyed) return

    if (this._pc.signalingState === 'stable') {
      this._isNegotiating = false;

      // HACK: Firefox doesn't yet support removing tracks when signalingState !== 'stable'
      this._debug('flushing sender queue', this._sendersAwaitingStable);
      this._sendersAwaitingStable.forEach(sender => {
        this._pc.removeTrack(sender);
        this._queuedNegotiation = true;
      });
      this._sendersAwaitingStable = [];

      if (this._queuedNegotiation) {
        this._debug('flushing negotiation queue');
        this._queuedNegotiation = false;
        this._needsNegotiation(); // negotiate again
      } else {
        this._debug('negotiated');
        this.emit('negotiated');
      }
    }

    this._debug('signalingStateChange %s', this._pc.signalingState);
    this.emit('signalingStateChange', this._pc.signalingState);
  }

  _onIceCandidate (event) {
    if (this.destroyed) return
    if (event.candidate && this.trickle) {
      this.emit('signal', {
        type: 'candidate',
        candidate: {
          candidate: event.candidate.candidate,
          sdpMLineIndex: event.candidate.sdpMLineIndex,
          sdpMid: event.candidate.sdpMid
        }
      });
    } else if (!event.candidate && !this._iceComplete) {
      this._iceComplete = true;
      this.emit('_iceComplete');
    }
    // as soon as we've received one valid candidate start timeout
    if (event.candidate) {
      this._startIceCompleteTimeout();
    }
  }

  _onChannelMessage (event) {
    if (this.destroyed) return
    let data = event.data;
    if (data instanceof ArrayBuffer) data = Buffer.from(data);
    this.push(data);
  }

  _onChannelBufferedAmountLow () {
    if (this.destroyed || !this._cb) return
    this._debug('ending backpressure: bufferedAmount %d', this._channel.bufferedAmount);
    const cb = this._cb;
    this._cb = null;
    cb(null);
  }

  _onChannelOpen () {
    if (this._connected || this.destroyed) return
    this._debug('on channel open');
    this._channelReady = true;
    this._maybeReady();
  }

  _onChannelClose () {
    if (this.destroyed) return
    this._debug('on channel close');
    this.destroy();
  }

  _onTrack (event) {
    if (this.destroyed) return

    event.streams.forEach(eventStream => {
      this._debug('on track');
      this.emit('track', event.track, eventStream);

      this._remoteTracks.push({
        track: event.track,
        stream: eventStream
      });

      if (this._remoteStreams.some(remoteStream => {
        return remoteStream.id === eventStream.id
      })) return // Only fire one 'stream' event, even though there may be multiple tracks per stream

      this._remoteStreams.push(eventStream);
      queueMicrotask$1(() => {
        this._debug('on stream');
        this.emit('stream', eventStream); // ensure all tracks have been added
      });
    });
  }

  _debug () {
    const args = [].slice.call(arguments);
    args[0] = '[' + this._id + '] ' + args[0];
    debug.apply(null, args);
  }
}

Peer.WEBRTC_SUPPORT = !!getBrowserRTC();

/**
 * Expose peer and data channel config for overriding all Peer
 * instances. Otherwise, just set opts.config or opts.channelConfig
 * when constructing a Peer.
 */
Peer.config = {
  iceServers: [
    {
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:global.stun.twilio.com:3478'
      ]
    }
  ],
  sdpSemantics: 'unified-plan'
};

Peer.channelConfig = {};

var simplePeer = Peer;

var Peer$1 = /*@__PURE__*/getDefaultExportFromCjs(simplePeer);

!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else {var r;r="undefined"!=typeof window?window:"undefined"!=typeof global$1?global$1:"undefined"!=typeof self?self:this,r.msgpack=t();}}(function(){return function t(r,e,n){function i(f,u){if(!e[f]){if(!r[f]){var a="function"==typeof require&&require;if(!u&&a)return a(f,!0);if(o)return o(f,!0);var s=new Error("Cannot find module '"+f+"'");throw s.code="MODULE_NOT_FOUND",s}var c=e[f]={exports:{}};r[f][0].call(c.exports,function(t){var e=r[f][1][t];return i(e?e:t)},c,c.exports,t,r,e,n);}return e[f].exports}for(var o="function"==typeof require&&require,f=0;f<n.length;f++)i(n[f]);return i}({1:[function(t,r,e){e.encode=t("./encode").encode,e.decode=t("./decode").decode,e.Encoder=t("./encoder").Encoder,e.Decoder=t("./decoder").Decoder,e.createCodec=t("./ext").createCodec,e.codec=t("./codec").codec;},{"./codec":10,"./decode":12,"./decoder":13,"./encode":15,"./encoder":16,"./ext":20}],2:[function(t,r,e){(function(Buffer){function t(t){return t&&t.isBuffer&&t}r.exports=t("undefined"!=typeof Buffer&&Buffer)||t(this.Buffer)||t("undefined"!=typeof window&&window.Buffer)||this.Buffer;}).call(this,t("buffer").Buffer);},{buffer:29}],3:[function(t,r,e){function n(t,r){for(var e=this,n=r||(r|=0),i=t.length,o=0,f=0;f<i;)o=t.charCodeAt(f++),o<128?e[n++]=o:o<2048?(e[n++]=192|o>>>6,e[n++]=128|63&o):o<55296||o>57343?(e[n++]=224|o>>>12,e[n++]=128|o>>>6&63,e[n++]=128|63&o):(o=(o-55296<<10|t.charCodeAt(f++)-56320)+65536,e[n++]=240|o>>>18,e[n++]=128|o>>>12&63,e[n++]=128|o>>>6&63,e[n++]=128|63&o);return n-r}function i(t,r,e){var n=this,i=0|r;e||(e=n.length);for(var o="",f=0;i<e;)f=n[i++],f<128?o+=String.fromCharCode(f):(192===(224&f)?f=(31&f)<<6|63&n[i++]:224===(240&f)?f=(15&f)<<12|(63&n[i++])<<6|63&n[i++]:240===(248&f)&&(f=(7&f)<<18|(63&n[i++])<<12|(63&n[i++])<<6|63&n[i++]),f>=65536?(f-=65536,o+=String.fromCharCode((f>>>10)+55296,(1023&f)+56320)):o+=String.fromCharCode(f));return o}function o(t,r,e,n){var i;e||(e=0),n||0===n||(n=this.length),r||(r=0);var o=n-e;if(t===this&&e<r&&r<n)for(i=o-1;i>=0;i--)t[i+r]=this[i+e];else for(i=0;i<o;i++)t[i+r]=this[i+e];return o}e.copy=o,e.toString=i,e.write=n;},{}],4:[function(t,r,e){function n(t){return new Array(t)}function i(t){if(!o.isBuffer(t)&&o.isView(t))t=o.Uint8Array.from(t);else if(o.isArrayBuffer(t))t=new Uint8Array(t);else {if("string"==typeof t)return o.from.call(e,t);if("number"==typeof t)throw new TypeError('"value" argument must not be a number')}return Array.prototype.slice.call(t)}var o=t("./bufferish"),e=r.exports=n(0);e.alloc=n,e.concat=o.concat,e.from=i;},{"./bufferish":8}],5:[function(t,r,e){function n(t){return new Buffer(t)}function i(t){if(!o.isBuffer(t)&&o.isView(t))t=o.Uint8Array.from(t);else if(o.isArrayBuffer(t))t=new Uint8Array(t);else {if("string"==typeof t)return o.from.call(e,t);if("number"==typeof t)throw new TypeError('"value" argument must not be a number')}return Buffer.from&&1!==Buffer.from.length?Buffer.from(t):new Buffer(t)}var o=t("./bufferish"),Buffer=o.global,e=r.exports=o.hasBuffer?n(0):[];e.alloc=o.hasBuffer&&Buffer.alloc||n,e.concat=o.concat,e.from=i;},{"./bufferish":8}],6:[function(t,r,e){function n(t,r,e,n){var o=a.isBuffer(this),f=a.isBuffer(t);if(o&&f)return this.copy(t,r,e,n);if(c||o||f||!a.isView(this)||!a.isView(t))return u.copy.call(this,t,r,e,n);var s=e||null!=n?i.call(this,e,n):this;return t.set(s,r),s.length}function i(t,r){var e=this.slice||!c&&this.subarray;if(e)return e.call(this,t,r);var i=a.alloc.call(this,r-t);return n.call(this,i,0,t,r),i}function o(t,r,e){var n=!s&&a.isBuffer(this)?this.toString:u.toString;return n.apply(this,arguments)}function f(t){function r(){var r=this[t]||u[t];return r.apply(this,arguments)}return r}var u=t("./buffer-lite");e.copy=n,e.slice=i,e.toString=o,e.write=f("write");var a=t("./bufferish"),Buffer=a.global,s=a.hasBuffer&&"TYPED_ARRAY_SUPPORT"in Buffer,c=s&&!Buffer.TYPED_ARRAY_SUPPORT;},{"./buffer-lite":3,"./bufferish":8}],7:[function(t,r,e){function n(t){return new Uint8Array(t)}function i(t){if(o.isView(t)){var r=t.byteOffset,n=t.byteLength;t=t.buffer,t.byteLength!==n&&(t.slice?t=t.slice(r,r+n):(t=new Uint8Array(t),t.byteLength!==n&&(t=Array.prototype.slice.call(t,r,r+n))));}else {if("string"==typeof t)return o.from.call(e,t);if("number"==typeof t)throw new TypeError('"value" argument must not be a number')}return new Uint8Array(t)}var o=t("./bufferish"),e=r.exports=o.hasArrayBuffer?n(0):[];e.alloc=n,e.concat=o.concat,e.from=i;},{"./bufferish":8}],8:[function(t,r,e){function n(t){return "string"==typeof t?u.call(this,t):a(this).from(t)}function i(t){return a(this).alloc(t)}function o(t,r){function n(t){r+=t.length;}function o(t){a+=w.copy.call(t,u,a);}r||(r=0,Array.prototype.forEach.call(t,n));var f=this!==e&&this||t[0],u=i.call(f,r),a=0;return Array.prototype.forEach.call(t,o),u}function f(t){return t instanceof ArrayBuffer||E(t)}function u(t){var r=3*t.length,e=i.call(this,r),n=w.write.call(e,t);return r!==n&&(e=w.slice.call(e,0,n)),e}function a(t){return d(t)?g:y(t)?b:p(t)?v:h?g:l?b:v}function s(){return !1}function c(t,r){return t="[object "+t+"]",function(e){return null!=e&&{}.toString.call(r?e[r]:e)===t}}var Buffer=e.global=t("./buffer-global"),h=e.hasBuffer=Buffer&&!!Buffer.isBuffer,l=e.hasArrayBuffer="undefined"!=typeof ArrayBuffer,p=e.isArray=t("isarray");e.isArrayBuffer=l?f:s;var d=e.isBuffer=h?Buffer.isBuffer:s,y=e.isView=l?ArrayBuffer.isView||c("ArrayBuffer","buffer"):s;e.alloc=i,e.concat=o,e.from=n;var v=e.Array=t("./bufferish-array"),g=e.Buffer=t("./bufferish-buffer"),b=e.Uint8Array=t("./bufferish-uint8array"),w=e.prototype=t("./bufferish-proto"),E=c("ArrayBuffer");},{"./buffer-global":2,"./bufferish-array":4,"./bufferish-buffer":5,"./bufferish-proto":6,"./bufferish-uint8array":7,isarray:34}],9:[function(t,r,e){function n(t){return this instanceof n?(this.options=t,void this.init()):new n(t)}function i(t){for(var r in t)n.prototype[r]=o(n.prototype[r],t[r]);}function o(t,r){function e(){return t.apply(this,arguments),r.apply(this,arguments)}return t&&r?e:t||r}function f(t){function r(t,r){return r(t)}return t=t.slice(),function(e){return t.reduce(r,e)}}function u(t){return s(t)?f(t):t}function a(t){return new n(t)}var s=t("isarray");e.createCodec=a,e.install=i,e.filter=u;var c=t("./bufferish");n.prototype.init=function(){var t=this.options;return t&&t.uint8array&&(this.bufferish=c.Uint8Array),this},e.preset=a({preset:!0});},{"./bufferish":8,isarray:34}],10:[function(t,r,e){t("./read-core"),t("./write-core"),e.codec={preset:t("./codec-base").preset};},{"./codec-base":9,"./read-core":22,"./write-core":25}],11:[function(t,r,e){function n(t){if(!(this instanceof n))return new n(t);if(t&&(this.options=t,t.codec)){var r=this.codec=t.codec;r.bufferish&&(this.bufferish=r.bufferish);}}e.DecodeBuffer=n;var i=t("./read-core").preset,o=t("./flex-buffer").FlexDecoder;o.mixin(n.prototype),n.prototype.codec=i,n.prototype.fetch=function(){return this.codec.decode(this)};},{"./flex-buffer":21,"./read-core":22}],12:[function(t,r,e){function n(t,r){var e=new i(r);return e.write(t),e.read()}e.decode=n;var i=t("./decode-buffer").DecodeBuffer;},{"./decode-buffer":11}],13:[function(t,r,e){function n(t){return this instanceof n?void o.call(this,t):new n(t)}e.Decoder=n;var i=t("event-lite"),o=t("./decode-buffer").DecodeBuffer;n.prototype=new o,i.mixin(n.prototype),n.prototype.decode=function(t){arguments.length&&this.write(t),this.flush();},n.prototype.push=function(t){this.emit("data",t);},n.prototype.end=function(t){this.decode(t),this.emit("end");};},{"./decode-buffer":11,"event-lite":31}],14:[function(t,r,e){function n(t){if(!(this instanceof n))return new n(t);if(t&&(this.options=t,t.codec)){var r=this.codec=t.codec;r.bufferish&&(this.bufferish=r.bufferish);}}e.EncodeBuffer=n;var i=t("./write-core").preset,o=t("./flex-buffer").FlexEncoder;o.mixin(n.prototype),n.prototype.codec=i,n.prototype.write=function(t){this.codec.encode(this,t);};},{"./flex-buffer":21,"./write-core":25}],15:[function(t,r,e){function n(t,r){var e=new i(r);return e.write(t),e.read()}e.encode=n;var i=t("./encode-buffer").EncodeBuffer;},{"./encode-buffer":14}],16:[function(t,r,e){function n(t){return this instanceof n?void o.call(this,t):new n(t)}e.Encoder=n;var i=t("event-lite"),o=t("./encode-buffer").EncodeBuffer;n.prototype=new o,i.mixin(n.prototype),n.prototype.encode=function(t){this.write(t),this.emit("data",this.read());},n.prototype.end=function(t){arguments.length&&this.encode(t),this.flush(),this.emit("end");};},{"./encode-buffer":14,"event-lite":31}],17:[function(t,r,e){function n(t,r){return this instanceof n?(this.buffer=i.from(t),void(this.type=r)):new n(t,r)}e.ExtBuffer=n;var i=t("./bufferish");},{"./bufferish":8}],18:[function(t,r,e){function n(t){t.addExtPacker(14,Error,[u,i]),t.addExtPacker(1,EvalError,[u,i]),t.addExtPacker(2,RangeError,[u,i]),t.addExtPacker(3,ReferenceError,[u,i]),t.addExtPacker(4,SyntaxError,[u,i]),t.addExtPacker(5,TypeError,[u,i]),t.addExtPacker(6,URIError,[u,i]),t.addExtPacker(10,RegExp,[f,i]),t.addExtPacker(11,Boolean,[o,i]),t.addExtPacker(12,String,[o,i]),t.addExtPacker(13,Date,[Number,i]),t.addExtPacker(15,Number,[o,i]),"undefined"!=typeof Uint8Array&&(t.addExtPacker(17,Int8Array,c),t.addExtPacker(18,Uint8Array,c),t.addExtPacker(19,Int16Array,c),t.addExtPacker(20,Uint16Array,c),t.addExtPacker(21,Int32Array,c),t.addExtPacker(22,Uint32Array,c),t.addExtPacker(23,Float32Array,c),"undefined"!=typeof Float64Array&&t.addExtPacker(24,Float64Array,c),"undefined"!=typeof Uint8ClampedArray&&t.addExtPacker(25,Uint8ClampedArray,c),t.addExtPacker(26,ArrayBuffer,c),t.addExtPacker(29,DataView,c)),s.hasBuffer&&t.addExtPacker(27,Buffer,s.from);}function i(r){return a||(a=t("./encode").encode),a(r)}function o(t){return t.valueOf()}function f(t){t=RegExp.prototype.toString.call(t).split("/"),t.shift();var r=[t.pop()];return r.unshift(t.join("/")),r}function u(t){var r={};for(var e in h)r[e]=t[e];return r}e.setExtPackers=n;var a,s=t("./bufferish"),Buffer=s.global,c=s.Uint8Array.from,h={name:1,message:1,stack:1,columnNumber:1,fileName:1,lineNumber:1};},{"./bufferish":8,"./encode":15}],19:[function(t,r,e){function n(t){t.addExtUnpacker(14,[i,f(Error)]),t.addExtUnpacker(1,[i,f(EvalError)]),t.addExtUnpacker(2,[i,f(RangeError)]),t.addExtUnpacker(3,[i,f(ReferenceError)]),t.addExtUnpacker(4,[i,f(SyntaxError)]),t.addExtUnpacker(5,[i,f(TypeError)]),t.addExtUnpacker(6,[i,f(URIError)]),t.addExtUnpacker(10,[i,o]),t.addExtUnpacker(11,[i,u(Boolean)]),t.addExtUnpacker(12,[i,u(String)]),t.addExtUnpacker(13,[i,u(Date)]),t.addExtUnpacker(15,[i,u(Number)]),"undefined"!=typeof Uint8Array&&(t.addExtUnpacker(17,u(Int8Array)),t.addExtUnpacker(18,u(Uint8Array)),t.addExtUnpacker(19,[a,u(Int16Array)]),t.addExtUnpacker(20,[a,u(Uint16Array)]),t.addExtUnpacker(21,[a,u(Int32Array)]),t.addExtUnpacker(22,[a,u(Uint32Array)]),t.addExtUnpacker(23,[a,u(Float32Array)]),"undefined"!=typeof Float64Array&&t.addExtUnpacker(24,[a,u(Float64Array)]),"undefined"!=typeof Uint8ClampedArray&&t.addExtUnpacker(25,u(Uint8ClampedArray)),t.addExtUnpacker(26,a),t.addExtUnpacker(29,[a,u(DataView)])),c.hasBuffer&&t.addExtUnpacker(27,u(Buffer));}function i(r){return s||(s=t("./decode").decode),s(r)}function o(t){return RegExp.apply(null,t)}function f(t){return function(r){var e=new t;for(var n in h)e[n]=r[n];return e}}function u(t){return function(r){return new t(r)}}function a(t){return new Uint8Array(t).buffer}e.setExtUnpackers=n;var s,c=t("./bufferish"),Buffer=c.global,h={name:1,message:1,stack:1,columnNumber:1,fileName:1,lineNumber:1};},{"./bufferish":8,"./decode":12}],20:[function(t,r,e){t("./read-core"),t("./write-core"),e.createCodec=t("./codec-base").createCodec;},{"./codec-base":9,"./read-core":22,"./write-core":25}],21:[function(t,r,e){function n(){if(!(this instanceof n))return new n}function i(){if(!(this instanceof i))return new i}function o(){function t(t){var r=this.offset?p.prototype.slice.call(this.buffer,this.offset):this.buffer;this.buffer=r?t?this.bufferish.concat([r,t]):r:t,this.offset=0;}function r(){for(;this.offset<this.buffer.length;){var t,r=this.offset;try{t=this.fetch();}catch(t){if(t&&t.message!=v)throw t;this.offset=r;break}this.push(t);}}function e(t){var r=this.offset,e=r+t;if(e>this.buffer.length)throw new Error(v);return this.offset=e,r}return {bufferish:p,write:t,fetch:a,flush:r,push:c,pull:h,read:s,reserve:e,offset:0}}function f(){function t(){var t=this.start;if(t<this.offset){var r=this.start=this.offset;return p.prototype.slice.call(this.buffer,t,r)}}function r(){for(;this.start<this.offset;){var t=this.fetch();t&&this.push(t);}}function e(){var t=this.buffers||(this.buffers=[]),r=t.length>1?this.bufferish.concat(t):t[0];return t.length=0,r}function n(t){var r=0|t;if(this.buffer){var e=this.buffer.length,n=0|this.offset,i=n+r;if(i<e)return this.offset=i,n;this.flush(),t=Math.max(t,Math.min(2*e,this.maxBufferSize));}return t=Math.max(t,this.minBufferSize),this.buffer=this.bufferish.alloc(t),this.start=0,this.offset=r,0}function i(t){var r=t.length;if(r>this.minBufferSize)this.flush(),this.push(t);else {var e=this.reserve(r);p.prototype.copy.call(t,this.buffer,e);}}return {bufferish:p,write:u,fetch:t,flush:r,push:c,pull:e,read:s,reserve:n,send:i,maxBufferSize:y,minBufferSize:d,offset:0,start:0}}function u(){throw new Error("method not implemented: write()")}function a(){throw new Error("method not implemented: fetch()")}function s(){var t=this.buffers&&this.buffers.length;return t?(this.flush(),this.pull()):this.fetch()}function c(t){var r=this.buffers||(this.buffers=[]);r.push(t);}function h(){var t=this.buffers||(this.buffers=[]);return t.shift()}function l(t){function r(r){for(var e in t)r[e]=t[e];return r}return r}e.FlexDecoder=n,e.FlexEncoder=i;var p=t("./bufferish"),d=2048,y=65536,v="BUFFER_SHORTAGE";n.mixin=l(o()),n.mixin(n.prototype),i.mixin=l(f()),i.mixin(i.prototype);},{"./bufferish":8}],22:[function(t,r,e){function n(t){function r(t){var r=s(t),n=e[r];if(!n)throw new Error("Invalid type: "+(r?"0x"+r.toString(16):r));return n(t)}var e=c.getReadToken(t);return r}function i(){var t=this.options;return this.decode=n(t),t&&t.preset&&a.setExtUnpackers(this),this}function o(t,r){var e=this.extUnpackers||(this.extUnpackers=[]);e[t]=h.filter(r);}function f(t){function r(r){return new u(r,t)}var e=this.extUnpackers||(this.extUnpackers=[]);return e[t]||r}var u=t("./ext-buffer").ExtBuffer,a=t("./ext-unpacker"),s=t("./read-format").readUint8,c=t("./read-token"),h=t("./codec-base");h.install({addExtUnpacker:o,getExtUnpacker:f,init:i}),e.preset=i.call(h.preset);},{"./codec-base":9,"./ext-buffer":17,"./ext-unpacker":19,"./read-format":23,"./read-token":24}],23:[function(t,r,e){function n(t){var r=k.hasArrayBuffer&&t&&t.binarraybuffer,e=t&&t.int64,n=T&&t&&t.usemap,B={map:n?o:i,array:f,str:u,bin:r?s:a,ext:c,uint8:h,uint16:p,uint32:y,uint64:g(8,e?E:b),int8:l,int16:d,int32:v,int64:g(8,e?A:w),float32:g(4,m),float64:g(8,x)};return B}function i(t,r){var e,n={},i=new Array(r),o=new Array(r),f=t.codec.decode;for(e=0;e<r;e++)i[e]=f(t),o[e]=f(t);for(e=0;e<r;e++)n[i[e]]=o[e];return n}function o(t,r){var e,n=new Map,i=new Array(r),o=new Array(r),f=t.codec.decode;for(e=0;e<r;e++)i[e]=f(t),o[e]=f(t);for(e=0;e<r;e++)n.set(i[e],o[e]);return n}function f(t,r){for(var e=new Array(r),n=t.codec.decode,i=0;i<r;i++)e[i]=n(t);return e}function u(t,r){var e=t.reserve(r),n=e+r;return _.toString.call(t.buffer,"utf-8",e,n)}function a(t,r){var e=t.reserve(r),n=e+r,i=_.slice.call(t.buffer,e,n);return k.from(i)}function s(t,r){var e=t.reserve(r),n=e+r,i=_.slice.call(t.buffer,e,n);return k.Uint8Array.from(i).buffer}function c(t,r){var e=t.reserve(r+1),n=t.buffer[e++],i=e+r,o=t.codec.getExtUnpacker(n);if(!o)throw new Error("Invalid ext type: "+(n?"0x"+n.toString(16):n));var f=_.slice.call(t.buffer,e,i);return o(f)}function h(t){var r=t.reserve(1);return t.buffer[r]}function l(t){var r=t.reserve(1),e=t.buffer[r];return 128&e?e-256:e}function p(t){var r=t.reserve(2),e=t.buffer;return e[r++]<<8|e[r]}function d(t){var r=t.reserve(2),e=t.buffer,n=e[r++]<<8|e[r];return 32768&n?n-65536:n}function y(t){var r=t.reserve(4),e=t.buffer;return 16777216*e[r++]+(e[r++]<<16)+(e[r++]<<8)+e[r]}function v(t){var r=t.reserve(4),e=t.buffer;return e[r++]<<24|e[r++]<<16|e[r++]<<8|e[r]}function g(t,r){return function(e){var n=e.reserve(t);return r.call(e.buffer,n,S)}}function b(t){return new P(this,t).toNumber()}function w(t){return new R(this,t).toNumber()}function E(t){return new P(this,t)}function A(t){return new R(this,t)}function m(t){return B.read(this,t,!1,23,4)}function x(t){return B.read(this,t,!1,52,8)}var B=t("ieee754"),U=t("int64-buffer"),P=U.Uint64BE,R=U.Int64BE;e.getReadFormat=n,e.readUint8=h;var k=t("./bufferish"),_=t("./bufferish-proto"),T="undefined"!=typeof Map,S=!0;},{"./bufferish":8,"./bufferish-proto":6,ieee754:32,"int64-buffer":33}],24:[function(t,r,e){function n(t){var r=s.getReadFormat(t);return t&&t.useraw?o(r):i(r)}function i(t){var r,e=new Array(256);for(r=0;r<=127;r++)e[r]=f(r);for(r=128;r<=143;r++)e[r]=a(r-128,t.map);for(r=144;r<=159;r++)e[r]=a(r-144,t.array);for(r=160;r<=191;r++)e[r]=a(r-160,t.str);for(e[192]=f(null),e[193]=null,e[194]=f(!1),e[195]=f(!0),e[196]=u(t.uint8,t.bin),e[197]=u(t.uint16,t.bin),e[198]=u(t.uint32,t.bin),e[199]=u(t.uint8,t.ext),e[200]=u(t.uint16,t.ext),e[201]=u(t.uint32,t.ext),e[202]=t.float32,e[203]=t.float64,e[204]=t.uint8,e[205]=t.uint16,e[206]=t.uint32,e[207]=t.uint64,e[208]=t.int8,e[209]=t.int16,e[210]=t.int32,e[211]=t.int64,e[212]=a(1,t.ext),e[213]=a(2,t.ext),e[214]=a(4,t.ext),e[215]=a(8,t.ext),e[216]=a(16,t.ext),e[217]=u(t.uint8,t.str),e[218]=u(t.uint16,t.str),e[219]=u(t.uint32,t.str),e[220]=u(t.uint16,t.array),e[221]=u(t.uint32,t.array),e[222]=u(t.uint16,t.map),e[223]=u(t.uint32,t.map),r=224;r<=255;r++)e[r]=f(r-256);return e}function o(t){var r,e=i(t).slice();for(e[217]=e[196],e[218]=e[197],e[219]=e[198],r=160;r<=191;r++)e[r]=a(r-160,t.bin);return e}function f(t){return function(){return t}}function u(t,r){return function(e){var n=t(e);return r(e,n)}}function a(t,r){return function(e){return r(e,t)}}var s=t("./read-format");e.getReadToken=n;},{"./read-format":23}],25:[function(t,r,e){function n(t){function r(t,r){var n=e[typeof r];if(!n)throw new Error('Unsupported type "'+typeof r+'": '+r);n(t,r);}var e=s.getWriteType(t);return r}function i(){var t=this.options;return this.encode=n(t),t&&t.preset&&a.setExtPackers(this),this}function o(t,r,e){function n(r){return e&&(r=e(r)),new u(r,t)}e=c.filter(e);var i=r.name;if(i&&"Object"!==i){var o=this.extPackers||(this.extPackers={});o[i]=n;}else {var f=this.extEncoderList||(this.extEncoderList=[]);f.unshift([r,n]);}}function f(t){var r=this.extPackers||(this.extPackers={}),e=t.constructor,n=e&&e.name&&r[e.name];if(n)return n;for(var i=this.extEncoderList||(this.extEncoderList=[]),o=i.length,f=0;f<o;f++){var u=i[f];if(e===u[0])return u[1]}}var u=t("./ext-buffer").ExtBuffer,a=t("./ext-packer"),s=t("./write-type"),c=t("./codec-base");c.install({addExtPacker:o,getExtPacker:f,init:i}),e.preset=i.call(c.preset);},{"./codec-base":9,"./ext-buffer":17,"./ext-packer":18,"./write-type":27}],26:[function(t,r,e){function n(t){return t&&t.uint8array?i():m||E.hasBuffer&&t&&t.safe?f():o()}function i(){var t=o();return t[202]=c(202,4,p),t[203]=c(203,8,d),t}function o(){var t=w.slice();return t[196]=u(196),t[197]=a(197),t[198]=s(198),t[199]=u(199),t[200]=a(200),t[201]=s(201),t[202]=c(202,4,x.writeFloatBE||p,!0),t[203]=c(203,8,x.writeDoubleBE||d,!0),t[204]=u(204),t[205]=a(205),t[206]=s(206),t[207]=c(207,8,h),t[208]=u(208),t[209]=a(209),t[210]=s(210),t[211]=c(211,8,l),t[217]=u(217),t[218]=a(218),t[219]=s(219),t[220]=a(220),t[221]=s(221),t[222]=a(222),t[223]=s(223),t}function f(){var t=w.slice();return t[196]=c(196,1,Buffer.prototype.writeUInt8),t[197]=c(197,2,Buffer.prototype.writeUInt16BE),t[198]=c(198,4,Buffer.prototype.writeUInt32BE),t[199]=c(199,1,Buffer.prototype.writeUInt8),t[200]=c(200,2,Buffer.prototype.writeUInt16BE),t[201]=c(201,4,Buffer.prototype.writeUInt32BE),t[202]=c(202,4,Buffer.prototype.writeFloatBE),t[203]=c(203,8,Buffer.prototype.writeDoubleBE),t[204]=c(204,1,Buffer.prototype.writeUInt8),t[205]=c(205,2,Buffer.prototype.writeUInt16BE),t[206]=c(206,4,Buffer.prototype.writeUInt32BE),t[207]=c(207,8,h),t[208]=c(208,1,Buffer.prototype.writeInt8),t[209]=c(209,2,Buffer.prototype.writeInt16BE),t[210]=c(210,4,Buffer.prototype.writeInt32BE),t[211]=c(211,8,l),t[217]=c(217,1,Buffer.prototype.writeUInt8),t[218]=c(218,2,Buffer.prototype.writeUInt16BE),t[219]=c(219,4,Buffer.prototype.writeUInt32BE),t[220]=c(220,2,Buffer.prototype.writeUInt16BE),t[221]=c(221,4,Buffer.prototype.writeUInt32BE),t[222]=c(222,2,Buffer.prototype.writeUInt16BE),t[223]=c(223,4,Buffer.prototype.writeUInt32BE),t}function u(t){return function(r,e){var n=r.reserve(2),i=r.buffer;i[n++]=t,i[n]=e;}}function a(t){return function(r,e){var n=r.reserve(3),i=r.buffer;i[n++]=t,i[n++]=e>>>8,i[n]=e;}}function s(t){return function(r,e){var n=r.reserve(5),i=r.buffer;i[n++]=t,i[n++]=e>>>24,i[n++]=e>>>16,i[n++]=e>>>8,i[n]=e;}}function c(t,r,e,n){return function(i,o){var f=i.reserve(r+1);i.buffer[f++]=t,e.call(i.buffer,o,f,n);}}function h(t,r){new g(this,r,t);}function l(t,r){new b(this,r,t);}function p(t,r){y.write(this,t,r,!1,23,4);}function d(t,r){y.write(this,t,r,!1,52,8);}var y=t("ieee754"),v=t("int64-buffer"),g=v.Uint64BE,b=v.Int64BE,w=t("./write-uint8").uint8,E=t("./bufferish"),Buffer=E.global,A=E.hasBuffer&&"TYPED_ARRAY_SUPPORT"in Buffer,m=A&&!Buffer.TYPED_ARRAY_SUPPORT,x=E.hasBuffer&&Buffer.prototype||{};e.getWriteToken=n;},{"./bufferish":8,"./write-uint8":28,ieee754:32,"int64-buffer":33}],27:[function(t,r,e){function n(t){function r(t,r){var e=r?195:194;_[e](t,r);}function e(t,r){var e,n=0|r;return r!==n?(e=203,void _[e](t,r)):(e=-32<=n&&n<=127?255&n:0<=n?n<=255?204:n<=65535?205:206:-128<=n?208:-32768<=n?209:210,void _[e](t,n))}function n(t,r){var e=207;_[e](t,r.toArray());}function o(t,r){var e=211;_[e](t,r.toArray());}function v(t){return t<32?1:t<=255?2:t<=65535?3:5}function g(t){return t<32?1:t<=65535?3:5}function b(t){function r(r,e){var n=e.length,i=5+3*n;r.offset=r.reserve(i);var o=r.buffer,f=t(n),u=r.offset+f;n=s.write.call(o,e,u);var a=t(n);if(f!==a){var c=u+a-f,h=u+n;s.copy.call(o,o,c,u,h);}var l=1===a?160+n:a<=3?215+a:219;_[l](r,n),r.offset+=n;}return r}function w(t,r){if(null===r)return A(t,r);if(I(r))return Y(t,r);if(i(r))return m(t,r);if(f.isUint64BE(r))return n(t,r);if(u.isInt64BE(r))return o(t,r);var e=t.codec.getExtPacker(r);return e&&(r=e(r)),r instanceof l?U(t,r):void D(t,r)}function E(t,r){return I(r)?k(t,r):void w(t,r)}function A(t,r){var e=192;_[e](t,r);}function m(t,r){var e=r.length,n=e<16?144+e:e<=65535?220:221;_[n](t,e);for(var i=t.codec.encode,o=0;o<e;o++)i(t,r[o]);}function x(t,r){var e=r.length,n=e<255?196:e<=65535?197:198;_[n](t,e),t.send(r);}function B(t,r){x(t,new Uint8Array(r));}function U(t,r){var e=r.buffer,n=e.length,i=y[n]||(n<255?199:n<=65535?200:201);_[i](t,n),h[r.type](t),t.send(e);}function P(t,r){var e=Object.keys(r),n=e.length,i=n<16?128+n:n<=65535?222:223;_[i](t,n);var o=t.codec.encode;e.forEach(function(e){o(t,e),o(t,r[e]);});}function R(t,r){if(!(r instanceof Map))return P(t,r);var e=r.size,n=e<16?128+e:e<=65535?222:223;_[n](t,e);var i=t.codec.encode;r.forEach(function(r,e,n){i(t,e),i(t,r);});}function k(t,r){var e=r.length,n=e<32?160+e:e<=65535?218:219;_[n](t,e),t.send(r);}var _=c.getWriteToken(t),T=t&&t.useraw,S=p&&t&&t.binarraybuffer,I=S?a.isArrayBuffer:a.isBuffer,Y=S?B:x,C=d&&t&&t.usemap,D=C?R:P,O={boolean:r,function:A,number:e,object:T?E:w,string:b(T?g:v),symbol:A,undefined:A};return O}var i=t("isarray"),o=t("int64-buffer"),f=o.Uint64BE,u=o.Int64BE,a=t("./bufferish"),s=t("./bufferish-proto"),c=t("./write-token"),h=t("./write-uint8").uint8,l=t("./ext-buffer").ExtBuffer,p="undefined"!=typeof Uint8Array,d="undefined"!=typeof Map,y=[];y[1]=212,y[2]=213,y[4]=214,y[8]=215,y[16]=216,e.getWriteType=n;},{"./bufferish":8,"./bufferish-proto":6,"./ext-buffer":17,"./write-token":26,"./write-uint8":28,"int64-buffer":33,isarray:34}],28:[function(t,r,e){function n(t){return function(r){var e=r.reserve(1);r.buffer[e]=t;}}for(var i=e.uint8=new Array(256),o=0;o<=255;o++)i[o]=n(o);},{}],29:[function(t,r,e){(function(r){function n(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return !1}}function i(){return Buffer.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function o(t,r){if(i()<r)throw new RangeError("Invalid typed array length");return Buffer.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(r),t.__proto__=Buffer.prototype):(null===t&&(t=new Buffer(r)),t.length=r),t}function Buffer(t,r,e){if(!(Buffer.TYPED_ARRAY_SUPPORT||this instanceof Buffer))return new Buffer(t,r,e);if("number"==typeof t){if("string"==typeof r)throw new Error("If encoding is specified then the first argument must be a string");return s(this,t)}return f(this,t,r,e)}function f(t,r,e,n){if("number"==typeof r)throw new TypeError('"value" argument must not be a number');return "undefined"!=typeof ArrayBuffer&&r instanceof ArrayBuffer?l(t,r,e,n):"string"==typeof r?c(t,r,e):p(t,r)}function u(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function a(t,r,e,n){return u(r),r<=0?o(t,r):void 0!==e?"string"==typeof n?o(t,r).fill(e,n):o(t,r).fill(e):o(t,r)}function s(t,r){if(u(r),t=o(t,r<0?0:0|d(r)),!Buffer.TYPED_ARRAY_SUPPORT)for(var e=0;e<r;++e)t[e]=0;return t}function c(t,r,e){if("string"==typeof e&&""!==e||(e="utf8"),!Buffer.isEncoding(e))throw new TypeError('"encoding" must be a valid string encoding');var n=0|v(r,e);t=o(t,n);var i=t.write(r,e);return i!==n&&(t=t.slice(0,i)),t}function h(t,r){var e=r.length<0?0:0|d(r.length);t=o(t,e);for(var n=0;n<e;n+=1)t[n]=255&r[n];return t}function l(t,r,e,n){if(r.byteLength,e<0||r.byteLength<e)throw new RangeError("'offset' is out of bounds");if(r.byteLength<e+(n||0))throw new RangeError("'length' is out of bounds");return r=void 0===e&&void 0===n?new Uint8Array(r):void 0===n?new Uint8Array(r,e):new Uint8Array(r,e,n),Buffer.TYPED_ARRAY_SUPPORT?(t=r,t.__proto__=Buffer.prototype):t=h(t,r),t}function p(t,r){if(Buffer.isBuffer(r)){var e=0|d(r.length);return t=o(t,e),0===t.length?t:(r.copy(t,0,0,e),t)}if(r){if("undefined"!=typeof ArrayBuffer&&r.buffer instanceof ArrayBuffer||"length"in r)return "number"!=typeof r.length||H(r.length)?o(t,0):h(t,r);if("Buffer"===r.type&&Q(r.data))return h(t,r.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function d(t){if(t>=i())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+i().toString(16)+" bytes");return 0|t}function y(t){return +t!=t&&(t=0),Buffer.alloc(+t)}function v(t,r){if(Buffer.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var e=t.length;if(0===e)return 0;for(var n=!1;;)switch(r){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":case void 0:return q(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*e;case"hex":return e>>>1;case"base64":return X(t).length;default:if(n)return q(t).length;r=(""+r).toLowerCase(),n=!0;}}function g(t,r,e){var n=!1;if((void 0===r||r<0)&&(r=0),r>this.length)return "";if((void 0===e||e>this.length)&&(e=this.length),e<=0)return "";if(e>>>=0,r>>>=0,e<=r)return "";for(t||(t="utf8");;)switch(t){case"hex":return I(this,r,e);case"utf8":case"utf-8":return k(this,r,e);case"ascii":return T(this,r,e);case"latin1":case"binary":return S(this,r,e);case"base64":return R(this,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Y(this,r,e);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0;}}function b(t,r,e){var n=t[r];t[r]=t[e],t[e]=n;}function w(t,r,e,n,i){if(0===t.length)return -1;if("string"==typeof e?(n=e,e=0):e>2147483647?e=2147483647:e<-2147483648&&(e=-2147483648),e=+e,isNaN(e)&&(e=i?0:t.length-1),e<0&&(e=t.length+e),e>=t.length){if(i)return -1;e=t.length-1;}else if(e<0){if(!i)return -1;e=0;}if("string"==typeof r&&(r=Buffer.from(r,n)),Buffer.isBuffer(r))return 0===r.length?-1:E(t,r,e,n,i);if("number"==typeof r)return r=255&r,Buffer.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,r,e):Uint8Array.prototype.lastIndexOf.call(t,r,e):E(t,[r],e,n,i);throw new TypeError("val must be string, number or Buffer")}function E(t,r,e,n,i){function o(t,r){return 1===f?t[r]:t.readUInt16BE(r*f)}var f=1,u=t.length,a=r.length;if(void 0!==n&&(n=String(n).toLowerCase(),"ucs2"===n||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||r.length<2)return -1;f=2,u/=2,a/=2,e/=2;}var s;if(i){var c=-1;for(s=e;s<u;s++)if(o(t,s)===o(r,c===-1?0:s-c)){if(c===-1&&(c=s),s-c+1===a)return c*f}else c!==-1&&(s-=s-c),c=-1;}else for(e+a>u&&(e=u-a),s=e;s>=0;s--){for(var h=!0,l=0;l<a;l++)if(o(t,s+l)!==o(r,l)){h=!1;break}if(h)return s}return -1}function A(t,r,e,n){e=Number(e)||0;var i=t.length-e;n?(n=Number(n),n>i&&(n=i)):n=i;var o=r.length;if(o%2!==0)throw new TypeError("Invalid hex string");n>o/2&&(n=o/2);for(var f=0;f<n;++f){var u=parseInt(r.substr(2*f,2),16);if(isNaN(u))return f;t[e+f]=u;}return f}function m(t,r,e,n){return G(q(r,t.length-e),t,e,n)}function x(t,r,e,n){return G(W(r),t,e,n)}function B(t,r,e,n){return x(t,r,e,n)}function U(t,r,e,n){return G(X(r),t,e,n)}function P(t,r,e,n){return G(J(r,t.length-e),t,e,n)}function R(t,r,e){return 0===r&&e===t.length?Z.fromByteArray(t):Z.fromByteArray(t.slice(r,e))}function k(t,r,e){e=Math.min(t.length,e);for(var n=[],i=r;i<e;){var o=t[i],f=null,u=o>239?4:o>223?3:o>191?2:1;if(i+u<=e){var a,s,c,h;switch(u){case 1:o<128&&(f=o);break;case 2:a=t[i+1],128===(192&a)&&(h=(31&o)<<6|63&a,h>127&&(f=h));break;case 3:a=t[i+1],s=t[i+2],128===(192&a)&&128===(192&s)&&(h=(15&o)<<12|(63&a)<<6|63&s,h>2047&&(h<55296||h>57343)&&(f=h));break;case 4:a=t[i+1],s=t[i+2],c=t[i+3],128===(192&a)&&128===(192&s)&&128===(192&c)&&(h=(15&o)<<18|(63&a)<<12|(63&s)<<6|63&c,h>65535&&h<1114112&&(f=h));}}null===f?(f=65533,u=1):f>65535&&(f-=65536,n.push(f>>>10&1023|55296),f=56320|1023&f),n.push(f),i+=u;}return _(n)}function _(t){var r=t.length;if(r<=$)return String.fromCharCode.apply(String,t);for(var e="",n=0;n<r;)e+=String.fromCharCode.apply(String,t.slice(n,n+=$));return e}function T(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(127&t[i]);return n}function S(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(t[i]);return n}function I(t,r,e){var n=t.length;(!r||r<0)&&(r=0),(!e||e<0||e>n)&&(e=n);for(var i="",o=r;o<e;++o)i+=V(t[o]);return i}function Y(t,r,e){for(var n=t.slice(r,e),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function C(t,r,e){if(t%1!==0||t<0)throw new RangeError("offset is not uint");if(t+r>e)throw new RangeError("Trying to access beyond buffer length")}function D(t,r,e,n,i,o){if(!Buffer.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(r>i||r<o)throw new RangeError('"value" argument is out of bounds');if(e+n>t.length)throw new RangeError("Index out of range")}function O(t,r,e,n){r<0&&(r=65535+r+1);for(var i=0,o=Math.min(t.length-e,2);i<o;++i)t[e+i]=(r&255<<8*(n?i:1-i))>>>8*(n?i:1-i);}function L(t,r,e,n){r<0&&(r=4294967295+r+1);for(var i=0,o=Math.min(t.length-e,4);i<o;++i)t[e+i]=r>>>8*(n?i:3-i)&255;}function M(t,r,e,n,i,o){if(e+n>t.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function N(t,r,e,n,i){return i||M(t,r,e,4),K.write(t,r,e,n,23,4),e+4}function F(t,r,e,n,i){return i||M(t,r,e,8),K.write(t,r,e,n,52,8),e+8}function j(t){
if(t=z(t).replace(tt,""),t.length<2)return "";for(;t.length%4!==0;)t+="=";return t}function z(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function V(t){return t<16?"0"+t.toString(16):t.toString(16)}function q(t,r){r=r||1/0;for(var e,n=t.length,i=null,o=[],f=0;f<n;++f){if(e=t.charCodeAt(f),e>55295&&e<57344){if(!i){if(e>56319){(r-=3)>-1&&o.push(239,191,189);continue}if(f+1===n){(r-=3)>-1&&o.push(239,191,189);continue}i=e;continue}if(e<56320){(r-=3)>-1&&o.push(239,191,189),i=e;continue}e=(i-55296<<10|e-56320)+65536;}else i&&(r-=3)>-1&&o.push(239,191,189);if(i=null,e<128){if((r-=1)<0)break;o.push(e);}else if(e<2048){if((r-=2)<0)break;o.push(e>>6|192,63&e|128);}else if(e<65536){if((r-=3)<0)break;o.push(e>>12|224,e>>6&63|128,63&e|128);}else {if(!(e<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;o.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128);}}return o}function W(t){for(var r=[],e=0;e<t.length;++e)r.push(255&t.charCodeAt(e));return r}function J(t,r){for(var e,n,i,o=[],f=0;f<t.length&&!((r-=2)<0);++f)e=t.charCodeAt(f),n=e>>8,i=e%256,o.push(i),o.push(n);return o}function X(t){return Z.toByteArray(j(t))}function G(t,r,e,n){for(var i=0;i<n&&!(i+e>=r.length||i>=t.length);++i)r[i+e]=t[i];return i}function H(t){return t!==t}var Z=t("base64-js"),K=t("ieee754"),Q=t("isarray");e.Buffer=Buffer,e.SlowBuffer=y,e.INSPECT_MAX_BYTES=50,Buffer.TYPED_ARRAY_SUPPORT=void 0!==r.TYPED_ARRAY_SUPPORT?r.TYPED_ARRAY_SUPPORT:n(),e.kMaxLength=i(),Buffer.poolSize=8192,Buffer._augment=function(t){return t.__proto__=Buffer.prototype,t},Buffer.from=function(t,r,e){return f(null,t,r,e)},Buffer.TYPED_ARRAY_SUPPORT&&(Buffer.prototype.__proto__=Uint8Array.prototype,Buffer.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&Buffer[Symbol.species]===Buffer&&Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:!0})),Buffer.alloc=function(t,r,e){return a(null,t,r,e)},Buffer.allocUnsafe=function(t){return s(null,t)},Buffer.allocUnsafeSlow=function(t){return s(null,t)},Buffer.isBuffer=function(t){return !(null==t||!t._isBuffer)},Buffer.compare=function(t,r){if(!Buffer.isBuffer(t)||!Buffer.isBuffer(r))throw new TypeError("Arguments must be Buffers");if(t===r)return 0;for(var e=t.length,n=r.length,i=0,o=Math.min(e,n);i<o;++i)if(t[i]!==r[i]){e=t[i],n=r[i];break}return e<n?-1:n<e?1:0},Buffer.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return !0;default:return !1}},Buffer.concat=function(t,r){if(!Q(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return Buffer.alloc(0);var e;if(void 0===r)for(r=0,e=0;e<t.length;++e)r+=t[e].length;var n=Buffer.allocUnsafe(r),i=0;for(e=0;e<t.length;++e){var o=t[e];if(!Buffer.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(n,i),i+=o.length;}return n},Buffer.byteLength=v,Buffer.prototype._isBuffer=!0,Buffer.prototype.swap16=function(){var t=this.length;if(t%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var r=0;r<t;r+=2)b(this,r,r+1);return this},Buffer.prototype.swap32=function(){var t=this.length;if(t%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var r=0;r<t;r+=4)b(this,r,r+3),b(this,r+1,r+2);return this},Buffer.prototype.swap64=function(){var t=this.length;if(t%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var r=0;r<t;r+=8)b(this,r,r+7),b(this,r+1,r+6),b(this,r+2,r+5),b(this,r+3,r+4);return this},Buffer.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?k(this,0,t):g.apply(this,arguments)},Buffer.prototype.equals=function(t){if(!Buffer.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===Buffer.compare(this,t)},Buffer.prototype.inspect=function(){var t="",r=e.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(t+=" ... ")),"<Buffer "+t+">"},Buffer.prototype.compare=function(t,r,e,n,i){if(!Buffer.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===r&&(r=0),void 0===e&&(e=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),r<0||e>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&r>=e)return 0;if(n>=i)return -1;if(r>=e)return 1;if(r>>>=0,e>>>=0,n>>>=0,i>>>=0,this===t)return 0;for(var o=i-n,f=e-r,u=Math.min(o,f),a=this.slice(n,i),s=t.slice(r,e),c=0;c<u;++c)if(a[c]!==s[c]){o=a[c],f=s[c];break}return o<f?-1:f<o?1:0},Buffer.prototype.includes=function(t,r,e){return this.indexOf(t,r,e)!==-1},Buffer.prototype.indexOf=function(t,r,e){return w(this,t,r,e,!0)},Buffer.prototype.lastIndexOf=function(t,r,e){return w(this,t,r,e,!1)},Buffer.prototype.write=function(t,r,e,n){if(void 0===r)n="utf8",e=this.length,r=0;else if(void 0===e&&"string"==typeof r)n=r,e=this.length,r=0;else {if(!isFinite(r))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r=0|r,isFinite(e)?(e=0|e,void 0===n&&(n="utf8")):(n=e,e=void 0);}var i=this.length-r;if((void 0===e||e>i)&&(e=i),t.length>0&&(e<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return A(this,t,r,e);case"utf8":case"utf-8":return m(this,t,r,e);case"ascii":return x(this,t,r,e);case"latin1":case"binary":return B(this,t,r,e);case"base64":return U(this,t,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return P(this,t,r,e);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0;}},Buffer.prototype.toJSON=function(){return {type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var $=4096;Buffer.prototype.slice=function(t,r){var e=this.length;t=~~t,r=void 0===r?e:~~r,t<0?(t+=e,t<0&&(t=0)):t>e&&(t=e),r<0?(r+=e,r<0&&(r=0)):r>e&&(r=e),r<t&&(r=t);var n;if(Buffer.TYPED_ARRAY_SUPPORT)n=this.subarray(t,r),n.__proto__=Buffer.prototype;else {var i=r-t;n=new Buffer(i,void 0);for(var o=0;o<i;++o)n[o]=this[o+t];}return n},Buffer.prototype.readUIntLE=function(t,r,e){t=0|t,r=0|r,e||C(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return n},Buffer.prototype.readUIntBE=function(t,r,e){t=0|t,r=0|r,e||C(t,r,this.length);for(var n=this[t+--r],i=1;r>0&&(i*=256);)n+=this[t+--r]*i;return n},Buffer.prototype.readUInt8=function(t,r){return r||C(t,1,this.length),this[t]},Buffer.prototype.readUInt16LE=function(t,r){return r||C(t,2,this.length),this[t]|this[t+1]<<8},Buffer.prototype.readUInt16BE=function(t,r){return r||C(t,2,this.length),this[t]<<8|this[t+1]},Buffer.prototype.readUInt32LE=function(t,r){return r||C(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},Buffer.prototype.readUInt32BE=function(t,r){return r||C(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},Buffer.prototype.readIntLE=function(t,r,e){t=0|t,r=0|r,e||C(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return i*=128,n>=i&&(n-=Math.pow(2,8*r)),n},Buffer.prototype.readIntBE=function(t,r,e){t=0|t,r=0|r,e||C(t,r,this.length);for(var n=r,i=1,o=this[t+--n];n>0&&(i*=256);)o+=this[t+--n]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*r)),o},Buffer.prototype.readInt8=function(t,r){return r||C(t,1,this.length),128&this[t]?(255-this[t]+1)*-1:this[t]},Buffer.prototype.readInt16LE=function(t,r){r||C(t,2,this.length);var e=this[t]|this[t+1]<<8;return 32768&e?4294901760|e:e},Buffer.prototype.readInt16BE=function(t,r){r||C(t,2,this.length);var e=this[t+1]|this[t]<<8;return 32768&e?4294901760|e:e},Buffer.prototype.readInt32LE=function(t,r){return r||C(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},Buffer.prototype.readInt32BE=function(t,r){return r||C(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},Buffer.prototype.readFloatLE=function(t,r){return r||C(t,4,this.length),K.read(this,t,!0,23,4)},Buffer.prototype.readFloatBE=function(t,r){return r||C(t,4,this.length),K.read(this,t,!1,23,4)},Buffer.prototype.readDoubleLE=function(t,r){return r||C(t,8,this.length),K.read(this,t,!0,52,8)},Buffer.prototype.readDoubleBE=function(t,r){return r||C(t,8,this.length),K.read(this,t,!1,52,8)},Buffer.prototype.writeUIntLE=function(t,r,e,n){if(t=+t,r=0|r,e=0|e,!n){var i=Math.pow(2,8*e)-1;D(this,t,r,e,i,0);}var o=1,f=0;for(this[r]=255&t;++f<e&&(o*=256);)this[r+f]=t/o&255;return r+e},Buffer.prototype.writeUIntBE=function(t,r,e,n){if(t=+t,r=0|r,e=0|e,!n){var i=Math.pow(2,8*e)-1;D(this,t,r,e,i,0);}var o=e-1,f=1;for(this[r+o]=255&t;--o>=0&&(f*=256);)this[r+o]=t/f&255;return r+e},Buffer.prototype.writeUInt8=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,1,255,0),Buffer.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[r]=255&t,r+1},Buffer.prototype.writeUInt16LE=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8):O(this,t,r,!0),r+2},Buffer.prototype.writeUInt16BE=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[r]=t>>>8,this[r+1]=255&t):O(this,t,r,!1),r+2},Buffer.prototype.writeUInt32LE=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=255&t):L(this,t,r,!0),r+4},Buffer.prototype.writeUInt32BE=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t):L(this,t,r,!1),r+4},Buffer.prototype.writeIntLE=function(t,r,e,n){if(t=+t,r=0|r,!n){var i=Math.pow(2,8*e-1);D(this,t,r,e,i-1,-i);}var o=0,f=1,u=0;for(this[r]=255&t;++o<e&&(f*=256);)t<0&&0===u&&0!==this[r+o-1]&&(u=1),this[r+o]=(t/f>>0)-u&255;return r+e},Buffer.prototype.writeIntBE=function(t,r,e,n){if(t=+t,r=0|r,!n){var i=Math.pow(2,8*e-1);D(this,t,r,e,i-1,-i);}var o=e-1,f=1,u=0;for(this[r+o]=255&t;--o>=0&&(f*=256);)t<0&&0===u&&0!==this[r+o+1]&&(u=1),this[r+o]=(t/f>>0)-u&255;return r+e},Buffer.prototype.writeInt8=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,1,127,-128),Buffer.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[r]=255&t,r+1},Buffer.prototype.writeInt16LE=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8):O(this,t,r,!0),r+2},Buffer.prototype.writeInt16BE=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[r]=t>>>8,this[r+1]=255&t):O(this,t,r,!1),r+2},Buffer.prototype.writeInt32LE=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,4,2147483647,-2147483648),Buffer.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24):L(this,t,r,!0),r+4},Buffer.prototype.writeInt32BE=function(t,r,e){return t=+t,r=0|r,e||D(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),Buffer.TYPED_ARRAY_SUPPORT?(this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t):L(this,t,r,!1),r+4},Buffer.prototype.writeFloatLE=function(t,r,e){return N(this,t,r,!0,e)},Buffer.prototype.writeFloatBE=function(t,r,e){return N(this,t,r,!1,e)},Buffer.prototype.writeDoubleLE=function(t,r,e){return F(this,t,r,!0,e)},Buffer.prototype.writeDoubleBE=function(t,r,e){return F(this,t,r,!1,e)},Buffer.prototype.copy=function(t,r,e,n){if(e||(e=0),n||0===n||(n=this.length),r>=t.length&&(r=t.length),r||(r=0),n>0&&n<e&&(n=e),n===e)return 0;if(0===t.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-r<n-e&&(n=t.length-r+e);var i,o=n-e;if(this===t&&e<r&&r<n)for(i=o-1;i>=0;--i)t[i+r]=this[i+e];else if(o<1e3||!Buffer.TYPED_ARRAY_SUPPORT)for(i=0;i<o;++i)t[i+r]=this[i+e];else Uint8Array.prototype.set.call(t,this.subarray(e,e+o),r);return o},Buffer.prototype.fill=function(t,r,e,n){if("string"==typeof t){if("string"==typeof r?(n=r,r=0,e=this.length):"string"==typeof e&&(n=e,e=this.length),1===t.length){var i=t.charCodeAt(0);i<256&&(t=i);}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!Buffer.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else "number"==typeof t&&(t=255&t);if(r<0||this.length<r||this.length<e)throw new RangeError("Out of range index");if(e<=r)return this;r>>>=0,e=void 0===e?this.length:e>>>0,t||(t=0);var o;if("number"==typeof t)for(o=r;o<e;++o)this[o]=t;else {var f=Buffer.isBuffer(t)?t:q(new Buffer(t,n).toString()),u=f.length;for(o=0;o<e-r;++o)this[o+r]=f[o%u];}return this};var tt=/[^+\/0-9A-Za-z-_]/g;}).call(this,"undefined"!=typeof global$1?global$1:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{"base64-js":30,ieee754:32,isarray:34}],30:[function(t,r,e){function n(t){var r=t.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return "="===t[r-2]?2:"="===t[r-1]?1:0}function i(t){return 3*t.length/4-n(t)}function o(t){var r,e,i,o,f,u,a=t.length;f=n(t),u=new h(3*a/4-f),i=f>0?a-4:a;var s=0;for(r=0,e=0;r<i;r+=4,e+=3)o=c[t.charCodeAt(r)]<<18|c[t.charCodeAt(r+1)]<<12|c[t.charCodeAt(r+2)]<<6|c[t.charCodeAt(r+3)],u[s++]=o>>16&255,u[s++]=o>>8&255,u[s++]=255&o;return 2===f?(o=c[t.charCodeAt(r)]<<2|c[t.charCodeAt(r+1)]>>4,u[s++]=255&o):1===f&&(o=c[t.charCodeAt(r)]<<10|c[t.charCodeAt(r+1)]<<4|c[t.charCodeAt(r+2)]>>2,u[s++]=o>>8&255,u[s++]=255&o),u}function f(t){return s[t>>18&63]+s[t>>12&63]+s[t>>6&63]+s[63&t]}function u(t,r,e){for(var n,i=[],o=r;o<e;o+=3)n=(t[o]<<16)+(t[o+1]<<8)+t[o+2],i.push(f(n));return i.join("")}function a(t){for(var r,e=t.length,n=e%3,i="",o=[],f=16383,a=0,c=e-n;a<c;a+=f)o.push(u(t,a,a+f>c?c:a+f));return 1===n?(r=t[e-1],i+=s[r>>2],i+=s[r<<4&63],i+="=="):2===n&&(r=(t[e-2]<<8)+t[e-1],i+=s[r>>10],i+=s[r>>4&63],i+=s[r<<2&63],i+="="),o.push(i),o.join("")}e.byteLength=i,e.toByteArray=o,e.fromByteArray=a;for(var s=[],c=[],h="undefined"!=typeof Uint8Array?Uint8Array:Array,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",p=0,d=l.length;p<d;++p)s[p]=l[p],c[l.charCodeAt(p)]=p;c["-".charCodeAt(0)]=62,c["_".charCodeAt(0)]=63;},{}],31:[function(t,r,e){function n(){if(!(this instanceof n))return new n}!function(t){function e(t){for(var r in s)t[r]=s[r];return t}function n(t,r){return u(this,t).push(r),this}function i(t,r){function e(){o.call(n,t,e),r.apply(this,arguments);}var n=this;return e.originalListener=r,u(n,t).push(e),n}function o(t,r){function e(t){return t!==r&&t.originalListener!==r}var n,i=this;if(arguments.length){if(r){if(n=u(i,t,!0)){if(n=n.filter(e),!n.length)return o.call(i,t);i[a][t]=n;}}else if(n=i[a],n&&(delete n[t],!Object.keys(n).length))return o.call(i)}else delete i[a];return i}function f(t,r){function e(t){t.call(o);}function n(t){t.call(o,r);}function i(t){t.apply(o,s);}var o=this,f=u(o,t,!0);if(!f)return !1;var a=arguments.length;if(1===a)f.forEach(e);else if(2===a)f.forEach(n);else {var s=Array.prototype.slice.call(arguments,1);f.forEach(i);}return !!f.length}function u(t,r,e){if(!e||t[a]){var n=t[a]||(t[a]={});return n[r]||(n[r]=[])}}"undefined"!=typeof r&&(r.exports=t);var a="listeners",s={on:n,once:i,off:o,emit:f};e(t.prototype),t.mixin=e;}(n);},{}],32:[function(t,r,e){e.read=function(t,r,e,n,i){var o,f,u=8*i-n-1,a=(1<<u)-1,s=a>>1,c=-7,h=e?i-1:0,l=e?-1:1,p=t[r+h];for(h+=l,o=p&(1<<-c)-1,p>>=-c,c+=u;c>0;o=256*o+t[r+h],h+=l,c-=8);for(f=o&(1<<-c)-1,o>>=-c,c+=n;c>0;f=256*f+t[r+h],h+=l,c-=8);if(0===o)o=1-s;else {if(o===a)return f?NaN:(p?-1:1)*(1/0);f+=Math.pow(2,n),o-=s;}return (p?-1:1)*f*Math.pow(2,o-n)},e.write=function(t,r,e,n,i,o){var f,u,a,s=8*o-i-1,c=(1<<s)-1,h=c>>1,l=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,p=n?0:o-1,d=n?1:-1,y=r<0||0===r&&1/r<0?1:0;for(r=Math.abs(r),isNaN(r)||r===1/0?(u=isNaN(r)?1:0,f=c):(f=Math.floor(Math.log(r)/Math.LN2),r*(a=Math.pow(2,-f))<1&&(f--,a*=2),r+=f+h>=1?l/a:l*Math.pow(2,1-h),r*a>=2&&(f++,a/=2),f+h>=c?(u=0,f=c):f+h>=1?(u=(r*a-1)*Math.pow(2,i),f+=h):(u=r*Math.pow(2,h-1)*Math.pow(2,i),f=0));i>=8;t[e+p]=255&u,p+=d,u/=256,i-=8);for(f=f<<i|u,s+=i;s>0;t[e+p]=255&f,p+=d,f/=256,s-=8);t[e+p-d]|=128*y;};},{}],33:[function(t,r,e){(function(Buffer){!function(e){function o(t,r,n){function i(t,r,e,n){return this instanceof i?v(this,t,r,e,n):new i(t,r,e,n)}function o(t){return !(!t||!t[F])}function v(t,r,e,n,i){if(E&&A&&(r instanceof A&&(r=new E(r)),n instanceof A&&(n=new E(n))),!(r||e||n||g))return void(t.buffer=h(m,0));if(!s(r,e)){var o=g||Array;i=e,n=r,e=0,r=new o(8);}t.buffer=r,t.offset=e|=0,b!==typeof n&&("string"==typeof n?x(r,e,n,i||10):s(n,i)?c(r,e,n,i):"number"==typeof i?(k(r,e+T,n),k(r,e+S,i)):n>0?O(r,e,n):n<0?L(r,e,n):c(r,e,m,0));}function x(t,r,e,n){var i=0,o=e.length,f=0,u=0;"-"===e[0]&&i++;for(var a=i;i<o;){var s=parseInt(e[i++],n);if(!(s>=0))break;u=u*n+s,f=f*n+Math.floor(u/B),u%=B;}a&&(f=~f,u?u=B-u:f++),k(t,r+T,f),k(t,r+S,u);}function P(){var t=this.buffer,r=this.offset,e=_(t,r+T),i=_(t,r+S);return n||(e|=0),e?e*B+i:i}function R(t){var r=this.buffer,e=this.offset,i=_(r,e+T),o=_(r,e+S),f="",u=!n&&2147483648&i;for(u&&(i=~i,o=B-o),t=t||10;;){var a=i%t*B+o;if(i=Math.floor(i/t),o=Math.floor(a/t),f=(a%t).toString(t)+f,!i&&!o)break}return u&&(f="-"+f),f}function k(t,r,e){t[r+D]=255&e,e>>=8,t[r+C]=255&e,e>>=8,t[r+Y]=255&e,e>>=8,t[r+I]=255&e;}function _(t,r){return t[r+I]*U+(t[r+Y]<<16)+(t[r+C]<<8)+t[r+D]}var T=r?0:4,S=r?4:0,I=r?0:3,Y=r?1:2,C=r?2:1,D=r?3:0,O=r?l:d,L=r?p:y,M=i.prototype,N="is"+t,F="_"+N;return M.buffer=void 0,M.offset=0,M[F]=!0,M.toNumber=P,M.toString=R,M.toJSON=P,M.toArray=f,w&&(M.toBuffer=u),E&&(M.toArrayBuffer=a),i[N]=o,e[t]=i,i}function f(t){var r=this.buffer,e=this.offset;return g=null,t!==!1&&0===e&&8===r.length&&x(r)?r:h(r,e)}function u(t){var r=this.buffer,e=this.offset;if(g=w,t!==!1&&0===e&&8===r.length&&Buffer.isBuffer(r))return r;var n=new w(8);return c(n,0,r,e),n}function a(t){var r=this.buffer,e=this.offset,n=r.buffer;if(g=E,t!==!1&&0===e&&n instanceof A&&8===n.byteLength)return n;var i=new E(8);return c(i,0,r,e),i.buffer}function s(t,r){var e=t&&t.length;return r|=0,e&&r+8<=e&&"string"!=typeof t[r]}function c(t,r,e,n){r|=0,n|=0;for(var i=0;i<8;i++)t[r++]=255&e[n++];}function h(t,r){return Array.prototype.slice.call(t,r,r+8)}function l(t,r,e){for(var n=r+8;n>r;)t[--n]=255&e,e/=256;}function p(t,r,e){var n=r+8;for(e++;n>r;)t[--n]=255&-e^255,e/=256;}function d(t,r,e){for(var n=r+8;r<n;)t[r++]=255&e,e/=256;}function y(t,r,e){var n=r+8;for(e++;r<n;)t[r++]=255&-e^255,e/=256;}function v(t){return !!t&&"[object Array]"==Object.prototype.toString.call(t)}var g,b="undefined",w=b!==typeof Buffer&&Buffer,E=b!==typeof Uint8Array&&Uint8Array,A=b!==typeof ArrayBuffer&&ArrayBuffer,m=[0,0,0,0,0,0,0,0],x=Array.isArray||v,B=4294967296,U=16777216;o("Uint64BE",!0,!0),o("Int64BE",!0,!1),o("Uint64LE",!1,!0),o("Int64LE",!1,!1);}("object"==typeof e&&"string"!=typeof e.nodeName?e:this||{});}).call(this,t("buffer").Buffer);},{buffer:29}],34:[function(t,r,e){var n={}.toString;r.exports=Array.isArray||function(t){return "[object Array]"==n.call(t)};},{}]},{},[1])(1)});

var msgpacklite = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var encode; //encode method dependency injection
function setEncode(newEncode) {
    encode = newEncode;
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
    let bin = encode(obj);
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

    let encodedHeader = encode(header);
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
        let chbin = encode({ payloadID: payloadID, id: id, chunk: chunk });
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

const msgPack = msgpacklite;


setEncode(msgPack.encode);

const UnChunker = UnChunkerFactory({ decode: msgPack.decode });
const PeerBinary = PeerBinaryFactory({ UnChunker, Peer: Peer$1 });
const P2PServer = P2PServerFactory({ PeerBinary });
const P2PClient = P2PClientFactory({ PeerBinary });

export { Channel, P2PClient, P2PServer, PeerBinary, UnChunker, arrayBufferToChunks, generateWebRTCpayload, imageToBlob, recursivelyDecodeBlobs, recursivelyEncodeBlobs };
//# sourceMappingURL=build.nofirebase.js.map
