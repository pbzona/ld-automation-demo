const { faker } = require('@faker-js/faker');

// Utilities for generating text field on a database item
// and search terms to be used by "clients"

const getRandomWord = () => {
  const typeOfWord = Math.random();
  if (typeOfWord > 0 && typeOfWord <= 0.33) {
    return faker.word.adjective();
  } else if (typeOfWord > 0.34 && typeOfWord <= 0.66) {
    return faker.word.noun();
  } else {
    return faker.word.verb();
  }
}

const createLongStringOfWords = (numberOfWords, arr = []) => {
  if (arr.length < numberOfWords) {
    const newWord = getRandomWord();
    return createLongStringOfWords(numberOfWords, [ ...arr, newWord ]);
  }
  return arr.join('');
}

module.exports = { getRandomWord, createLongStringOfWords };