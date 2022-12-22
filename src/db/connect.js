const mongoose = require('mongoose');

exports.connectToDatabase = async () => {
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      authSource: process.env.MONGO_DATABASE
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}