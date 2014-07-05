function displayComparisonCities(data)
{
    var checkin = data.request.checkin;
    var checkout = data.request.checkout;
    var origin_city = data.origin.city;
    var origin_country = data.origin.country;
    var destination_city = data.request.destination.city;
    var destination_country = data.request.destination.country;

    $('#js_pricesearch_transparency').show();
    $('#js_itemlist').empty();
    $('#js_pagination').empty();

    $('.container_itemlist').append('<div class="comparison-cities" > <div class="life-comparison"></div> <div class="weather-comparison"></div> <div class="attractions"></div>  </div>');

    displayLifeComparisonInfo(origin_city, origin_country, destination_city, destination_country);
    displayWeatherComparison(origin_city, destination_city, checkin, checkout);
    displayAttractions(data);
    $('#js_pricesearch_transparency').hide();
}

function displayLifeComparisonInfo(origin_city, origin_country, destination_city, destination_country)
{
    var userRequest = {};
    userRequest.source_city = origin_city;
    userRequest.source_country = origin_country;
    userRequest.destination_city = destination_city;
    userRequest.destination_country = destination_country;

    $.ajax({
        url: 'http://localhost:3000/api/life-comparison',
        type: 'GET',
        data: userRequest,
        success: function(data)
        {
            var response = JSON.parse(data);
            addLifeComparisonContent(response.differences, destination_city);

        }
    });
}

function addLifeComparisonContent(differences, destination_city)
{
    var lifeComparisonHTML = '<div class ="life-comparison">';
    lifeComparisonHTML += '<h2>Your location vs. ' + destination_city + '</h3>';
    lifeComparisonHTML += '<h3>Life cost</h3>';

    lifeComparisonHTML += '<table>';

    lifeComparisonHTML += '<thead>';
    lifeComparisonHTML += '<tr>';
    lifeComparisonHTML += '<td><b>Criteria</b></td>';
    lifeComparisonHTML += '<td><b>' + destination_city + '</b></td>';
    lifeComparisonHTML += '<td><b>Your location</b></td>';
    lifeComparisonHTML += '<td><b>Difference</b></td>';
    lifeComparisonHTML += '</tr>';
    lifeComparisonHTML += '</thead>';
    lifeComparisonHTML += '<tbody>';

    differences.forEach(function(difference_item)
    {
        lifeComparisonHTML += '<tr>';
        lifeComparisonHTML += '<td>' +  difference_item.item + '</td>';
        lifeComparisonHTML += '<td>' +  difference_item.price_destination.text + '</td>';
        lifeComparisonHTML += '<td>' +  difference_item.price_source.text + '</td>';
        lifeComparisonHTML += '<td';
        if (difference_item.difference.indexOf('-') === 0)
        {
            lifeComparisonHTML += ' class="greenlife">';
        }
        else
        {
            lifeComparisonHTML += ' class="redlife">';
        }
        lifeComparisonHTML += difference_item.difference + '</td>';
        lifeComparisonHTML += '</tr>';
    });

    lifeComparisonHTML += '</tbody>';
    lifeComparisonHTML += '</table>';
    lifeComparisonHTML += '</div>';

    $('.life-comparison').append(lifeComparisonHTML);

}

function displayWeatherComparison(origin_city, destination_city, checkin, checkout)
{
    var userRequest = {};
    userRequest.city = origin_city;
    userRequest.checkin = checkin;
    userRequest.checkout = checkout;

    $.ajax({
        url: 'http://localhost:3000/api/weather',
        type: 'GET',
        data: userRequest,
        success: function(data)
        {
            var response = JSON.parse(data);
            addWeatherComparisonContent(response.weather, origin_city );
        }
    });

    var userRequest = {};
    userRequest.city = destination_city;
    userRequest.checkin = checkin;
    userRequest.checkout = checkout;

    $.ajax({
        url: 'http://localhost:3000/api/weather',
        type: 'GET',
        data: userRequest,
        success: function(data)
        {
            var response = JSON.parse(data);
            addWeatherComparisonContent(response.weather, destination_city );
        }
    });
}

function addWeatherComparisonContent(weather, city)
{
    return true;
}

function displayAttractions(origin_city)
{
    var userRequest = {};
    userRequest.source_city = source_city;

    $.ajax({
        url: 'http://localhost:3000/api/attractions',
        type: 'GET',
        data: userRequest,
        success: function(data)
        {
            var response = JSON.parse(data);
            addAttractionsContent(response, source_city );
        }
    });
}

function addAttractionsContent(destination_city)
{
    return true;
}
