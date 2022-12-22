const { EventEmitter } = require('events');
const request = require('superagent');
const config = require('./config');
const { getRandomWord } = require('../src/util/itemText');
const { getRandomBytes } = require('../src/util/getRandomBytes');
const LD = require('./launchdarkly');

class Client extends EventEmitter {
  constructor() {
    super();
    this.word = getRandomWord();
    this.currentSearch = '';
    this.id = getRandomBytes(16);
    this.results = [];

    this.ldclient = LD.getClient();
    this.ctx = { key: this.id };
  }

  itemApi(endpoint) {
    return config.baseUrl.concat(endpoint);
  }

  handleResponse() {
    console.log(`Found ${this.results.length} results`)
    this.emit('done', this.id);
  }
  
  async searchForTerm(word) {
    console.info('not using autocomplete');

    // Do a one time search for the full string
    this.currentSearch = this.word;
    const response = await request.get(this.itemApi('/search'))
                                  .query({ q: word });
    this.results = response.body;
    this.handleResponse();
  }

  async searchWithAutoComplete(word) {
    console.info('using autocomplete');
    // Hit search endpoint on each keystroke to simulate autocomplete population
    // as the user types in their query
    for (let letter of this.word.split('')) {
      await this.waitForKeystroke();
      this.currentSearch = this.currentSearch.concat(letter);
      console.log('Searching for:', this.currentSearch);
      const response = await request.get(this.itemApi('/search'))
                                  .query({ q: this.currentSearch });
      this.results = response.body;
    }

    this.handleResponse();
  }


  async executeSearch() {
    console.log('Executing search for', this.id);
    const shouldUseAutoComplete = await this.ldclient.variation('enable-search-autocomplete', this.ctx, false);
    if (shouldUseAutoComplete) {
      await this.searchWithAutoComplete(this.word);
    } else {
      await this.searchForTerm(this.word);
    }
  }

  async waitForKeystroke() {
    const msToWait = Math.floor(Math.random() * 200);
    return new Promise(resolve => setTimeout(resolve, msToWait))
  }

  // Demo methods
  async seedDatabase(numberOfRecords) {
    try {
      const response = await request.post(this.itemApi(`/seed/${numberOfRecords}`));
      if (response.statusCode === 201) {
        console.log(`Successfully added ${numberOfRecords} records to the database`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async clearDatabase() {
    try {
      const response = await request.delete(this.itemApi(`/deleteAll`))
                                    .query({ really: 'yes' });
      if (response.statusCode === 200) {
        console.log(`All database records have been cleared`);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = { Client };