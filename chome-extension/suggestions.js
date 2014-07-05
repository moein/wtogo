var WTOGO = WTOGO || {};

WTOGO.suggestions = {
    api: {
        url: 'localhost',
        port: ':3000'
    },

    cities: [],

    suggestionContainer: '',

    getSuggestions: function()
    {
        WTOGO.user.getUserInfo();
        this.getCities();
    },

    getCities: function ()
    {
        console.log('Getting suggestions...');

        var self = this;
        $.ajax({
            url: 'http://' + this.api.url + this.api.port + '/api/top5',
            type: 'GET',
            data: this.userRequest,
            success: function(data)
            {
                var response = JSON.parse(data);
                self.cities = response.result;
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

        this.suggestionContainer = $('.wtogo_suggestions');
    },

    addCities: function ()
    {
        var self = WTOGO.suggestions;
        this.cities.forEach( function (city)
        {
            var cityBlock = '<li class="path wtogo_suggestion" title="' + city.city_name + ', Double Room" data-path="' + city.path_id + '" data-city="' + city.city_name + '" data-country="' + city.country_name + '" data-latitude="' + city.latitude + '" data-longitude="' + city.longitude + '">';
            cityBlock += '<div class="info">';
            cityBlock += '<img width="30" height="30" src="' + city.image_url + '" alt="">';
            cityBlock += '<div class="js_sidebaritem_city sidebaritem_city_text_wrap">' + city.city_name + ', <strong>' + city.country_name + '</strong></div>';
            cityBlock += '<strong>Double Room</strong><span class="chronik_item_visited"></span>';
            cityBlock += '</div></li></ul></div></li>';

            self.suggestionContainer.append(cityBlock);
        });

        self.addClickListener();
    },

    addClickListener: function () {
        $('.wtogo_suggestion').click( function () {
            $('html, body').animate({ scrollTop: 0 }, 'slow');

            // @TODO remove this lines when the Google Maps API returns data
            WTOGO.user.setOriginCity('Barcelona','Spain');

            WTOGO.user.request.destination = {
                city: $(this).attr('data-city'),
                country: $(this).attr('data-country')
            };

            displayComparisonCities(WTOGO.user);
        });
    }
}