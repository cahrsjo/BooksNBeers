var express = require('express');
var beerRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
//var objectId = require('mongodb').ObjectID;

var router = function(nav) {
    var beerService = require('../services/brewerydbService')();
    var beerController = require('../controllers/beerController')(beerService, nav);
    beerRouter.use(beerController.middleware);

    beerRouter.route('/')
        .get(beerController.getIndex);

    beerRouter.route('/:id')
        .get(beerController.getById);
    return beerRouter;
};


module.exports = router;
