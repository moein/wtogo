var LifeComparison = Class.extend({

    init: function(response){
        this.response = response;
        this.desiredItems = [
            "Meal, Inexpensive Restaurant",
            "Domestic Beer (0.5 liter draught)",
            "Cappuccino (regular)",
            "Water (0.33 liter bottle)",
            "One-way Ticket (Local Transport)",
            "Taxi Start (Normal Tariff)",
            "Gasoline (1 liter)"
        ];
    },

    run: function(query){
        var config = require('../config/config');
        if (undefined !== query.source_city && undefined !== query.source_country) {
            var source = {
                city: query.source_city,
                country: query.source_country
            };
        }

        if (undefined !== query.destination_city && undefined !== query.destination_country) {
            var destination = {
                city: query.destination_city,
                country: query.destination_country
            };
        }

        if (undefined !== source && undefined !== destination) {
            this.getData(source, destination, config);
        } else {
            this.sendErrorMessage();
        }
    },

    getData: function(source, destination, config) {
        var self = this;
        var requestedUrl = "https://www.kimonolabs.com/api/dbru15bw?apikey=";

        requestedUrl += config.kimonoApiKey;
        requestedUrl += '&country1=' + source.country;
        requestedUrl += '&country2=' + destination.country;
        requestedUrl += '&city1=' + source.city;
        requestedUrl += '&city2=' + destination.city;

        var request = require('request');

        request(requestedUrl, function(err, response, body) {
            if (200 === response.statusCode && null === err) {
                var resObjBody = JSON.parse(response.body);

                if (source.city.toLowerCase() === resObjBody.results['collection2'][0].source_city.toLowerCase()
                     && destination.city.toLowerCase() === resObjBody.results['collection2'][0].destination_city.toLowerCase()){
                    var responseText = JSON.stringify(self.filterData(resObjBody, response.statusCode));
                    self.response.send(responseText);
                } else {
                    self.sendErrorMessage();
                }
            } else {
                self.sendErrorMessage();
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

    sendErrorMessage: function() {
        var responseText = {msg: "Check the values please"};
        this.response.send(400, JSON.stringify(responseText));
    }
});

module.exports = function(response){
    return new LifeComparison(response);
};
