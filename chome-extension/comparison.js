function displayLifeComparisonInfo(source_city, source_country, destination_city, destination_country)
{
    var userRequest = {};
    userRequest.source_city = source_city;
    userRequest.source_country = source_country;

    userRequest.destination_city = destination_city;
    userRequest.destination_country = destination_country;


    $.ajax({
        url: 'http://192.168.5.120:3000/api/life-comparison',
        type: 'GET',
        data: userRequest,
        success: function(data)
        {
            var response = JSON.parse(data);
            addLifeComparisonContent(response.result)
        }
    });
}

function addLifeComparisonContent(differences)
{
    var lifeComparisonHTML = '<div class ="life-comparison">';
    lifeComparisonHTML += 'Life comparison: ';
    lifeComparisonHTML += '<span>Source city </span>';
    lifeComparisonHTML += '<span>Destination City </span>';
    differences.forEach(function(difference)
    {
        lifeComparisonHTML += '<span>difference.item </span>';
        lifeComparisonHTML += '<span>difference.source </span>';
        lifeComparisonHTML += '<span>difference.destination </span>';

    });

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