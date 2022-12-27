const { Client } = require('./Client');

const client = new Client();

exports.runHelpers = async () => {
  if (process.env.SEED_DB === 'true') {
    await client.clearDatabase();
    await client.seedDatabase(process.env.SEED_DB_RECORDS);
  } else if (process.env.DESTROY_DB_ON_START === 'true') {
    await client.clearDatabase();
  }
}