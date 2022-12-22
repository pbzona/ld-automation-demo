const mongoose = require('mongoose');

exports.connectToDatabase = (callback) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(process.env.MONGO_URI, {
    authSource: process.env.MONGO_DATABASE
  })
    .then(() => {
      console.log('Connected to MongoDB');
      callback();
    })
    .catch(err => console.error(err));
}