function displayComparisonCities(source_city, source_country, destination_city, destination_country, start_date, end_date )
{
    $('#js_pricesearch_transparency').show();
    $('#js_itemlist').empty();
    $('#js_pagination').empty();

    $('.container_itemlist').append('<div class="comparison-cities" > <div class="life-comparison"></div> <div class="weather-comparison"></div> <div class="attractions"></div>  </div>');

    displayLifeComparisonInfo(source_city, source_country, destination_city, destination_country);
    displayWeatherComparison(source_city, destination_city, start_date, end_date);
    displayAttractions(source_city);
    $('#js_pricesearch_transparency').hide();
}

function displayLifeComparisonInfo(source_city, source_country, destination_city, destination_country)
{
    var userRequest = {};
    userRequest.source_city = source_city;
    userRequest.source_country = source_country;
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

function displayWeatherComparison(source_city, destination_city, start_date, end_date)
{
    var userRequest = {};
    userRequest.source_city = source_city;
    userRequest.start_date = start_date;
    userRequest.end_date = end_date;

    $.ajax({
        url: 'http://localhost:3000/api/weather',
        type: 'GET',
        data: userRequest,
        success: function(data)
        {
            var response = JSON.parse(data);
            addWeatherComparisonContent(response.weather, source_city );
        }
    });

    var userRequest = {};
    userRequest.source_city = destination_city;
    userRequest.start_date = start_date;
    userRequest.end_date = end_date;

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

function addWeatherComparisonContent(destination_city)
{
    return true;
}

function displayAttractions(source_city)
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
