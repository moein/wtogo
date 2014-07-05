function displayLifeComparisonInfo(source_city, source_country, destination_city, destination_country)
{
    var userRequest = {};
    userRequest.source_city = source_city;
    userRequest.source_country = source_country;

    userRequest.destination_city = destination_city;
    userRequest.destination_country = destination_country;


    $.ajax({
        url: 'http://192.168.2.2:3000/api/life-comparison',
        type: 'GET',
        data: userRequest,
        success: function(data)
        {
            var response = JSON.parse(data);
            addLifeComparisonContent(response.differences);
        }
    });
}

function addLifeComparisonContent(differences)
{
    var lifeComparisonHTML = '<div class ="life-comparison"><br/><br/><br/>';

    lifeComparisonHTML += '<table style="width: 650px;">';

    lifeComparisonHTML += '<tr><td colspan="4" style="text-align: center; font-size: 20px;">Life comparison</td></tr>';
    lifeComparisonHTML += '<tr><td colspan="4"></td></tr>';

    lifeComparisonHTML += '<tr>';
    lifeComparisonHTML += '<td><b>Criteria</b></td>';
    lifeComparisonHTML += '<td><b>Destination City</b></td>';
    lifeComparisonHTML += '<td><b>Current City</b></td>';
    lifeComparisonHTML += '<td><b>Difference</b></td>';
    lifeComparisonHTML += '</tr>';

    differences.forEach(function(difference_item)
    {
        lifeComparisonHTML += '<tr>';
        lifeComparisonHTML += '<td>' +  difference_item.item + '</td>';
        lifeComparisonHTML += '<td>' +  difference_item.price_destiny.text + '</td>';
        lifeComparisonHTML += '<td>' +  difference_item.price_source.text + '</td>';
        lifeComparisonHTML += '<td>' +  difference_item.difference + '</td>';
        lifeComparisonHTML += '</tr>';


    });

    lifeComparisonHTML += '</table>';
    lifeComparisonHTML += '</div>';

    $('.container_itemlist').empty();
    $('.container_itemlist').append(lifeComparisonHTML);

}

function displayWeather()
{

}

function displayAttractions()
{

}


displayLifeComparisonInfo('Dusseldorf', 'Germany', 'Palma de Mallorca', 'Spain');