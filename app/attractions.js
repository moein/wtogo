module.exports = function(query){
    var latitude = query.latitude;
    var longitude = query.longitude;
    var KEY = 'AIzaSyBhoBtDtVX5tr0UiDhKWtn0PJC8DVQ13PA';

    var requestedUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';

    requestedUrl += 'location=' + latitude + ',' + longitude;
    requestedUrl += '&radius=20000';
    requestedUrl += '&rankby=prominence';
    requestedUrl += '&types=stadium|aquarium|art_gallery|church|museum|zoo';
    requestedUrl += '&key=AIzaSyBhoBtDtVX5tr0UiDhKWtn0PJC8DVQ13PA';

    var request = require('request');

    request(requestedUrl, function(err, response, body) {
        if (200 == response.statusCode && null === err) {

            var jsonData = JSON.parse(response.body);
            var resultList = [];

            for (var i = 0; i < jsonData.results.length; i++) {
                var name = jsonData.results[i]['name'];
                var address = jsonData.results[i]['vicinity'];
                var result = {};
                result['name'] = name;
                result['address'] = address;
                resultList.push(result);
            }

            resultList = JSON.stringify(resultList);

            var resp = require('../lib/response');
            resp.send(resultList);
        } else {
            return err;
        }
    });
};
