const { faker } = require('@faker-js/faker');
const { Item } = require('../models/item');

exports.seedItems = async (req, res) => {
  function getRandomWord() {
    const typeOfWord = Math.random();
    if (typeOfWord > 0 && typeOfWord <= 0.33) {
      return faker.word.adjective();
    } else if (typeOfWord > 0.34 && typeOfWord <= 0.66) {
      return faker.word.noun();
    } else {
      return faker.word.verb();
    }
  }

  const numberOfItems = req.params.num;

  try {
    for (let i = 0; i < numberOfItems; i++) {
      const word = getRandomWord();
      const result = await Item.build(word);
      result.save();
    }
    res.status(201).send({ message: `Created ${numberOfItems} items` });
  } catch (err) {
    res.status(500).send(err);
  }
}