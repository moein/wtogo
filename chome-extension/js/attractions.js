var WTOGO = WTOGO || {};

WTOGO.attractions = {
    displayAttractions: function (data)
    {
        var userRequest = {};
        userRequest.latitude = data.request.destination.latitude;
        userRequest.longitude = data.request.destination.longitude;

        $.ajax({
            url: 'http://' + config.api.url + config.api.port + '/api/attractions',
            type: 'GET',
            data: userRequest,
            success: function(data)
            {
                var response = JSON.parse(data);
                WTOGO.comparison.addAttractionsContent(response);
            }
        });
    },

    addAttractionsContent: function (attractions)
    {
        attractions.forEach( function (attraction) {
            var content = '<div class="wtogo_attraction">';
            content += '<div class="container">';
            content += '<img src="' + attraction.picture + '" />';
            content += '<p class="name">' + attraction.name + '</p>';
            content += '<p class="address">' + attraction.address + '</p>';
            content += '</div>';
            content += '</div>';

            $('.attractions').append(content);
        });
    }
}