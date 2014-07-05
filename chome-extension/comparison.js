var WTOGO = WTOGO || {};

WTOGO.comparison = {

    displayComparison: function (data)
    {
        debugger;
        this.clearContainer();
        this.createContainers(data.origin.city, data.request.destination.city);

      this.displayLifeComparisonInfo(data);
      this.displayWeatherComparison(data);
      this.displayAttractions(data);

        $('#js_pricesearch_transparency').hide();
    },

    clearContainer: function ()
    {
        $('#js_pricesearch_transparency').show();
        $('#js_itemlist').empty();
        $('.container_itemlist').empty();
        $('#js_pagination').empty();
    },

    createContainers: function (origin_city, destination_city)
    {
        $('.container_itemlist').append('<div class="comparison-cities" ></div>');
        $('.comparison-cities').append('<h2>' + origin_city + ' vs. ' + destination_city + '</h3>');
        $('.comparison-cities').append('<div class="life-comparison"></div>');
        $('.comparison-cities').append('<div class="weather-comparison"></div>');
        $('.comparison-cities').append('<div class="attractions"></div>');
    },

    displayLifeComparisonInfo: function (data)
    {
        var userRequest = {};
        userRequest.source_city = data.origin.city;
        userRequest.source_country = data.origin.country;
        userRequest.destination_city = data.request.destination.city;
        userRequest.destination_country = data.request.destination.country;

        $.ajax({
            url: 'http://192.168.2.2:3000/api/life-comparison',
            type: 'GET',
            data: userRequest,
            success: function(data)
            {
                var response = JSON.parse(data);
                WTOGO.comparison.addLifeComparisonContent(response.differences);
            }
        });
    },

    addLifeComparisonContent: function (differences)
    {
        var content = '<h3>Life cost</h3>';

        content += '<table>';

        content += '<thead>';
            content += '<tr>';
                content += '<td><b>Criteria</b></td>';
                content += '<td><b>' + WTOGO.user.request.destination.city + '</b></td>';
                content += '<td><b>' + WTOGO.user.origin.city + '</b></td>';
                content += '<td><b>Difference</b></td>';
            content += '</tr>';
        content += '</thead>';

        content += '<tbody>';

        differences.forEach(function(difference_item)
        {
            content += '<tr>';
                content += '<td>' +  difference_item.item + '</td>';
                content += '<td>' +  difference_item.price_destination.text + '</td>';
                content += '<td>' +  difference_item.price_source.text + '</td>';
                content += '<td class="difference">';
                content += difference_item.difference + '</td>';
            content += '</tr>';
        });

        content += '</tbody>';
        content += '</table>';

        $('.life-comparison').append(content);
        $('.difference').each(function () {
            if ($(this).text().indexOf('-') === 0)
            {
                $(this).addClass('redlife');
            }
            else
            {
                $(this).addClass('greenlife');
            }
        });
    },

    displayWeatherComparison: function (user)
    {
        var userRequest = {};
        userRequest.city = user.origin.city + ',' + user.origin.country;
        userRequest.checkin = user.request.checkin;
        userRequest.checkout = user.request.checkout;

        var weather = {};

        $.ajax({
            url: 'http://localhost:3000/api/weather',
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

                        WTOGO.comparison.addWeatherComparisonContent(weather, user.request.destination.city);
                    }
                });
            }
        });
    },

    addWeatherComparisonContent: function (weather, destination_city)
    {
        var content = '<h3>Average weather for the selected date</h3>';

        content += '<table>';

        content += '<thead>';
            content += '<tr>';
                content += '<td>&nbsp;</td>';
                content += '<td><b>' + destination_city + '</b></td>';
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

        $('.weather-comparison').append(content);
    },

    displayAttractions: function (data)
    {
        var userRequest = {};
        userRequest.latitude = data.request.destination.latitude;
        userRequest.longitude = data.request.destination.longitude;

        $.ajax({
            url: 'http://localhost:3000/api/attractions',
            type: 'GET',
            data: userRequest,
            success: function(data)
            {
                var response = JSON.parse(data);
                this.addAttractionsContent(response);
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
