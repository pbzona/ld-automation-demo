db.createUser(
  {
    user: process.env.MONGO_USER,
    pwd: process.env.MONGO_PASSWORD,
    roles: [
      {
        role: 'readWrite',
        db: process.env.MONGO_DATABASE
      }
    ]
  }
);

db.createCollection('test', { capped: false });
db.test.insertOne({ name: 'test' });