const { promises: fs } = require('fs');

const http = require('http');
const path = require('path');
const url  = require('url');

const DEFAULT_PORT  = 3000;
const DEFAULT_DELAY = 6000;

const INDEX_PAGE_PATH          = path.resolve(__dirname, './files/index.html');
const LONG_LOADING_SCRIPT_PATH = path.resolve(__dirname, './files/long-loading-script.js');

async function sendFile (res, path) {
    const data = await fs.readFile(path);

    return new Promise(resolve => res.end(data, resolve));
}

async function sendFileWithDelay (res, path, delay = DEFAULT_DELAY) {
    await new Promise(resolve => setTimeout(resolve, delay));

    return sendFile(res, path);
}

const handlers = {
    ['/'] (res) {
        sendFile(res, INDEX_PAGE_PATH);
    },

    ['/long-loading-script'] (res) {
        sendFileWithDelay(res, LONG_LOADING_SCRIPT_PATH);
    }
};

class SlowServer {
    httpServer;

    constructor () {
        this.httpServer = http.createServer((req, res) => {
            const { pathname, query } = url.parse(req.url);

            const params  = new url.URLSearchParams(query);
            const handler = handlers[pathname];

            if (typeof handler === 'function')
                handler(res, params);
        });
    }

    run (port = DEFAULT_PORT) {
        this.httpServer.listen(port);
    }

    async close () {
        return new Promise(resolve => this.httpServer.close(resolve));
    }
}

module.exports = { SlowServer };
