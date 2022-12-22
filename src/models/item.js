const crypto = require('crypto');
const mongoose = require('mongoose');

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
  const key = crypto.randomBytes(size).toString('hex');
  return new Item({
    text,
    key
  });
}

const Item = mongoose.model('Item', itemSchema);

module.exports = { Item };