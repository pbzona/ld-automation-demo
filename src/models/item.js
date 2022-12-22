const mongoose = require('mongoose');
const { getRandomBytes } = require('../util/getRandomBytes');

const itemSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  key: {
    type: String,
    required: true,
    default: false
  }
}, {
  timestamps: true
});

itemSchema.statics.build = (text) => {
  const size = 1000;
  const key = getRandomBytes(size);
  return new Item({
    text,
    key
  });
}

const Item = mongoose.model('Item', itemSchema);

module.exports = { Item };