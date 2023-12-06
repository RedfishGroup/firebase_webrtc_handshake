'use strict';

var module$1 = require('module');
var stream = require('stream');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
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
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, keys = Object.keys;
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
    var properties = keys(a);
    var index = properties.length;
    if (keys(b).length !== index) {
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
var isArray = Array.isArray;
var isTypedArray = typeof ArrayBuffer === 'function' && ArrayBuffer.isView
    ? ArrayBuffer.isView
    : null;
var assign = Object.assign;
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
        if (isArray(a)) {
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
        config = assign({}, config, createCustomConfig(config));
    }
    if (circular) {
        var areArraysEqual$1 = createIsCircular(config.areArraysEqual);
        var areMapsEqual$1 = createIsCircular(config.areMapsEqual);
        var areObjectsEqual$1 = createIsCircular(config.areObjectsEqual);
        var areSetsEqual$1 = createIsCircular(config.areSetsEqual);
        config = assign({}, config, {
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
                'f98c05f3b1e0096319172bc9e94782fd417b5128f8921ed1b77ac9b4e73b3ce2',
            urls: 'turn:global.turn.twilio.com:3478?transport=udp',
            credential: '5eyxPwW/ubyxf0u1zuLhhqNdRxM3oFqGvYnxJw7uYxQ=',
        },
        {
            url: 'turn:global.turn.twilio.com:3478?transport=tcp',
            username:
                'f98c05f3b1e0096319172bc9e94782fd417b5128f8921ed1b77ac9b4e73b3ce2',
            urls: 'turn:global.turn.twilio.com:3478?transport=tcp',
            credential: '5eyxPwW/ubyxf0u1zuLhhqNdRxM3oFqGvYnxJw7uYxQ=',
        },
        {
            url: 'turn:global.turn.twilio.com:443?transport=tcp',
            username:
                'f98c05f3b1e0096319172bc9e94782fd417b5128f8921ed1b77ac9b4e73b3ce2',
            urls: 'turn:global.turn.twilio.com:443?transport=tcp',
            credential: '5eyxPwW/ubyxf0u1zuLhhqNdRxM3oFqGvYnxJw7uYxQ=',
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
                            this.firebase.child(this.heartbeatRef, child.key)
                        );
                        this.firebase.remove(
                            this.firebase.child(this.channelsRef, child.key)
                        );
                        this.firebase.remove(
                            this.firebase.child(this.peersRef, child.key)
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
                options.iceServers || options.ICE_SERVERS,
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

            this.peerInfoRef = this.firebase.child(this.database, 'peerInfo');

            this.heartbeatRef = this.firebase.child(this.database, 'heartbeat');

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
            // the below assumes that tree trimming would happen at the same lavel as the peers ref or would be passed explicitly
            this.treeTrimmer = new firebaseTreeTrimmer({
                peersRef: this.peerInfoRef,
                heartbeatRef: this.heartbeatRef,
                channelsRef: this.firebase.child(this.database, 'channels'),
                treeTrimmingRef:
                    this.treeTrimmingRef ||
                    this.firebase.child(this.database, 'treeTrimming'),
                id: this.id,
                firebase: this.firebase,
                monitorRate: this.monitorRate || 60000,
                trimmerRemoveRate: this.trimmerRemoveRate,
            });

            this.userRef = this.firebase.child(this.peerInfoRef, this.id);

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

            this.channelsRef = this.firebase.child(
                this.database,
                `channels/${this.id}`
            );
            if (this.stream) {
                this.firebase.set(
                    this.firebase.child(
                        this.firebase.child(this.peerInfoRef, this.id),
                        'isStream'
                    ),
                    true
                );
            }
            this.firebase.set(this.channelsRef, []);

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
                console.log('channelsRef: ', this.channelsRef.toString());

            this.firebase.onChildAdded(this.channelsRef, (ev) => {
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
                            this.firebase.child(this.channelsRef, mykey),
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
                trickle: false,
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
            this.firebase.remove(this.channelsRef);
            this.firebase.remove(this.updateRef);
            this.firebase.off(this.channelsRef);
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
            this.peerInfoRef = this.firebase.child(this.database, 'peerInfo');

            this.connection = null;
            this.channelsRef = this.firebase.child(this.database, 'channels');
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
            this.channelRef = this.firebase.child(this.channelsRef, this.id);
            this.outRef = this.firebase.child(this.channelRef, 'fromClient');
            this.inRef = this.firebase.child(this.channelRef, 'fromServer');

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
                    console.log('peerList: ', peerList);
                    this._notifyCallbacks('peer not defined');
                } else {
                    this.id = id;
                    this.serverRef = this.firebase.child(this.peerInfoRef, id);
                    this.firebase.onValue(
                        this.serverRef,
                        (ev1) => {
                            ev1.val();
                            let pOpts = {
                                initiator: true,
                                trickle: false,
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
                                            data,
                                            {
                                                outRef: this.outRef,
                                                channelsRef: this.channelsRef,
                                                channelRef: this.channelRef,
                                            }
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

            this.firebase.push(this.channelRef, {
                fromClient: [offer],
            });
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

/**
 * Turns a node-datachannel DataChannel into a real Node.js stream, complete with buffering,
 * backpressure (up to a point - if the buffer fills up, messages are dropped), and
 * support for piping data elsewhere.
 *
 * Read & written data may be either UTF-8 strings or Buffers - this difference exists at
 * the protocol level, and is preserved here throughout.
 */
class DataChannelStream extends stream.Duplex {
    constructor(rawChannel, streamOptions) {
        super({
            allowHalfOpen: false, // Default to autoclose on end().
            ...streamOptions,
            objectMode: true, // Preserve the string/buffer distinction (WebRTC treats them differently)
        });

        this._rawChannel = rawChannel;
        this._readActive = true;

        rawChannel.onMessage((msg) => {
            if (!this._readActive) return; // If the buffer is full, drop messages.

            // If the push is rejected, we pause reading until the next call to _read().
            this._readActive = this.push(msg);
        });

        // When the DataChannel closes, the readable & writable ends close
        rawChannel.onClosed(() => {
            this.push(null);
            this.destroy();
        });

        rawChannel.onError((errMsg) => {
            this.destroy(new Error(`DataChannel error: ${errMsg}`));
        });

        // Buffer all writes until the DataChannel opens
        if (!rawChannel.isOpen()) {
            this.cork();
            rawChannel.onOpen(() => this.uncork());
        }
    }

    _read() {
        // Stop dropping messages, if the buffer filling up meant we were doing so before.
        this._readActive = true;
    }

    _write(chunk, encoding, callback) {
        let sentOk;

        try {
            if (Buffer.isBuffer(chunk)) {
                sentOk = this._rawChannel.sendMessageBinary(chunk);
            } else if (typeof chunk === 'string') {
                sentOk = this._rawChannel.sendMessage(chunk);
            } else {
                const typeName = chunk.constructor.name || typeof chunk;
                throw new Error(`Cannot write ${typeName} to DataChannel stream`);
            }
        } catch (err) {
            return callback(err);
        }

        if (sentOk) {
            callback(null);
        } else {
            callback(new Error('Failed to write to DataChannel'));
        }
    }

    _final(callback) {
        if (!this.allowHalfOpen) this.destroy();
        callback(null);
    }

    _destroy(maybeErr, callback) {
        // When the stream is destroyed, we close the DataChannel.
        this._rawChannel.close();
        callback(maybeErr);
    }

    get label() {
        return this._rawChannel.getLabel();
    }

    get id() {
        return this._rawChannel.getId();
    }

    get protocol() {
        return this._rawChannel.getProtocol();
    }
}

// createRequire is native in node version >= 12
const require$1 = module$1.createRequire((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.src || new URL('build.full.cjs', document.baseURI).href)));

const nodeDataChannel = require$1('../build/Release/node_datachannel.node');

var nodeDataChannel$1 = {
    ...nodeDataChannel,
    DataChannelStream,
};

// https://developer.mozilla.org/docs/Web/API/RTCSessionDescription
//
// Example usage
// const init = {
//     type: 'offer',
//     sdp: 'v=0\r\no=- 1234567890 1234567890 IN IP4 192.168.1.1\r\ns=-\r\nt=0 0\r\na=ice-ufrag:abcd\r\na=ice-pwd:efgh\r\n'
//   };

class _RTCSessionDescription {
    #type;
    #sdp;

    constructor(init = {}) {
        // Allow Empty Constructor
        // if (!init || !init.type || !init.sdp) {
        //     throw new DOMException('Type and sdp properties are required.');
        // }

        this.#type = init ? init.type : null;
        this.#sdp = init ? init.sdp : null;
    }

    get type() {
        return this.#type;
    }

    get sdp() {
        return this.#sdp;
    }

    toJSON() {
        return {
            sdp: this.#sdp,
            type: this.#type,
        };
    }
}

/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */

globalThis.DOMException ??= (() => {
  try { atob(0); } catch (err) { return err.constructor }
})();

class _RTCDataChannel extends EventTarget {
    #dataChannel;
    #readyState;
    #bufferedAmountLowThreshold;
    #binaryType;
    #maxPacketLifeTime;
    #maxRetransmits;
    #negotiated;
    #ordered;

    onbufferedamountlow;
    onclose;
    onclosing;
    onerror;
    onmessage;
    onopen;

    constructor(dataChannel, opts = {}) {
        super();

        this.#dataChannel = dataChannel;
        this.#binaryType = 'arraybuffer';
        this.#readyState = this.#dataChannel.isOpen() ? 'open' : 'connecting';
        this.#bufferedAmountLowThreshold = 0;
        this.#maxPacketLifeTime = opts.maxPacketLifeTime || null;
        this.#maxRetransmits = opts.maxRetransmits || null;
        this.#negotiated = opts.negotiated || false;
        this.#ordered = opts.ordered || true;

        // forward dataChannel events
        this.#dataChannel.onOpen(() => {
            this.#readyState = 'open';
            this.dispatchEvent(new Event('open'));
        });

        this.#dataChannel.onClosed(() => {
            this.#readyState = 'closed';
            this.dispatchEvent(new Event('close'));
        });

        this.#dataChannel.onError((msg) => {
            this.dispatchEvent(
                new RTCErrorEvent('error', {
                    error: new RTCError(
                        {
                            errorDetail: 'data-channel-failure',
                        },
                        msg,
                    ),
                }),
            );
        });

        this.#dataChannel.onBufferedAmountLow(() => {
            this.dispatchEvent(new Event('bufferedamountlow'));
        });

        this.#dataChannel.onMessage((data) => {
            if (ArrayBuffer.isView(data)) {
                data = data.buffer;
            }

            this.dispatchEvent(new MessageEvent('message', { data }));
        });

        // forward events to properties
        this.addEventListener('message', (e) => {
            if (this.onmessage) this.onmessage(e);
        });
        this.addEventListener('bufferedamountlow', (e) => {
            if (this.onbufferedamountlow) this.onbufferedamountlow(e);
        });
        this.addEventListener('error', (e) => {
            if (this.onerror) this.onerror(e);
        });
        this.addEventListener('close', (e) => {
            if (this.onclose) this.onclose(e);
        });
        this.addEventListener('closing', (e) => {
            if (this.onclosing) this.onclosing(e);
        });
        this.addEventListener('open', (e) => {
            if (this.onopen) this.onopen(e);
        });
    }

    set binaryType(type) {
        if (type !== 'blob' && type !== 'arraybuffer') {
            throw new DOMException(
                "Failed to set the 'binaryType' property on 'RTCDataChannel': Unknown binary type : " + type,
                'TypeMismatchError',
            );
        }
        this.#binaryType = type;
    }

    get binaryType() {
        return this.#binaryType;
    }

    get bufferedAmount() {
        return this.#dataChannel.bufferedAmount();
    }

    get bufferedAmountLowThreshold() {
        return this.#bufferedAmountLowThreshold;
    }

    set bufferedAmountLowThreshold(value) {
        const number = Number(value) || 0;
        this.#bufferedAmountLowThreshold = number;
        this.#dataChannel.setBufferedAmountLowThreshold(number);
    }

    get id() {
        return this.#dataChannel.getId();
    }

    get label() {
        return this.#dataChannel.getLabel();
    }

    get maxPacketLifeTime() {
        return this.#maxPacketLifeTime;
    }

    get maxRetransmits() {
        return this.#maxRetransmits;
    }

    get negotiated() {
        return this.#negotiated;
    }

    get ordered() {
        return this.#ordered;
    }

    get protocol() {
        return this.#dataChannel.getProtocol();
    }

    get readyState() {
        return this.#readyState;
    }

    send(data) {
        if (this.#readyState !== 'open') {
            throw new DOMException(
                "Failed to execute 'send' on 'RTCDataChannel': RTCDataChannel.readyState is not 'open'",
                'InvalidStateError',
            );
        }

        // Needs network error, type error implemented
        if (typeof data === 'string') {
            this.#dataChannel.sendMessage(data);
        } else if (data instanceof Blob) {
            data.arrayBuffer().then((ab) => {
                this.#dataChannel.sendMessageBinary(new Uint8Array(ab));
            });
        } else {
            this.#dataChannel.sendMessageBinary(new Uint8Array(data));
        }
    }

    close() {
        this.#readyState = 'closing';
        this.dispatchEvent(new Event('closing'));

        this.#dataChannel.close();
    }
}

