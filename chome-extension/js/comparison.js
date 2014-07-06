var WTOGO = WTOGO || {};

WTOGO.comparison = {
    count: 0,

    displayComparison: function (data)
    {
        this.createContainers(data.origin.city, data.request.destination.city);

        WTOGO.lifecost.getLifecostComparison(data);
        WTOGO.weather.getWeatherComparison(data);
        WTOGO.attractions.getAttractions(data);
    },

    clearContainer: function ()
    {
        $('#js_pricesearch_transparency').slideDown();
        $('.wtogo_comparison').remove();
        $('#js_itemlist').hide();
        $('#js_pagination').hide();
    },

    createContainers: function (origin_city, destination_city)
    {
        this.clearContainer();

        $('.container_itemlist').append('<div class="wtogo_comparison" ></div>');
        $('.wtogo_comparison').append('<span class="wtogo_close_wrapper"><span class="img_sprite_moon close_icon_black">&nbsp;</span></span>');
        $('.wtogo_comparison').append('<h2>' + origin_city + ' vs. ' + destination_city + '</h3>');
        $('.wtogo_comparison').append('<div class="wtogo_lifecost"></div>');
        $('.wtogo_comparison').append('<div class="wtogo_weather"></div>');
        $('.wtogo_comparison').append('<div class="wtogo_attractions"></div>');

        $('.wtogo_close_wrapper').click(function () {
            WTOGO.comparison.closeComparison();
        });
    },

    hideLoader: function ()
    {
        if (++this.count == 3)
        {
            $('#js_pricesearch_transparency').hide();
        }
    },

    closeComparison: function () {
        $('#js_pricesearch_transparency').show();
        $('.wtogo_comparison').remove();
        this.count = 0;
        $('#js_itemlist').show();
        $('#js_pagination').show();
        $('#js_pricesearch_transparency').slideUp();
    }
}
