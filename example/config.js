module.exports = {
    //url for page to scrape
    url: {
        base_url: 'http://www.dogstarradio.com/search_playlist.php',
        channelQ: '?channel=',
        channel: 51,
        dateQ: '&tdate=',
        year: 2013,
        week: 40,
        pageQ: '&page='
    },
    //items to scrape
    items: {
        pages: [0, 1, 2]
    }
};