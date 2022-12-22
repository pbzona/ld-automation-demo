const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  authSource: process.env.MONGO_DATABASE
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));