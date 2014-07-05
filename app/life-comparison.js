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

        console.log(requestedUrl);
        request(requestedUrl, function(err, response, body) {
            console.log(response.body);
            console.log(response.statusCode);
            if (200 == response.statusCode && null === err) {
                console.log('getting here');
                return self.filterData(response.body);
            } else {
                return err;
            }
        });
    },

    filterData: function(responseBody) {
        var self = this;
        console.log(responseBody.results);
        var _ = require('underscore');
        // return _.map(responseBody.results['collection1'], function(itemObj) {
        //     if (-1 < _.indexOf(self.desiredItems, itemObj.item)){
        //         return itemObj;
        //     }
        // });
    },

}


module.exports = function(query){
    // var sourceCity = query.source_city;
    // var destinationCity = query.destination_city;
    //
    // var request = require('request');
    var config = require('../config/config');
    //
    // console.log(config);
    // var requestedUrl = "https://www.kimonolabs.com/api/dbru15bw?apikey=" + config.kimonoApiKey;
    // request(requestedUrl, function(err, response, body) {
    //     console.log(response.statusCode);
    //     console.log(err);
    //     if (200 === response.statusCode && null === err) {
    //         //have fun
    //     } else {
    //         return err;
    //     }
    // });
    // var source = {
    //     city: query.source_city,
    //     country: query.source_country
    // };
    //
    // var destination = {
    //     city: query.destination_city,
    //     country: query.destination_country
    // }
    var source = {
        city: 'Madrid',
        country: 'Spain'
    };

    var destination = {
        city: 'Dusseldorf',
        country: 'Germany'
    }



    //Do your shit here

    var differences = lifeComparison.getData(source, destination, config);

    console.log(differences);

    var result = {"differences": [
        {
            "item": "Beer",
            "source": "5.4 €",
            "destination": "6.3 €"
        },
        {
            "item": "Meal, Inexpensive Restaurant",
            "source": "10.5 €",
            "destination": "11 €"
        }
    ]};

    return result;
};
