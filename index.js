require('dotenv').config();

const { startSimulation } = require('./client');
const { app } = require('./src/app');
require('./src/db/connect');

startSimulation();

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});

