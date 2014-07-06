var WTOGO = WTOGO || {};

WTOGO.lifecost = {
    getLifecostComparison: function (data)
    {
        console.log('Getting lifecost comparison...');
        var userRequest = {};
        userRequest.source_city = this.cleanString(data.origin.city);
        userRequest.source_country = this.cleanString(data.origin.country);
        userRequest.destination_city = this.cleanString(data.request.destination.city);
        userRequest.destination_country = this.cleanString(data.request.destination.country);

        $.ajax({
            url: 'http://' + config.api.url + config.api.port + '/api/life-comparison',
            type: 'GET',
            data: userRequest,
            success: function(data)
            {
                var response = JSON.parse(data);
                WTOGO.lifecost.addContent(response.differences);
                WTOGO.comparison.hideLoader();
            },
            error: function (data)
            {
                console.log(data.msg);
            }
        });
    },

    addContent: function (differences)
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

        differences.forEach(function(item)
        {
            content += '<tr>';
            content += '<td>' +  item.item + '</td>';
            content += '<td>' +  item.price_destination.text + '</td>';
            content += '<td>' +  item.price_source.text + '</td>';
            content += '<td class="difference">';
            content += item.difference + '</td>';
            content += '</tr>';
        });

        content += '</tbody>';
        content += '</table>';

        $('.wtogo_lifecost').append(content);

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
    },

    cleanString: function(string) {
        string = string.replace(new RegExp(/[àáâãäå]/g),"a");
        string = string.replace(new RegExp(/æ/g),"ae");
        string = string.replace(new RegExp(/ç/g),"c");
        string = string.replace(new RegExp(/[èéêë]/g),"e");
        string = string.replace(new RegExp(/[ìíîï]/g),"i");
        string = string.replace(new RegExp(/ñ/g),"n");
        string = string.replace(new RegExp(/[òóôõö]/g),"o");
        string = string.replace(new RegExp(/œ/g),"oe");
        string = string.replace(new RegExp(/[ùúûü]/g),"u");
        string = string.replace(new RegExp(/[ýÿ]/g),"y");
        string = string.replace(new RegExp(/\s/g),"+");

        return string;
    }
}