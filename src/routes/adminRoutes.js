var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var beers = [{
    name: 'Lone Star',
    style: 'Lager',
    brewery: 'Pabst Brewing Company',
    breweryId: 'AKyyYN',
    beerId: 'HPC9eo',
    read: false
}, {
    name: 'Shamrock\'n Rye Ale',
    style: 'Rye Ale',
    brewery: 'Sierra Nevada Brewing Company',
    breweryId: 'nHLlnK',
    beerId: '1qx64W',
    read: false
}];

var books = [{
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 656,
    read: false
}, {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    bookId: 24280,
    read: false
}, {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
}, {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false
}, {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false
}, {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
}, {
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    read: false
}, {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
}];

var router = function(nav) {
    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function(err, results) {
                    res.send(results);
                    db.close();
                });
            });
            res.send('Inserting books');
        });

    adminRouter.route('/addBeers')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function(err, db) {
                var collection = db.collection('beers');
                collection.insertMany(beers, function(err, results) {
                    res.send(results);
                    db.close();
                });
            });
            res.send('Inserting beers');
        });

    return adminRouter;
};

module.exports = router;
