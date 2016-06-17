var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var beerController = function (beerService, nav) {

    var middleware = function (req, res, next) {
        //if (!req.user) {
        //res.redirect('/');
        //}
        next();
    };

    var getIndex = function(req, res) {
        var url = 'mongodb://localhost:27017/libraryApp';

        mongodb.connect(url, function(err, db) {
            var collection = db.collection('beers');
            //console.log(collection);
            collection.find({}).toArray(function(err, results) {
                res.render('beerListView', {
                    title: 'Beers',
                    nav: nav,
                    beers: results
                });
            });
        });

    };

    var getById = function(req, res) {
        var id = new ObjectId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';

        mongodb.connect(url, function(err, db) {
            var collection = db.collection('beers');
            collection.findOne(
                {
                    _id: id
                },
                function(err, results) {
                    if(results.beerId && results.breweryId) {
                        beerService.getBeerById(results.beerId,
                            function (err, beer) {
                                beerService.getBreweryById(results.breweryId, function (err, brewery)  {
                                    results.beer = beer;
                                    results.brewery = brewery;
                                    res.render('beerView', {
                                        title: 'Beers',
                                        nav: nav,
                                        beerAPI: results.beer,
                                        breweryAPI: results.brewery
                                    });
                                });
                            });
                    }
                    else {
                        res.render('beerView', {
                            title: 'Beers',
                            nav: nav,
                            beer: results
                        });
                    }
                });
        });

    };
    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = beerController;