// https://developer.mozilla.org/docs/Web/API/RTCIceCandidate
//
// Example: candidate:123456 1 UDP 123456 192.168.1.1 12345 typ host raddr=10.0.0.1 rport=54321 generation 0


class _RTCIceCandidate {
    #address;
    #candidate;
    #component;
    #foundation;
    #port;
    #priority;
    #protocol;
    #relatedAddress;
    #relatedPort;
    #sdpMLineIndex;
    #sdpMid;
    #tcpType;
    #type;
    #usernameFragment;
    #ip;

    constructor({ candidate, sdpMLineIndex, sdpMid, usernameFragment }) {
        if (candidate == null) {
            throw new DOMException('candidate must be specified');
        }

        this.#candidate = candidate;
        this.#sdpMLineIndex = sdpMLineIndex || null;
        this.#sdpMid = sdpMid || null;
        this.#usernameFragment = usernameFragment || null;

        if (candidate) {
            const fields = candidate.split(' ');
            this.#foundation = fields[0];
            this.#component = fields[1] == '1' ? 'rtp' : 'rtcp';
            this.#protocol = fields[2];
            this.#priority = parseInt(fields[3], 10);
            this.#ip = fields[4];
            this.#port = parseInt(fields[5], 10);
            this.#type = fields[7];
            if (fields[6] === 'typ') {
                this.#tcpType = null;
            } else if (fields[6] === 'tcp') {
                this.#tcpType = fields[7];
                this.#type = fields[8];
            }

            // Parse the candidate string to extract relatedPort and relatedAddress
            for (let i = 9; i < fields.length; i++) {
                const field = fields[i];
                if (field.startsWith('raddr')) {
                    this.#relatedAddress = field.split('=')[1];
                } else if (field.startsWith('rport')) {
                    this.#relatedPort = parseInt(field.split('=')[1], 10);
                }
            }
        }
    }

