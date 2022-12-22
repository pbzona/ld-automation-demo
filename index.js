require('dotenv').config();

const { startSimulation } = require('./client');
const { app } = require('./src/app');
const { connectToDatabase } = require('./src/db/connect');
const LD = require('./client/launchdarkly');
const { runHelpers } = require('./client/helper');

const PORT = 3000;
app.listen(PORT, async () => {
  try {
    await connectToDatabase();
    await runHelpers();

    const ldclient = LD.getClient();
    await ldclient.waitForInitialization();

    startSimulation(process.env.N_CLIENTS);
  } catch (err) {
    console.error(err);
  }
});

