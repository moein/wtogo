function getSuggestions()
{
    var userRequest = {};
    userRequest.checkIn = getURLParameter('aDateRange[arr]');
    userRequest.checkOut = getURLParameter('aDateRange[dep]');
    var userLocale = $('meta[name=trv-localization]');
    userRequest.locale = userLocale.attr('data-locale');

    $.ajax({
        url: 'http://192.168.5.120:3000/api/top5',
        type: 'GET',
        data: JSON.stringify(userRequest),
        async: false,
        success: function(data)
        {
            var response = JSON.parse(data);
            cities = response.result;
        }
    });
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

function addSuggestionsContainer()
{
    var sidebar = $('.sidebar_tabs');

    $('.history').remove('last');

    sidebar.append('<li class="sidebar_element history last" data-state="history"><div>Suggestions</div></li>');
    sidebar.append('<li class="sidebar_display"><div id="js_right_bar_history"><ul class="city_list history suggestions">');

    sidebar.append('</ul></div></li>');

    return $('.suggestions');
}

function addCity(container, city)
{
    var cityBlock = '<li class="path visitable suggestion" title="' + city.city_name + ', Double Room" data-path="' + city.path_id + '" data-roomtype="7">';
    cityBlock += '<div class="info">';
    cityBlock += '<img width="30" height="30" src="' + city.image_url + '" alt="">';
    cityBlock += '<div class="js_sidebaritem_city sidebaritem_city_text_wrap">' + city.city_name + ', <strong>' + city.country_name + '</div>';
    cityBlock += '<strong>Double Room</strong><span class="chronik_item_visited"></span>';
    cityBlock += '</div></li></ul></div></li>';

    container.append(cityBlock);
}