    get address() {
        return this.#address || null;
    }

    get candidate() {
        return this.#candidate || '';
    }

    get component() {
        return this.#component;
    }

    get foundation() {
        return this.#foundation || null;
    }

    get port() {
        return this.#port || null;
    }

    get priority() {
        return this.#priority || null;
    }

    get protocol() {
        return this.#protocol || null;
    }

    get relatedAddress() {
        return this.#relatedAddress;
    }

    get relatedPort() {
        return this.#relatedPort || null;
    }

    get sdpMLineIndex() {
        return this.#sdpMLineIndex;
    }

    get sdpMid() {
        return this.#sdpMid;
    }

    get tcpType() {
        return this.#tcpType;
    }

    get type() {
        return this.#type || null;
    }

    get usernameFragment() {
        return this.#usernameFragment;
    }

    toJSON() {
        return {
            candidate: this.#candidate,
            sdpMLineIndex: this.#sdpMLineIndex,
            sdpMid: this.#sdpMid,
            usernameFragment: this.#usernameFragment,
        };
    }
}

class RTCPeerConnectionIceEvent extends Event {
    #candidate;

    constructor(candidate) {
        super('icecandidate');

        this.#candidate = candidate;
    }

    get candidate() {
        return this.#candidate;
    }
}

class RTCDataChannelEvent extends Event {
    #channel;

