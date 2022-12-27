const { EventEmitter } = require('events');
const { Client } = require('./Client');

class ClientManager extends EventEmitter {
  constructor(minimumClients, maximumClients) {
    console.log('Creating client manager')
    super();
    if (!ClientManager.instance) {
      ClientManager.instance = this;
    }
    this.min = minimumClients;
    this.max = minimumClients; // Just setting this to min for now
    this.clients = new WeakMap();
    this.clientCount = 0;

    this.removeClient = this.removeClient.bind(this);

    return ClientManager.instance;
  }

  start() {
    console.log('Starting ClientManager');
    for (let i = 0; i < this.min; i++) {
      this.addClient();
    }
    console.log(this.clients);
  }

  async addClient() {
    console.log('ClientManager#addClient');
    await this.sleep(1000);
    if (this.count() <= this.max) {
      const client = new Client();
      this.clients.set(client, client);
      this.clientCount++;
      client.on('done', this.removeClient);

      await client.executeSearch();
    }
  }

  removeClient(client) {
    console.log('ClientManager#removeClient');
    this.clients[client].removeAllListeners('done');
    delete this.clients[client];
    this.clientCount--;
    if (this.shouldAddClient()) {
      this.addClient();
    }
  }

  count() {
    return this.clientCount;
  }

  shouldAddClient() {
    return this.count() < this.min;
  }

  async sleep(maxTime) {
    const msToWait = Math.floor(Math.random() * maxTime);
    return new Promise(resolve => setTimeout(resolve, msToWait));
  }
}

module.exports = ClientManager;