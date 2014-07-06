var WTOGO = WTOGO || {};

WTOGO.attractions = {
    getAttractions: function (data)
    {
        console.log('Getting attractions...');
        var userRequest = {};
        userRequest.latitude = data.request.destination.latitude;
        userRequest.longitude = data.request.destination.longitude;

        $.ajax({
            url: 'http://' + config.api.url + config.api.port + '/api/attractions',
            type: 'GET',
            data: userRequest,
            success: function(data)
            {
                WTOGO.attractions.addContent(JSON.parse(data));
                WTOGO.comparison.hideLoader();
            }
        });
    },

    addContent: function (attractions)
    {
        var content = '<h2>Attractions in ' + WTOGO.user.request.destination.city + '</h2>';

        attractions.forEach( function (attraction) {
            content += '<div class="wtogo_attraction">';
                content += '<div class="container">';
                content += '<img src="' + attraction.picture + '" />';
                content += '<p class="name">' + attraction.name + '</p>';
                content += '<p class="address">' + attraction.address + '</p>';
                content += '</div>';
            content += '</div>';
        });

        $('.wtogo_attractions').append(content);
    }
}