    constructor(channel) {
        super('datachannel');

        this.#channel = channel;
    }

    get channel() {
        return this.#channel;
    }
}

class _RTCIceTransport extends EventTarget {
    #pc = null;
    #extraFunctions = null;

    ongatheringstatechange = null;
    onselectedcandidatepairchange = null;
    onstatechange = null;

    constructor({ pc, extraFunctions }) {
        super();
        this.#pc = pc;
        this.#extraFunctions = extraFunctions;

        // forward peerConnection events
        this.#pc.addEventListener('icegatheringstatechange', () => {
            this.dispatchEvent(new Event('gatheringstatechange'));
        });
        this.#pc.addEventListener('iceconnectionstatechange', () => {
            this.dispatchEvent(new Event('statechange'));
        });

        // forward events to properties
        this.addEventListener('gatheringstatechange', (e) => {
            if (this.ongatheringstatechange) this.ongatheringstatechange(e);
        });
        this.addEventListener('statechange', (e) => {
            if (this.onstatechange) this.onstatechange(e);
        });
    }

    get component() {
        let cp = this.getSelectedCandidatePair();
        if (!cp) return null;
        return cp.local.component;
    }

    get gatheringState() {
        return this.#pc ? this.#pc.iceGatheringState : 'new';
    }

    get role() {
        return this.#pc.localDescription.type == 'offer' ? 'controlling' : 'controlled';
    }

    get state() {
        return this.#pc ? this.#pc.iceConnectionState : 'new';
    }

    getLocalCandidates() {
        return this.#pc ? this.#extraFunctions.localCandidates() : [];
    }

    getLocalParameters() {
        /** */
    }

    getRemoteCandidates() {
        return this.#pc ? this.#extraFunctions.remoteCandidates() : [];
    }

    getRemoteParameters() {
        /** */
    }

    getSelectedCandidatePair() {
        let cp = this.#extraFunctions.selectedCandidatePair();
        if (!cp) return null;
        return {
            local: new _RTCIceCandidate({
                candidate: cp.local.candidate,
                sdpMid: cp.local.mid,
            }),
            remote: new _RTCIceCandidate({
                candidate: cp.remote.candidate,
                sdpMid: cp.remote.mid,
            }),
        };
    }
}

