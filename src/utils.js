//
// Takes a bunch of possibly out of order shunks and assembles them into one
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
                console.warn('not my type', msg)
                // console.warn(this._ab2str(msg))
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
                    console.log(er)
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