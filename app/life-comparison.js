var lifeComparison = {
    desiredItems: [
        "Meal, Inexpensive Restaurant",
        "Domestic Beer (0.5 liter draught)",
        "Cappuccino (regular)",
        "Water (0.33 liter bottle)",
        "One-way Ticket (Local Transport)",
        "Taxi Start (Normal Tariff)",
        "Gasoline (1 liter)"
    ],

    getData: function(source, destination, config) {
        var self = this;
        var requestedUrl = "https://www.kimonolabs.com/api/dbru15bw?apikey=";

        requestedUrl += config.kimonoApiKey;
        requestedUrl += '&country1=' + source.country;
        requestedUrl += '&country2=' + destination.country;
        requestedUrl += '&city1=' + source.city;
        requestedUrl += '&city2=' + destination.city;

        var request = require('request');
        var result;

        request(requestedUrl, function(err, response, body) {
            if (200 === response.statusCode && null === err) {
                var responseText = JSON.stringify(self.filterData(JSON.parse(response.body), response.statusCode));
                var response = require('../lib/response');
                response.send(responseText);
            } else {
                return err;
            }
        });
    },

    filterData: function(responseBody, status) {
        var self = this;
        var _ = require('underscore');
        var data = _.filter(responseBody.results['collection1'], function(itemObj) {
            if (-1 < _.indexOf(self.desiredItems, itemObj.item)){
                return itemObj;
            }
        });

        return {
            status: status,
            differences: data
        }
    },

}


module.exports = function(query){
    var config = require('../config/config');

    var source = {
        city: query.source_city,
        country: query.source_country
    };

    var destination = {
        city: query.destination_city,
        country: query.destination_country
    }

    lifeComparison.getData(source, destination, config);

};
