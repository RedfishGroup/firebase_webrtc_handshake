const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const port = process.argv[2] || 9000

const reactApps = {
    InfoPanel: true,
    auth: true,
}

function restOfPath(pathElements) {
    let [first, ...rest] = pathElements
    return rest.join('/')
}

http.createServer(function(req, res) {
    console.log(`${req.method} ${req.url}`)

    // parse URL
    const parsedUrl = url.parse(req.url)
    // extract URL path
    let pathname = decodeURI(`.${parsedUrl.pathname}`)
    // based on the URL path, extract the file extention. e.g. .js, .doc, ...
    const ext = path.parse(pathname).ext || '.html'
    // maps file extention to MIME typere
    const map = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
    }

    console.log(`got pathname: <${pathname}>`)

    let pathRegex = /(?<!\?.+)(?<=\/)[\w\.-]+(?=[/\r\n?]|$)/g
    let match = pathname.match(pathRegex)
    console.log(`match: ${match} length: ${match && match.length}`)

    let originalPathname = pathname

    if (match && match.length > 0) {
        let potentialApp = reactApps[match[0]] && match[0]
        console.log(`potentialApp: ${potentialApp}`)
        if (potentialApp) {
            if (
                pathname.startsWith(`./${potentialApp}`) &&
                !pathname.startsWith(`./${potentialApp}/build`)
            ) {
                pathname = `./${potentialApp}/build/${restOfPath(match)}`
                console.log(`rewrite ==> <${pathname}>`)
            }
        }
    }

    fs.exists(pathname, function(exist) {
        if (!exist) {
            if (match && match.length > 0) {
                console.log('got match: ', match)
                let potentialApp = match[0]
                if (reactApps[potentialApp]) {
                    if (
                        originalPathname.startsWith(`./${potentialApp}`) &&
                        !originalPathname.startsWith(`./${potentialApp}/build`)
                    ) {
                        pathname = `./${potentialApp}/build/index.html`
                    }
                } else {
                    // if the file is not found, return 404
                    res.statusCode = 404
                    res.end(`File ${pathname} not found!`)
                    return
                }
            } else {
                // if the file is not found, return 404
                res.statusCode = 404
                res.end(`File ${pathname} not found!`)
                return
            }
        }

        // if is a directory search for index file matching the extention
        if (fs.statSync(pathname).isDirectory()) {
            pathname += '/index' + ext
        }

        // read file from file system
        fs.readFile(pathname, function(err, data) {
            if (err) {
                res.statusCode = 500
                res.end(`Error getting the file: ${err}.`)
            } else {
                // if the file is found, set Content-type and send data
                res.setHeader('Content-type', map[ext] || 'text/plain')
                res.setHeader('Service-Worker-Allowed', '/')
                res.end(data)
            }
        })
    })
}).listen(parseInt(port))

console.log(`Server listening on port ${port}`)
