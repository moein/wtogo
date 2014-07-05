module.exports = function(query){
    var latitude = query.latitude;
    var longitude = query.longitude;
    var KEY = 'AIzaSyBhoBtDtVX5tr0UiDhKWtn0PJC8DVQ13PA';

    var requestedUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';

    requestedUrl += 'location=' + latitude + ',' + longitude;
    requestedUrl += '&radius=20000';
    requestedUrl += '&rankby=prominence';
    requestedUrl += '&types=stadium|aquarium';
    requestedUrl += '&key=AIzaSyBhoBtDtVX5tr0UiDhKWtn0PJC8DVQ13PA';

    console.log(requestedUrl);

    var request = require('request');

    request(requestedUrl, function(err, response, body) {
        if (200 == response.statusCode && null === err) {
            console.log(response.body);
            var resp = require('../lib/response');
            resp.send(response.body);
        } else {
            return err;
        }
    });
};