class _RTCDtlsTransport extends EventTarget {
    #pc = null;
    #extraFunctions = null;
    #iceTransport = null;

    onerror = null;
    onstatechange = null;

    constructor({ pc, extraFunctions }) {
        super();
        this.#pc = pc;
        this.#extraFunctions = extraFunctions;

        this.#iceTransport = new _RTCIceTransport({ pc, extraFunctions });

        // forward peerConnection events
        this.#pc.addEventListener('connectionstatechange', () => {
            this.dispatchEvent(new Event('statechange'));
        });

        // forward events to properties
        this.addEventListener('statechange', (e) => {
            if (this.onstatechange) this.onstatechange(e);
        });
    }

    get iceTransport() {
        return this.#iceTransport;
    }

    get state() {
        // reduce state from new, connecting, connected, disconnected, failed, closed, unknown
        // to RTCDtlsTRansport states new, connecting, connected, closed, failed
        let state = this.#pc ? this.#pc.connectionState : 'new';
        if (state === 'disconnected' || state === 'unknown') {
            state = 'closed';
        }
        return state;
    }

    getRemoteCertificates() {
        // TODO: implement
        return new ArrayBuffer(0);
    }
}

class _RTCSctpTransport extends EventTarget {
    #pc = null;
    #extraFunctions = null;
    #transport = null;

    onstatechange = null;

