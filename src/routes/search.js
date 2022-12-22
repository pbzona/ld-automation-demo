const { Item } = require('../models/item');

exports.searchForItem = async (req, res) => {
  const searchTerm = new RegExp(req.query.q);
  try {
    const result = await Item.find({ text: searchTerm }).exec();
    if (!result) {
      res.status(404).send({ message: 'Not found' });
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}