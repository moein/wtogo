module.exports = function(query){
    var city = query.city;
    var KEY = 'AIzaSyBhoBtDtVX5tr0UiDhKWtn0PJC8DVQ13PA';

    var requestedUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';

    requestedUrl += 'location=-33.8670522,151.1957362'; // Todo: as a parameter
    requestedUrl += '&radius=20000';
    requestedUrl += '&rankby=prominence';
    requestedUrl += '&types=stadium|aquarium';
    requestedUrl += '&key=AIzaSyBhoBtDtVX5tr0UiDhKWtn0PJC8DVQ13PA';

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

    // var result = {
    //     "attractions": [
    //         {
    //             "id": 1,
    //             "name": "Parque del retiro",
    //             "image": "retiro.jpg"
    //         },
    //         {
    //             "id": 2,
    //             "name": "Parque del retiro jesus",
    //             "image": "retiro.jpg"
    //         },
    //         {
    //             "id": 3,
    //             "name": "Parque del retiro antonio",
    //             "image": "retiro.jpg"
    //         },
    //     ]
    // };

    // return result;
};
