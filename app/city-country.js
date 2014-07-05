module.exports = function(query) {
    console.log('bue');
    var request = require('request');
    var config = require('../config/config');

    console.log(query);

    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
    url += query.lat + ',';
    url += query.long + '&key=';
    url += config.googleApiKey;

    console.log(url);

    request(url, function(err, response, body) {
        if (200 === response.statusCode && null === err) {
            var resObjBody = JSON.parse(response.body);
            var addressComponents = resObjBody.results.address_components;
            var result = [];
            var arrLength = addressComponents.length;
            for (var i = 0; i < arrLength; i++) {
            //    if (addressComponents[i]['types'][0])
            }
        } else {
            self.sendErrorMessage();
        }
    });
};
