var querystring = require("querystring");
var datejs = require('datejs');
var request = require('request');

var weatherApi = {
    params: {
        url: 'http://api.openweathermap.org/data/2.5',
        appid: '6fd30e2b38e9e1357faa164404cef5b4',
        imgUrl: 'http://openweathermap.org/img/w/'
    },

    apiByCityName: function(cityName, startDate, endDate)
    {
        var self = this;
        var reqParams = {
            APPID: this.params.appid
            , q: cityName
            , type: 'day'
            , start: startDate
            , end: endDate
        };
        
        var callUrl = this.params.url + '/history/city?' + querystring.stringify(reqParams);

        request(callUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var res = JSON.parse(body);
                var data = self.prepareData(res.list);
                require('../lib/response').send(JSON.stringify(data));
            }

            else if(error){
                console.log(error);
            }
        });
    },

    prepareData: function (data)
    {
        var results = {
            icon: new Array()
            , 'temp_min': new Array()
            , 'temp_max': new Array()
            , 'humidity': new Array()
        };

        for(i=0 ; i<data.length; i++) {
            results['icon'].push(data[i]['weather'][0]['icon']);
            results['temp_min'].push(data[i]['main']['temp_min']- 273.15);
            results['temp_max'].push(data[i]['main']['temp_max']- 273.15);
            results['humidity'].push(data[i]['main']['humidity']);
        }

        return results;
    }
}



module.exports = 
{
    demo : function(query)
    {
        var checkin = query.checkin;
        var checkout = query.checkout;
        var city = query.city;

        //Do your shit here

        var result = {"weather": {
            "temp": 23.23,
            "cloud": 0.155,
            "humidity": 0.14
        }};

        return result;
    },

    get: function(query)
    {
        var dateformat = 'yyyymmdd';
        var checkin = Date.parseExact(query.checkin, dateformat);
        var checkout = Date.parseExact(query.checkout, dateformat);
        var city = query.city;

        //var cityId = weatherApi.apiGetCityId(city);
        weatherApi.apiByCityName(city, checkin.getTime()/1000, checkout.getTime()/1000);
    }
}