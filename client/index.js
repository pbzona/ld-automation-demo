const ClientManager = require('./ClientManager');
const LD = require('./launchdarkly');

exports.startSimulation = async (numberOfClients) => {
  console.log('Starting simulation');

  LD.on('ready', () => {
    console.log('LD client ready for use');

    const clientmanager = new ClientManager(numberOfClients);
    clientmanager.start();
  })
  
  // Todo: implement this
}