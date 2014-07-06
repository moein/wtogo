var WTOGO = WTOGO || {};

WTOGO.weather = {
    getWeatherComparison: function (user)
    {
        console.log('Getting weather...');
        var userRequest = {};
        userRequest.city = user.origin.city + ',' + user.origin.country;
        userRequest.checkin = user.request.checkin;
        userRequest.checkout = user.request.checkout;

        var weather = {};

        $.ajax({
            url: 'http://' + config.api.url + config.api.port + '/api/weather',
            type: 'GET',
            data: userRequest,
            success: function(data)
            {
                var response = JSON.parse(data);
                weather.origin = response;

                userRequest.city = user.request.destination.city + ',' +  user.request.destination.country;

                $.ajax({
                    url: 'http://localhost:3000/api/weather',
                    type: 'GET',
                    data: userRequest,
                    success: function(data)
                    {
                        var response = JSON.parse(data);
                        weather.destination = response;

                        WTOGO.weather.addContent(weather);
                        WTOGO.comparison.hideLoader();
                    }
                });
            }
        });
    },

    addContent: function (weather)
    {
        var content = '<h3>Average weather for the selected date</h3>';

        content += '<table>';

        content += '<thead>';
            content += '<tr>';
                content += '<td>&nbsp;</td>';
                content += '<td><b>' + WTOGO.user.origin.city + '</b></td>';
                content += '<td><b>' + WTOGO.user.request.destination.city + '</b></td>';
            content += '</tr>';
        content += '</thead>';

        content += '<tbody>';

        content += '<tr>';
            content += '<td>Current weather</td>';
            content += '<td><img src="' + weather.origin.icon + '" /></td>';
            content += '<td><img src="' + weather.destination.icon + '" /></td>';
        content += '</tr>';

        content += '<tr>';
            content += '<td>Average temperature</td>';
            content += '<td>' + weather.origin.temp_avg + ' ºC</td>';
            content += '<td>' + weather.destination.temp_avg + ' ºC</td>';
        content += '</tr>';

        content += '<tr>';
            content += '<td>Min. Temperature</td>';
            content += '<td>' + weather.origin.temp_min + ' ºC</td>';
            content += '<td>' + weather.destination.temp_min + ' ºC</td>';
        content += '</tr>';

        content += '<tr>';
            content += '<td>Max. temperature</td>';
            content += '<td>' + weather.origin.temp_max + ' ºC</td>';
            content += '<td>' + weather.destination.temp_max + ' ºC</td>';
        content += '</tr>';

        content += '<tr>';
            content += '<td>Humidity</td>';
            content += '<td>' + weather.origin.humidity + ' %</td>';
            content += '<td>' + weather.destination.humidity + ' %</td>';
        content += '</tr>';

        content += '<tr>';
            content += '<td>Wind</td>';
            content += '<td>' + weather.origin.wind + ' km/h</td>';
            content += '<td>' + weather.destination.wind + ' km/h</td>';
        content += '</tr>';

        content += '</tbody>';
        content += '</table>';

        $('.wtogo_weather').append(content);
    }
}