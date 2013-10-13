scrape
========

Use Node.js to scrape webpages. (Once scraped, all commands are meant to be used for objects in a set of an array, not integers/strings but key: value pairs)

## Commands

### Scrape (url, pages)
Setup your new scraper with the url and page count. 

### each
Will let you loop through each page and with the proper jQuery selectors retrieve the data you want. (You must change the jQuery selectors in order to use this, will work on making it generic soon.)

### page
Will loop through each page, if you have multiple pages. Otherwise it will just return the body of the one page. (Currently includes a config.url.pageQ in the code to add the page number at the end of the url, must change it or set it like so from your config file.)


### unique
Will remove duplicate objects, can add more keys or less keys depending on what you want to remove based on.

### remove
Will remove items from the array based on exact matches.

### remove_regex
Will remove items from the array based on regex expressions, allowing you to remove items based on matching parts of it.

### merge
Will join arrays for you, if you are trying to remove duplicates when adding multiple arrays, first use merge then one of the duplicate removal commands.

### download
Will turn objects into csv format then convert it into an excel file and download in the same folder of the script.


## Author

**Lior Gavra**


## Examples

Currently there is one example that can be found in the [examples] (https://github.com/lgavra/scrape/tree/master/example) folder.


## Tests

Currently there is one example that can be found in the [tests] (https://github.com/lgavra/scrape/tree/master/test) folder.
