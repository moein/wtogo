var Attraction = Class.extend({
    init: function(response) {
        this.response = response;
    },
    run: function(query) {
        var resultList = ['root'];
        
        var serverResponse = this.response;

        var photoFunc = function(i, placesList, maxResult){
            return function(err, response, body) {
                var element = {};
                element['name'] = placesList.results[i]['name'];
                element['address'] = placesList.results[i]['vicinity'];

                var photoData = JSON.parse(response.body);
                var photoReference = photoData.result.photos[0].photo_reference;

                var urlPicture = requestUrlPicture + '&photoreference=' + photoReference + '&key=' + KEY;
                element['picture'] = urlPicture;
                resultList.push(element);

                if (resultList.length == maxResult+1) {
                    resultList = JSON.stringify(resultList);
                    serverResponse.send(resultList);
                }
            }
        };

        var latitude = query.latitude;
        var longitude = query.longitude;
        var KEY = 'AIzaSyBhoBtDtVX5tr0UiDhKWtn0PJC8DVQ13PA';

        var requestedUrlPlaces = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';

        requestedUrlPlaces += 'location=' + latitude + ',' + longitude;
        requestedUrlPlaces += '&radius=50000';
        requestedUrlPlaces += '&rankby=prominence';
        requestedUrlPlaces += '&types=stadium|aquarium|art_gallery|church|museum|zoo';
        requestedUrlPlaces += '&key=AIzaSyBhoBtDtVX5tr0UiDhKWtn0PJC8DVQ13PA';

        var requestUrlDetails = 'https://maps.googleapis.com/maps/api/place/details/json?';
        var requestUrlPicture = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=200';

        var request = require('request');

        request(requestedUrlPlaces, function(err, response, body) {
            if (200 === response.statusCode && null === err) {
                var placesList = JSON.parse(response.body);
                var length  = placesList.results.length;
                var maxResult = (length < 5 ) ? length : 5;

                for (var i = 0; i < maxResult; i++)
                {
                    var url = requestUrlDetails + 'placeid=' + placesList.results[i]['place_id'] + '&key=' + KEY;
                    request(url, photoFunc(i, placesList, maxResult));
                }
            }
            else 
            {
                return err;
            }
        });
    }
});

module.exports = function(response){
    return new Attraction(response);
};
