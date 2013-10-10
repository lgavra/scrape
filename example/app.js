var Scrape, config, scrape;
Scrape = require('./scrape.js');
config = require('./config.js');

console.log('Initializing scrape...');
scrape = new Scrape.scrape({});