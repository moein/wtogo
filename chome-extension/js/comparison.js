var WTOGO = WTOGO || {};

WTOGO.comparison = {
    count: 0,

    displayComparison: function (data)
    {
        this.clearContainer();
        this.createContainers(data.origin.city, data.request.destination.city);

        WTOGO.lifecost.displayLifeComparisonInfo(data);
        WTOGO.weather.displayWeatherComparison(data);
        WTOGO.attractions.displayAttractions(data);
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

    hideLoader: function ()
    {
        count++;
        if (count == 3)
        {
            $('#js_pricesearch_transparency').hide();
        }
    }
}
