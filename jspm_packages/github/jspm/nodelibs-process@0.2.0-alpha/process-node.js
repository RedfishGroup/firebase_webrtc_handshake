var productionEnv = require('@system-env').production;
var pEnv = process.env;
pEnv.NODE_ENV = productionEnv ? 'production' : 'development';
module.exports = global.process;