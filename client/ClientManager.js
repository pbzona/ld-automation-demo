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
    this.max = maximumClients;
    this.clients = {};

    this.removeClient = this.removeClient.bind(this);

    return ClientManager.instance;
  }

  start() {
    console.log('Starting ClientManager');
    for (let i = 0; i < this.min; i++) {
      this.addClient();
    }
    console.log(this.clients)
  }

  addClient() {
    console.log('ClientManager#addClient');
    if (this.count() <= this.max) {
      const client = new Client();
      this.clients[client.id] = client;
      client.on('done', this.removeClient);

      client.executeSearch();
    }
  }

  removeClient(id) {
    console.log('ClientManager#removeClient');
    this.clients[id].removeAllListeners('done');
    delete this.clients[id];
    if (this.shouldAddClient()) {
      this.addClient();
    }
  }

  count() {
    return Object.keys(this.clients).length;
  }

  shouldAddClient() {
    return this.count() < this.min;
  }

  setUpDoneListener(client) {
    client.on('done', this.removeClient);
  }

  removeDoneListener(client) {
    client.removeListener('done', this.removeClient);
  }
}

module.exports = ClientManager;