    constructor({ pc, extraFunctions }) {
        super();
        this.#pc = pc;
        this.#extraFunctions = extraFunctions;

        this.#transport = new _RTCDtlsTransport({ pc, extraFunctions });

        // forward peerConnection events
        this.#pc.addEventListener('connectionstatechange', () => {
            this.dispatchEvent(new Event('statechange'));
        });

        // forward events to properties
        this.addEventListener('statechange', (e) => {
            if (this.onstatechange) this.onstatechange(e);
        });
    }

    get maxChannels() {
        if (this.state !== 'connected') return null;
        return this.#pc ? this.#extraFunctions.maxDataChannelId() : 0;
    }

    get maxMessageSize() {
        if (this.state !== 'connected') return null;
        return this.#pc ? this.#extraFunctions.maxMessageSize() : 0;
    }

    get state() {
        // reduce state from new, connecting, connected, disconnected, failed, closed, unknown
        // to RTCSctpTransport states connecting, connected, closed
        let state = this.#pc.connectionState;
        if (state === 'new' || state === 'connecting') {
            state = 'connecting';
        } else if (state === 'disconnected' || state === 'failed' || state === 'closed' || state === 'unknown') {
            state = 'closed';
        }
        return state;
    }

    get transport() {
        return this.#transport;
    }
}

class _RTCPeerConnection extends EventTarget {
    #peerConnection;
    #localOffer;
    #localAnswer;
    #dataChannels;
    #config;
    #canTrickleIceCandidates;
    #sctp;

    #localCandidates = [];
    #remoteCandidates = [];

    onconnectionstatechange;
    ondatachannel;
    onicecandidate;
    onicecandidateerror;
    oniceconnectionstatechange;
    onicegatheringstatechange;
    onnegotiationneeded;
    onsignalingstatechange;
    ontrack;

