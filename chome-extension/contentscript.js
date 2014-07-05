// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==


function getSuggestions()
{
    $.ajax({
        url: 'http://192.168.5.120:3000/api/top5',
        type: 'GET',
        async: false,
        success: function(data)
        {
            var response = JSON.parse(data);
            cities = response.result;
        }
    });
}

function addCityDetails(city)
{
    citiesInfo.push(city);
}

function getCitiesInfo(cities)
{
    cities.forEach(function(city)
    {
        console.log("Getting info for " + city);

        $.ajax({
            url: 'http://www.trivago.com/search/com-US-US/v8_06_4_ac_8318_cache/suggest?q=' + city,
            type: 'GET',
            async: false,
            success: function(data)
            {
                var city = data.result.pop();
                addCityDetails(city);
            }
        });
    });
}

function addSuggestionsContainer()
{
    var sidebar = $('.sidebar_tabs');

    $('.history').remove('last');
$('.suggestions').remove();

    sidebar.append('<li class="sidebar_element history last suggestions" data-state="history"><div>Suggestions</div></li>');
    sidebar.append('<li class="sidebar_display"><div id="js_right_bar_history"><ul class="city_list history suggestions">');

    sidebar.append('</ul></div></li>');

    return $('.suggestions');
}

function getCityName(cityName)
{
    return cityName.replace('{', '').replace('}', '');
}

function addCity(container, city)
{
    var cityBlock = '<li class="path visitable" title="' + city.city_name + ', Double Room" data-path="' + city.path_id + '" data-roomtype="7">';
    cityBlock += '<div class="info">';
    cityBlock += '<img width="30" height="30" src="' + city.image_url + '" alt="">';
    cityBlock += '<div class="js_sidebaritem_city sidebaritem_city_text_wrap">' + city.city_name + ', <strong>' + city.country_name + '</div>';
    cityBlock += '<strong>Double Room</strong><span class="chronik_item_visited"></span>';
    cityBlock += '</div></li></ul></div></li>';

    container.append(cityBlock);
}

console.log('Getting suggestions...');

cities = [];
getSuggestions();
//citiesInfo = [];
//getCitiesInfo(cities);
//console.log(citiesInfo);

var container = addSuggestionsContainer();

cities.forEach(function(city)
{
    addCity(container, city);
});



