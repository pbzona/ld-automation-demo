require('dotenv').config();

const { startSimulation } = require('./client');
const { app } = require('./src/app');
const { connectToDatabase } = require('./src/db/connect');
const LD = require('./client/launchdarkly');

const PORT = 3000;
app.listen(PORT, async () => {
  try {
    await connectToDatabase();

    const ldclient = LD.getClient();
    await ldclient.waitForInitialization();

    startSimulation(process.env.N_CLIENTS);
  }
});

