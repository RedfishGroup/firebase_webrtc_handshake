import { settings } from './settings.js'

var encode //encodce method dependency injection
export function setEncode(newEncode) {
    encode = newEncode
}

var drawingCanvas // this is a canvas used by imageToBlob

const MAX_RECURSIVE_DEPTH = 10
//
// @param  {Function} callback []
//
export async function generateWebRTCpayload(obj) {
    let deBlobbed = await recursivelyEncodeBlobs(obj)
    let result = _generateWebRTCpayload(deBlobbed)
    return result
}

export function deBlob(obj) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader()
        reader.addEventListener('loadend', function () {
            const view = new Int8Array(reader.result)
            let descript = { isBlob: true, type: obj.type }
            if (obj.lastModified) descript.lastModified = obj.lastModified
            if (obj.name) descript.name = obj.name
            if (obj.size) descript.size = obj.size
            if (obj.exif) descript.exif = obj.exif
            descript.view = view // _generateWebRTCpayload(view, descript);
            resolve(descript)
        })
        reader.readAsArrayBuffer(obj)
    })
}

export async function recursivelyEncodeBlobs(obj, depth = 0) {
    if (depth > MAX_RECURSIVE_DEPTH) {
        throw ('max depth reached', depth)
    }
    console.log('encode obj: ', obj)
    if (obj === undefined) return obj

    if (
        (typeof File !== 'undefined' && obj.constructor == File) ||
        (typeof Blob !== 'undefined' && obj.constructor == Blob)
    ) {
        return await deBlob(obj)
    } else if (obj.constructor == Object) {
        let res = {}
        for (var i in obj) {
            console.log('encode obj key: ', i)
            res[i] = await recursivelyEncodeBlobs(obj[i], depth + 1)
        }
        return res
    }
    return obj
}

export async function recursivelyDecodeBlobs(obj, depth = 0) {
    if (depth > MAX_RECURSIVE_DEPTH) {
        throw ('max depth reached', depth)
    }
    if (obj.constructor == Object && obj.type && obj.isBlob) {
        let descript = {}
        for (var i in obj) {
            if (i !== 'view' && i !== 'chunks') {
                descript[i] = obj[i]
            }
        }
        if (typeof Blob !== 'undefined') {
            return new Blob([obj.view], descript)
        } else {
            return { view: obj.view, descript }
        }
    } else if (obj.constructor == Object) {
        let res = {}
        for (var i in obj) {
            res[i] = await recursivelyDecodeBlobs(obj[i], depth + 1)
        }
        return res
    }
    return obj
}

export async function _generateWebRTCpayload(obj, headerOpt = {}) {
    //console.time('generateWebRTCpayload')
    let bin = encode(obj)
    // console.log({ bin, obj })
    var header = Object.assign(
        {
            iAmAHeader: true,
            payloadID: Math.floor(Math.random() * 100000000),
        },
        headerOpt
    )
    var chunks = arrayBufferToChunks(bin, header.payloadID)
    header.chunkCount = chunks.length
    //console.timeEnd('generateWebRTCpayload')

    let encodedHeader = encode(header)
    // console.log(encodedHeader, header)
    return { header: encodedHeader, chunks: chunks }
}

export function arrayBufferToChunks(buff, payloadID) {
    //console.time('chunks')
    var result = []
    var wholeshebang = new Uint8Array(buff)
    var count = 0
    payloadID = payloadID || Math.floor(Math.random() * 100000000)
    for (var i = 0; i < buff.byteLength; i += settings.CHUNK_SIZE) {
        var chunksize = Math.min(buff.byteLength - i, settings.CHUNK_SIZE)
        var chunk = wholeshebang.slice(i, i + chunksize)
        var id = count //new Uint8Array(idSize);
        let chbin = encode({ payloadID: payloadID, id: id, chunk: chunk })
        result.push(chbin)
        count++
    }

    // console.log(buff, result)

    //console.timeEnd('chunks')
    //console.log(`generated ${count} chunks`)
    return result
}

export function imageToBlob(img, cb) {
    if (!drawingCanvas) {
        drawingCanvas = document.createElement('canvas')
    }
    drawingCanvas.width = img.width
    drawingCanvas.height = img.height
    drawingCanvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height)
    drawingCanvas.toBlob(function (blob) {
        cb(blob)
    })
}

//
// Takes a bunch of possibly out of order chunks and assembles them into one
//
export function UnChunkerFactory(options = {}) {
    const decode =
        options.decode ||
        function decode(data) {
            return data
        }

    return class UnChunker {
        constructor(opts = {}) {
            this.payloads = {}
            this.payloadCount = 0
            this.onData = function (val) {
                console.log('default, data is ready:', val)
            }
        }

        registerChunk(msg) {
            var header = this.parseHeader(msg)
            if (header) {
                this._newPayload(header.payloadID, header)
            } else if (this._isChunk(msg)) {
                //the msg is a chunk hopefully
                try {
                    let val = decode(msg)
                    this._appendToPayload(val)
                    //this.emit('dataBig', val)
                    if (this._isPayloadReady(val.payloadID)) {
                        this._assembleChunks(val.payloadID, (result) => {
                            this.onData(result)
                            return result
                        })
                    }
                } catch (err) {
                    console.error(err)
                    console.error('val:', msg)
                }
            } else {
                console.warn('not my type', decode(msg))
            }
            return null
        }

        _newPayload(id, header) {
            this.payloads[id] = Object.assign(header, {
                count: header.chunkCount,
                chunks: [],
                lastUpdate: new Date(),
            })
            this.payloadCount++
        }

        _appendToPayload(chunk) {
            var pl = this.payloads[chunk.payloadID]
            pl.lastUpdate = new Date()
            pl.chunks.push(chunk)
        }

        async _assembleChunks(payloadID, cb) {
            var pl = this.payloads[payloadID]
            pl.chunks.sort(function (a, b) {
                return Number(a.id) - Number(b.id)
            })
            var totalSize = 0
            for (var i = 0; i < pl.chunks.length; i++) {
                totalSize += pl.chunks[i].chunk.length
            }
            var result = new Uint8Array(totalSize)
            var position = 0
            for (var i = 0; i < pl.chunks.length; i++) {
                var ch = pl.chunks[i]
                result.set(ch.chunk, position)
                position += ch.chunk.length
            }
            try {
                let val1 = decode(result)
                let val2 = await recursivelyDecodeBlobs(val1)
                cb(val2)
                this._removePayload(payloadID)
            } catch (err) {
                console.error(err)
                console.error('buffer', result)
            }
        }

        _removePayload(id) {
            delete this.payloads[id]
            this.payloadCount--
        }

        parseHeader(data) {
            if (typeof data == 'object' && !(data instanceof Uint8Array)) {
                if (data.chunkCount && data.chunkCount > 0) {
                    return data
                }
            } else if (data.length && data.length < 4000) {
                // might have been packed or something.
                try {
                    var json = decode(data)
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
                    console.warn(er)
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
            var pl = this.payloads[id]
            if (pl.chunks.length == pl.count) {
                return true
            }
            return false
        }
    }
}
