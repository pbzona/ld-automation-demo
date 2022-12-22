const { Item } = require('../models/item');

exports.deleteAll = async (req, res) => {
  if (req.query.really !== 'yes') {
    return res.status(400).send({ message: 'Make sure you REALLY want to delete all items!'});
  }

  try {
    await Item.deleteMany({});
    res.status(200).send({ message: 'Deleted all items' });
  } catch (err) {
    res.status(500).send(err);
  }
}