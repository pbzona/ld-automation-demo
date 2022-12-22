const ClientManager = require('./ClientManager');

exports.startSimulation = async (numberOfClients) => {
  console.log('Starting simulation');
  const clientmanager = new ClientManager(numberOfClients);
  clientmanager.start();
}