    constructor(init = {}) {
        super();

        this.#config = init;
        this.#localOffer = createDeferredPromise();
        this.#localAnswer = createDeferredPromise();
        this.#dataChannels = new Set();
        this.#canTrickleIceCandidates = null;

        this.#peerConnection = new nodeDataChannel$1.PeerConnection(init?.peerIdentity ?? `peer-${getRandomString(7)}`, {
            ...init,
            iceServers: init?.iceServers
                ?.map((server) => {
                    const urls = Array.isArray(server.urls) ? server.urls : [server.urls];

                    return urls.map((url) => {
                        if (server.username && server.credential) {
                            const [protocol, rest] = url.split(/:(.*)/);
                            return `${protocol}:${server.username}:${server.credential}@${rest}`;
                        }
                        return url;
                    });
                })
                .flat(),
        });

        // forward peerConnection events
        this.#peerConnection.onStateChange(() => {
            this.dispatchEvent(new Event('connectionstatechange'));
        });

        this.#peerConnection.onIceStateChange(() => {
            this.dispatchEvent(new Event('iceconnectionstatechange'));
        });

        this.#peerConnection.onSignalingStateChange(() => {
            this.dispatchEvent(new Event('signalingstatechange'));
        });

        this.#peerConnection.onGatheringStateChange(() => {
            this.dispatchEvent(new Event('icegatheringstatechange'));
        });

        this.#peerConnection.onDataChannel((channel) => {
            const dataChannel = new _RTCDataChannel(channel);
            this.#dataChannels.add(dataChannel);
            this.dispatchEvent(new RTCDataChannelEvent(dataChannel));
        });

        this.#peerConnection.onLocalDescription((sdp, type) => {
            if (type === 'offer') {
                this.#localOffer.resolve({ sdp, type });
            }

            if (type === 'answer') {
                this.#localAnswer.resolve({ sdp, type });
            }
        });

        this.#peerConnection.onLocalCandidate((candidate, sdpMid) => {
            if (sdpMid === 'unspec') {
                this.#localAnswer.reject(new Error(`Invalid description type ${sdpMid}`));
                return;
            }

            this.#localCandidates.push(new _RTCIceCandidate({ candidate, sdpMid }));
            this.dispatchEvent(new RTCPeerConnectionIceEvent(new _RTCIceCandidate({ candidate, sdpMid })));
        });

        // forward events to properties
        this.addEventListener('connectionstatechange', (e) => {
            if (this.onconnectionstatechange) this.onconnectionstatechange(e);
        });
        this.addEventListener('signalingstatechange', (e) => {
            if (this.onsignalingstatechange) this.onsignalingstatechange(e);
        });
        this.addEventListener('iceconnectionstatechange', (e) => {
            if (this.oniceconnectionstatechange) this.oniceconnectionstatechange(e);
        });
        this.addEventListener('icegatheringstatechange', (e) => {
            if (this.onicegatheringstatechange) this.onicegatheringstatechange(e);
        });
        this.addEventListener('datachannel', (e) => {
            if (this.ondatachannel) this.ondatachannel(e);
        });
        this.addEventListener('icecandidate', (e) => {
            if (this.onicecandidate) this.onicecandidate(e);
        });

        this.#sctp = new _RTCSctpTransport({
            pc: this,
            extraFunctions: {
                maxDataChannelId: () => {
                    return this.#peerConnection.maxDataChannelId();
                },
                maxMessageSize: () => {
                    return this.#peerConnection.maxMessageSize();
                },
                localCandidates: () => {
                    return this.#localCandidates;
                },
                remoteCandidates: () => {
                    return this.#remoteCandidates;
                },
                selectedCandidatePair: () => {
                    return this.#peerConnection.getSelectedCandidatePair();
                },
            },
        });
    }

    get canTrickleIceCandidates() {
        return this.#canTrickleIceCandidates;
    }

    get connectionState() {
        return this.#peerConnection.state();
    }

    get iceConnectionState() {
        return this.#peerConnection.iceState();
    }

    get iceGatheringState() {
        return this.#peerConnection.gatheringState();
    }

    get currentLocalDescription() {
        return new _RTCSessionDescription(this.#peerConnection.localDescription());
    }

    get currentRemoteDescription() {
        return new _RTCSessionDescription(this.#peerConnection.remoteDescription());
    }

    get localDescription() {
        return new _RTCSessionDescription(this.#peerConnection.localDescription());
    }

    get pendingLocalDescription() {
        return new _RTCSessionDescription(this.#peerConnection.localDescription());
    }

    get pendingRemoteDescription() {
        return new _RTCSessionDescription(this.#peerConnection.remoteDescription());
    }

    get remoteDescription() {
        return new _RTCSessionDescription(this.#peerConnection.remoteDescription());
    }

    get sctp() {
        return this.#sctp;
    }

    get signalingState() {
        return this.#peerConnection.signalingState();
    }

    static generateCertificate(keygenAlgorithm) {
        throw new DOMException('Not implemented');
    }

    async addIceCandidate(candidate) {
        if (candidate == null || candidate.candidate == null) {
            throw new DOMException('Candidate invalid');
        }

        this.#remoteCandidates.push(
            new _RTCIceCandidate({ candidate: candidate.candidate, sdpMid: candidate.sdpMid || '0' }),
        );
        this.#peerConnection.addRemoteCandidate(candidate.candidate, candidate.sdpMid || '0');
    }

    addTrack(track, ...streams) {
        throw new DOMException('Not implemented');
    }

    addTransceiver(trackOrKind, init) {
        throw new DOMException('Not implemented');
    }

    close() {
        // close all channels before shutting down
        this.#dataChannels.forEach((channel) => {
            channel.close();
        });

        this.#peerConnection.close();
    }

    createAnswer() {
        return this.#localAnswer;
    }

    createDataChannel(label, opts = {}) {
        const channel = this.#peerConnection.createDataChannel(label, opts);
        const dataChannel = new _RTCDataChannel(channel, opts);

        // ensure we can close all channels when shutting down
        this.#dataChannels.add(dataChannel);
        dataChannel.addEventListener('close', () => {
            this.#dataChannels.delete(dataChannel);
        });

        return dataChannel;
    }

    createOffer() {
        return this.#localOffer;
    }

    getConfiguration() {
        return this.#config;
    }

    getReceivers() {
        throw new DOMException('Not implemented');
    }

    getSenders() {
        throw new DOMException('Not implemented');
    }

    getStats() {
        return new Promise((resolve) => {
            let report = new Map();
            let cp = this.#peerConnection.getSelectedCandidatePair();
            let bytesSent = this.#peerConnection.bytesSent();
            let bytesReceived = this.#peerConnection.bytesReceived();
            let rtt = this.#peerConnection.rtt();

            let localIdRs = getRandomString(8);
            let localId = 'RTCIceCandidate_' + localIdRs;
            report.set(localId, {
                id: localId,
                type: 'localcandidate',
                timestamp: Date.now(),
                candidateType: cp.local.type,
                ip: cp.local.address,
                port: cp.local.port,
            });

            let remoteIdRs = getRandomString(8);
            let remoteId = 'RTCIceCandidate_' + remoteIdRs;
            report.set(remoteId, {
                id: remoteId,
                type: 'remotecandidate',
                timestamp: Date.now(),
                candidateType: cp.remote.type,
                ip: cp.remote.address,
                port: cp.remote.port,
            });

            let candidateId = 'RTCIceCandidatePair_' + localIdRs + '_' + remoteIdRs;
            report.set(candidateId, {
                id: candidateId,
                type: 'candidate-pair',
                timestamp: Date.now(),
                localCandidateId: localId,
                remoteCandidateId: remoteId,
                state: 'succeeded',
                nominated: true,
                writable: true,
                bytesSent: bytesSent,
                bytesReceived: bytesReceived,
                totalRoundTripTime: rtt,
                currentRoundTripTime: rtt,
            });

            let transportId = 'RTCTransport_0_1';
            report.set(transportId, {
                id: transportId,
                timestamp: Date.now(),
                type: 'transport',
                bytesSent: bytesSent,
                bytesReceived: bytesReceived,
                dtlsState: 'connected',
                selectedCandidatePairId: candidateId,
                selectedCandidatePairChanges: 1,
            });

            return resolve(report);
        });
    }

    getTransceivers() {
        return []; // throw new DOMException('Not implemented');
    }

    removeTrack() {
        throw new DOMException('Not implemented');
    }

    restartIce() {
        throw new DOMException('Not implemented');
    }

    setConfiguration(config) {
        this.#config = config;
    }

    async setLocalDescription(description) {
        if (description == null || description.type == null) {
            throw new DOMException('Local description type must be set');
        }

        if (description.type !== 'offer') {
            // any other type causes libdatachannel to throw
            return;
        }
        this.#peerConnection.setLocalDescription(description.type);
    }

    async setRemoteDescription(description) {
        if (description.sdp == null) {
            throw new DOMException('Remote SDP must be set');
        }

        this.#peerConnection.setRemoteDescription(description.sdp, description.type);
    }
}

function createDeferredPromise() {
    let resolve, reject;

    let promise = new Promise(function (_resolve, _reject) {
        resolve = _resolve;
        reject = _reject;
    });

    promise.resolve = resolve;
    promise.reject = reject;
    return promise;
}

function getRandomString(length) {
    return Math.random()
        .toString(36)
        .substring(2, 2 + length);
}

var nodeDatachannelPolyfill = {
    RTCPeerConnection: _RTCPeerConnection,
    RTCSessionDescription: _RTCSessionDescription,
    RTCIceCandidate: _RTCIceCandidate,
    RTCDataChannel: _RTCDataChannel,
    RTCDataChannelEvent,
    RTCPeerConnectionIceEvent,
};

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

// Log Level
nodeDataChannel$1.initLogger('Debug');

// import adapter from "webrtc-adapter/src/js/adapter_core.js";
const { decode, encode } = require('msgpack-lite');

// require('firebase/app')
// const firebase = require('firebase/database')

// initFirebase(firebase)
setEncode(encode);

const UnChunker = UnChunkerFactory({ decode });
const PeerBinary = PeerBinaryFactory({
    UnChunker,
    Peer,
    wrtc: nodeDatachannelPolyfill,
});
const P2PServer = P2PServerFactory({
    PeerBinary,
});
const P2PClient = P2PClientFactory({
    PeerBinary,
});

exports.Channel = Channel;
exports.P2PClient = P2PClient;
exports.P2PServer = P2PServer;
exports.PeerBinary = PeerBinary;
exports.UnChunker = UnChunker;
exports.arrayBufferToChunks = arrayBufferToChunks;
exports.generateWebRTCpayload = generateWebRTCpayload;
exports.imageToBlob = imageToBlob;
exports.recursivelyDecodeBlobs = recursivelyDecodeBlobs;
exports.recursivelyEncodeBlobs = recursivelyEncodeBlobs;
//# sourceMappingURL=build.full.cjs.map
