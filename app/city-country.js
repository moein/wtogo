var CityCountry = Class.extend({
    init: function(response){
        this.response = response;
    },

    run: function(query){
        var config = require('../config/config');
        var _ = require('underscore');
        var request = require('request');
        var querystring = require("querystring");

        var param = {
            'latlng': query.lat + ',' + query.lng,
            key: config.googleApiKey
        };

        var url = "https://maps.googleapis.com/maps/api/geocode/json?" + querystring.stringify(param);
        var self = this;

        request(url, function(err, response, body) {
            if (200 === response.statusCode && null === err) {
                var resObjBody = JSON.parse(body);
                var results = resObjBody.results;

                var response = {
                    region: undefined
                    , city: undefined
                    , country: undefined
                    , locale: undefined
                };
                _.each(results, function(result){
                    if(typeof result.address_components === 'object') {
                        _.each(result.address_components, function(address){
                            if(typeof address.types === 'object') {
                                if(address.types[0] == 'administrative_area_level_2') {
                                    response['region'] = address.short_name;
                                }
                                if(address.types[0] == 'locality') {
                                    response['city'] = address.short_name;
                                }
                                if(address.types[0] == 'country') {
                                    response['country'] = address.long_name;
                                    response['locale'] = address.short_name;
                                }
                            }
                        });
                    }
                });
                //checking for bad data
                if (undefined === response.city && undefined !== response.country){
                    response.city = response.country;
                }

                self.response.send(JSON.stringify(response));
            } else {
                self.sendErrorMessage();
            }
        });
    },

    sendErrorMessage: function() {
        this.response.send(JSON.stringify(400, {msg: "Wrong thing happened"}));
    }
});


module.exports = function(response) {
    return new CityCountry(response);
};
