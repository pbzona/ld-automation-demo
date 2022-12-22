const crypto = require('crypto');

exports.getRandomBytes = (size) => {
  return crypto.randomBytes(size).toString('hex');
}