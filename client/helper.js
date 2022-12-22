const { Client } = require('./Client');

const client = new Client();

exports.runHelpers = async () => {
  if (process.env.SEED_DB === 'true') {
    await client.seedDatabase(process.env.SEED_DB_RECORDS);
  }
}