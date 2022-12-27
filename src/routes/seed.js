const { Item } = require('../models/item');
const { createLongStringOfWords } = require('../util/itemText');

const TEXT_LENGTH = 6; // number of words to include in text string

exports.seedItems = async (req, res) => {
  const numberOfItems = req.params.num;
  try {
    for (let i = 0; i < numberOfItems; i++) {
      const text = createLongStringOfWords(TEXT_LENGTH);
      const result = await Item.build(text);
      result.save();
    }
    res.status(201).send({ message: `Created ${numberOfItems} items` });
  } catch (err) {
    res.status(500).send(err);
  }
}