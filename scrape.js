var request, cheerio, Scrape, fs;
fs = require('fs');
request = require('request');
cheerio = require('cheerio');

Scrape = (function () {
    //used to setup what is going to be Scraped
    function Scrape (url, pages) {
        this.url = url;
        this.page_range = pages;
    }

    //loop thrugh each page and find jquery elements that match
    Scrape.prototype.each = function (key1, key2, key3, cb) {
        return this.page(function ($page) {
            var $trs;
            //$trs selects all the rows from 1-50
            $trs = $page('tr').slice(11, -3);
            return $trs.each(function (i, item) {
                var result;
                result = {};
                result.key1 = $page(item).find('td').eq(1).text();
                result.key2 = $page(item).find('td').eq(2).text();
                result.key3 = $page(item).find('td').eq(3).text();
                return cb(result);
            });
        });
    };

     //used to loop through all pages
    Scrape.prototype.page = function (cb) {
        var _this = this;
        //Had page_number set in my config page
        var page_number;
        return this.page_range.forEach(function (i) {
            return request("" + _this.url + page_number + i, function (err, res, body) {
                if (err) { throw err; }
                return cb(cheerio.load(body));
            });
        });
    };

    //removes duplicates for objects
    Scrape.prototype.unique = function (arr, key1, key2, cb) {
        var n, y, x, i, r;
        r = [];
o:      for (i = 0, n = arr.length; i < n; i++) {
            for (x = 0, y = r.length; x < y; x++) {
                if (r[x].key1 == arr[i].key1 && r[x].key2 == arr[i].key2) {
                    continue o;
                }
            }
            r.push(arr[i]);
        }
        return cb(r);
    };


    //convert to and download to xls (excel file) comma appears on the second and every title following
    Scrape.prototype.download = function (arr) {
        var newResults, newR, x;
        newResults = [];
        for (x = arr.length - 1; x >= 0; x--) {
            newR = arr[x].title.replace('""')  + '\t' + arr[x].artist.replace('""')  + '\t' + arr[x].added_on.replace('""') + '\n';
            newResults.push(newR);
            if (newResults.length === arr.length) {
                fs.writeFile('data.xls', newResults, function (err) {
                    if (err) { throw err; }
                    console.log('Saved to disk');
                });
            }
        }
    };

    //remove specific results from the array (can combine this with duplicate removal to stop from double querying)
    Scrape.prototype.merge = function (arr, arr2, cb) {
        var new_array;
        new_array = [];
        new_array = arr.concat(arr2);
        cb(new_array);
    };

    //remove values from the array that are an exact match for the object key
    Scrape.prototype.remove = function (arr, remove, key1, key2, cb) {
        var n, y, x, i, r, z;
        z = [];
        r = remove;
o:      for (i = 0, n = arr.length; i < n; i++) {
            for (x = 0, y = r.length; x < y; x++) {
                if (r[x].key1 == arr[i].key1 && r[x].key2 == arr[i].key2) {
                    continue o;
                }
            }
            z.push(arr[i]);
        }
        return cb(z);
    };

    //remove regex values for object's keys that match regex expression
    Scrape.prototype.remove_regex = function (arr, remove, key1, cb) {
        var n, y, x, i, r, z;
        z = [];
        r = remove;
o:      for (i = 0, n = arr.length; i < n; i++) {
            for (x = 0, y = r.length; x < y; x++) {
                if (arr[i].key1.match(r[x].key1)) {
                    continue o;
                }
            }
            z.push(arr[i]);
        }
        return cb(z);
    };

    return Scrape;
}());

exports.scrape = Scrape;


