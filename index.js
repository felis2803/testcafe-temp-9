const { SlowServer } = require('./slow-server');
const { runTests }   = require('./run-tests.js');

const server = new SlowServer();

server.run();

runTests().finally(() => server.close());
