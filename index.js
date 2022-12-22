require('dotenv').config();

const { startSimulation } = require('./client');
const { app } = require('./src/app');
const { connectToDatabase } = require('./src/db/connect');

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
  connectToDatabase(() => {
    startSimulation();
  })
});

