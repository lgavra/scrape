var Scrape, config, scrape_music, url, url_extras, pages, artist, title, added_on, results_list;
Scrape = require('./scrape.js');
config = require('./config.js');
url_extras = config.url.channelQ + config.url.channel + config.url.dateQ + config.url.year + config.url.week;
url = config.url.base_url + url_extras;
pages = config.items.pages;
results_list = [];

console.log('Initializing scrape...');

//Example of using sirius/xm playlist to pull off song content 
scrape_music = new Scrape.scrape(url, pages);

scrape_music.each(artist, title, added_on, function (result) {
    var completed;
    results_list.push(result);
    completed = 50 * config.items.pages.length;
    if (results_list.length === completed) {

        //duplicate songs are removed here
        scrape_music.unique(results_list, artist, title, function (result) {
            
            //specific titles are removed here
            var remove = [
                {title: /^\#BPM/},
                {title: /(.*).com(.*)/}
            ];
            scrape_music.remove_regex(result, remove, title, function (result) {
                scrape_music.download(result);
            });
        });
    }
});