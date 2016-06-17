var http = require('http');

var brewerydbService = function () {

    var getBeerById = function (id, cb) {

        var beerOptions = {
            host: 'api.brewerydb.com',
            path: '/v2/beer/'+ id + '?format=json&key=e11959b2506f660a47f8dd80e96a99ac'
        };

        var beerCallback = function (response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                var jsonResult = JSON.parse(str);
                cb(null, jsonResult.data);
            });
        };

        http.request(beerOptions, beerCallback).end();
    };

    var getBreweryById = function (id, cb) {

        var breweryOptions = {
            host: 'api.brewerydb.com',
            path: '/v2/brewery/'+ id + '?format=json&key=e11959b2506f660a47f8dd80e96a99ac'
        };

        var breweryCallback = function (response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                var jsonResult = JSON.parse(str);
                cb(null, jsonResult.data);
            });
        };

        http.request(breweryOptions, breweryCallback).end();
    };

    return {
        getBeerById: getBeerById,
        getBreweryById: getBreweryById
    };
};

module.exports = brewerydbService;