const { Item } = require('../models/item');

exports.createItem = async (req, res) => {
  const { text } = req.body;
  try {
    const result = await Item.build(text);
    result.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}
