const launchdarkly = require('launchdarkly-node-server-sdk');
const { EventEmitter } = require('events');

class LD extends EventEmitter {
  constructor() {
    this.ldclient = launchdarkly.init(process.env.LD_SDK_KEY);
    this.ldclient.on('ready', () => {
      this.emit('ready');
    })
  }

  get() {
    return this.ldclient;
  }
}

module.exports = new LD();