function displayLifeComparisonInfo(source_city, source_country, destination_city, destination_country)
{
    $('#js_pricesearch_transparency').show();

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
            addWeatherComparisonContent(destination_city);
            addAttractionsContent(destination_city);
            $('#js_pricesearch_transparency').hide();
        }
    });
}

function addWeatherComparisonContent(destination_city)
{
    return true;
}

function addAttractionsContent(destination_city)
{
    return true;
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

    $('#js_itemlist').empty();
    $('#js_pagination').empty();
    $('.container_itemlist').append(lifeComparisonHTML);

}

function displayWeather()
{

}

function displayAttractions()
{

}