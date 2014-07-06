var WTOGO = WTOGO || {};

WTOGO.lifecost = {
    displayLifeComparisonInfo: function (data)
    {
        var userRequest = {};
        userRequest.source_city = data.origin.city;
        userRequest.source_country = data.origin.country;
        userRequest.destination_city = data.request.destination.city;
        userRequest.destination_country = data.request.destination.country;

        $.ajax({
            url: 'http://' + config.api.url + config.api.port + '/api/life-comparison',
            type: 'GET',
            data: userRequest,
            success: function(data)
            {
                var response = JSON.parse(data);
                WTOGO.comparison.addLifeComparisonContent(response.differences);
            }
        });
    },

    addLifeComparisonContent: function (differences)
    {
        var content = '<h3>Life cost</h3>';

        content += '<table>';

        content += '<thead>';
        content += '<tr>';
        content += '<td><b>Criteria</b></td>';
        content += '<td><b>' + WTOGO.user.request.destination.city + '</b></td>';
        content += '<td><b>' + WTOGO.user.origin.city + '</b></td>';
        content += '<td><b>Difference</b></td>';
        content += '</tr>';
        content += '</thead>';

        content += '<tbody>';

        differences.forEach(function(difference_item)
        {
            content += '<tr>';
            content += '<td>' +  difference_item.item + '</td>';
            content += '<td>' +  difference_item.price_destination.text + '</td>';
            content += '<td>' +  difference_item.price_source.text + '</td>';
            content += '<td class="difference">';
            content += difference_item.difference + '</td>';
            content += '</tr>';
        });

        content += '</tbody>';
        content += '</table>';

        $('.life-comparison').append(content);
        $('.difference').each(function () {
            if ($(this).text().indexOf('-') === 0)
            {
                $(this).addClass('redlife');
            }
            else
            {
                $(this).addClass('greenlife');
            }
        });
    }
}