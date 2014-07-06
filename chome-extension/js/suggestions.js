var WTOGO = WTOGO || {};

WTOGO.suggestions = {

    cities: [],

    getSuggestions: function ()
    {
        console.log('Getting suggestions...');

        var self = this;
        $.ajax({
            url: 'http://' + config.api.url + config.api.port + '/api/top5',
            type: 'GET',
            data: WTOGO.user.request,
            success: function(data)
            {
                self.cities = JSON.parse(data);
                self.createSuggestionsContainer();
                self.addCities();
            }
        });
    },

    createSuggestionsContainer: function ()
    {
        var sidebar = $('.sidebar_tabs');

        $('.history').remove('last');

        sidebar.append('<li class="sidebar_element history last" data-state="history"><div>Custom suggestions for you</div></li>');
        sidebar.append('<li class="sidebar_display"><div id="js_right_bar_history"><ul class="city_list history wtogo_suggestions">');

        sidebar.append('</ul></div></li>');
    },

    addCities: function ()
    {
        var self = WTOGO.suggestions;
        var i = 1;
        this.cities.forEach( function (city)
        {
            var cityBlock = '<li class="path wtogo_suggestion" title="' + city.city_name + ', Double Room" data-path="' + city.path_id + '" data-city="' + city.city_name + '" data-country="' + city.country_name + '" data-latitude="' + city.latitude + '" data-longitude="' + city.longitude + '">';
            cityBlock += '<div class="info">';
            cityBlock += '<img width="30" height="30" src="' + city.image_url + '" alt="">';
            cityBlock += '<div class="js_sidebaritem_city sidebaritem_city_text_wrap">' + i + '. ' + city.city_name + ', <strong>' + city.country_name + '</strong></div>';
            cityBlock += '<strong>Double Room</strong><span class="chronik_item_visited"></span>';
            cityBlock += '</div></li></ul></div></li>';
            i++;

            $('.wtogo_suggestions').append(cityBlock);
        });

        self.addClickListener();
    },

    addClickListener: function () {
        $('.wtogo_suggestion').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 'slow');

            WTOGO.user.request.destination = {
                city: $(this).attr('data-city'),
                country: $(this).attr('data-country'),
                latitude: $(this).attr('data-latitude'),
                longitude: $(this).attr('data-longitude')
            };

            WTOGO.comparison.displayComparison(WTOGO.user);
        });
    }
}