var WTOGO = WTOGO || {};

WTOGO.suggestions = {
    api: {
        url: 'localhost',
        port: ':3000'
    },

    cities: [],

    suggestionContainer: '',

    userRequest: {},

    userLocation: {},

    getSuggestions: function()
    {
        this.createSuggestionsContainer();
        this.getRequestInfo();
    },

    getRequestInfo: function()
    {
        this.userRequest.checkin = getURLParameter(encodeURIComponent('aDateRange[arr]')).replace(/-/g, '');
        this.userRequest.checkout = getURLParameter(encodeURIComponent('aDateRange[dep]')).replace(/-/g, '');
        var userLocale = $('meta[name=trv-localization]');
        this.userRequest.locale = userLocale.attr('data-locale');

        this.getLocation();
    },

    getLocation: function () {
        if (navigator.geolocation)
        {
            return navigator.geolocation.getCurrentPosition(this.setLocation);
        }
        else
        {
            return false;
        }
    },

    setLocation: function (location)
    {
        WTOGO.suggestions.userRequest.latitude = location.coords.latitude;
        WTOGO.suggestions.userRequest.longitude = location.coords.longitude;

        WTOGO.suggestions.getCities();
    },

    getCities: function ()
    {
        var self = this;
        $.ajax({
            url: 'http://' + this.api.url + this.api.port + '/api/top5',
            type: 'GET',
            data: this.userRequest,
            success: function(data)
            {
                var response = JSON.parse(data);
                self.cities = response.result;
                self.addCities();
            }
        });
    },

    createSuggestionsContainer: function ()
    {
        var sidebar = $('.sidebar_tabs');

        $('.history').remove('last');

        sidebar.append('<li class="sidebar_element history last" data-state="history"><div>Custom suggestions</div></li>');
        sidebar.append('<li class="sidebar_display"><div id="js_right_bar_history"><ul class="city_list history wtogo_suggestions">');

        sidebar.append('</ul></div></li>');

        this.suggestionContainer = $('.wtogo_suggestions');
    },

    addCities: function ()
    {
        var self = WTOGO.suggestions;
        this.cities.forEach( function (city)
        {
            var cityBlock = '<li class="path wtogo_suggestion" title="' + city.city_name + ', Double Room" data-path="' + city.path_id + '" data-city="' + city.city_name + '" data-country="' + city.country_name + '">';
            cityBlock += '<div class="info">';
            cityBlock += '<img width="30" height="30" src="' + city.image_url + '" alt="">';
            cityBlock += '<div class="js_sidebaritem_city sidebaritem_city_text_wrap">' + city.city_name + ', <strong>' + city.country_name + '</strong></div>';
            cityBlock += '<strong>Double Room</strong><span class="chronik_item_visited"></span>';
            cityBlock += '</div></li></ul></div></li>';

            self.suggestionContainer.append(cityBlock);
        });
    }
}


function getURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}