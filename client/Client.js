const request = require('superagent');
const config = require('./config');
const { getRandomWord } = require('../src/util/itemText');

class Client {
  constructor() {
    this.word = getRandomWord();
    this.id = '' // Todo: implement this
  }

  itemApi(endpoint) {
    return config.baseUrl.concat(endpoint);
  }

  handleResponse(responseBody) {
    console.log(responseBody);
  }
  
  async searchForTerm(word) {
    // Do a one time search for the full string
    const response = await request.get(this.itemApi('/search'))
                                  .query({ q: word });
    this.handleResponse(response.body);
  }

  async searchWithAutoComplete(word) {
    // Hit search endpoint on each keystroke to simulate autocomplete population
    // as the user types in their query

  }


  async executeSearch() {
    if ('ld flag' === 'enabled') {
      await this.searchWithAutoComplete(this.word);
    } else {
      await this.searchForTerm(this.word);
    }
  }

  // Demo methods
  async seedDatabase() {
    try {
      console.log('hi')
    } catch (err) {
      console.error(err);
    }
  }

  clearDatabase() {

  }
}

module.exports = { Client };