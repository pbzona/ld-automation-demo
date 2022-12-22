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
    this.usingAutocomplete = false;
    
    this.ldclient = LD.getClient();
    this.ctx = { key: this.id };

    this.initialize();
  }

  async initialize() {
    console.log('Initializing client');
    this.usingAutocomplete = await this.ldclient.variation('enable-search-autocomplete', this.ctx, false);

    this.executeSearch();
  }

  itemApi(endpoint) {
    return config.baseUrl.concat(endpoint);
  }

  handleResponse() {
    this.emit('done', this.id);
    if (this.currentSearch === this.word || this.results.length === 0) {
    }
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
  }


  async executeSearch() {
    if (this.usingAutocomplete) {
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