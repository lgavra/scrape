//test file
var Scrape, chai, expect;
Scrape = require('../scrape.js');
chai = require('chai');
expect = chai.expect;

console.log('Initializing scrape Tests...');


suite('Scrape Tests', function () {
    before(function () {
        scrape_test = new Scrape.scrape({});
    });

    //test unique
    test('test unique', function () {
        var Array1 = [
        {key1: 'test1', key2: 'text'}, 
        {key1: 'test2', key2: 'text'},
        {key1: 'test2', key2: 'text'},
        {key1: 'test3', key2: 'text2'},
        {key1: 'test2', key2: 'text'},
        {key1: 'test6', key2: 'text3'}];

        var ArrayResult = [
        {key1: 'test1', key2: 'text'}, 
        {key1: 'test2', key2: 'text'},
        {key1: 'test3', key2: 'text2'},
        {key1: 'test6', key2: 'text3'}];
        var key1, key2;
        scrape_test.unique(Array1, key1, key2, function (result) {
            expect(result).to.deep.equal(ArrayResult);
        });
    });


    //test merge
     test('test merge', function () {
        var Array1 = [
        {key1: 'test1', key2: 'text'}, 
        {key1: 'test3', key2: 'text2'},
        {key1: 'test2', key2: 'text'},
        {key1: 'test6', key2: 'text3'}];
        var Array2 = [
        {title: 'test76', result: 'text23'}, 
        {title: 'test6', result: 'text32'},
        {title: 'test5', result: 'text'}];
        var ArrayResult = [
        {key1: 'test1', key2: 'text'}, 
        {key1: 'test3', key2: 'text2'},
        {key1: 'test2', key2: 'text'},
        {key1: 'test6', key2: 'text3'},
        {title: 'test76', result: 'text23'}, 
        {title: 'test6', result: 'text32'},
        {title: 'test5', result: 'text'}];
        scrape_test.merge(Array1, Array2, function (result) {
            expect(result).to.deep.equal(ArrayResult);
        });
    });

     //test remove
     test('test remove', function () {
        var key1, key2;
        var Array1 = [
        {key1: 'test1', key2: 'text'}, 
        {key1: 'test2', key2: 'text'},
        {key1: 'test2', key2: 'text'},
        {key1: 'test3', key2: 'text2'},
        {key1: 'test2', key2: 'text'},
        {key1: 'test6', key2: 'text3'}];
        var remove = [{key1: 'test1', key2: 'text'},]
        var ArrayResult = [ 
        {key1: 'test2', key2: 'text'},
        {key1: 'test2', key2: 'text'},
        {key1: 'test3', key2: 'text2'},
        {key1: 'test2', key2: 'text'},
        {key1: 'test6', key2: 'text3'}];
        scrape_test.remove(Array1, remove, key1, key2, function (result) {
            expect(result).to.deep.equal(ArrayResult);
        });
    });

      //test remove_regex
     test('test remove_regex', function () {
        var key1, key2;
        var Array1 = [
        {key1: 'test1', key2: 'text'}, 
        {key1: '2test2', key2: 'text'},
        ];
        var remove = [
            {key1: /^\d(.*)/},
        ];
        var ArrayResult = [ 
        {key1: 'test1', key2: 'text'},
        ];
        scrape_test.remove_regex(Array1, remove, key1, function (result) {
            expect(result).to.deep.equal(ArrayResult);
        });
    });
}); 


//test download
