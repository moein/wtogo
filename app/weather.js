var querystring = require("querystring");
var datejs = require('datejs');
var request = require('request');
var _ = require('underscore');

var weatherApi = {
    params: {
        url: 'http://api.openweathermap.org/data/2.5',
        appid: '6fd30e2b38e9e1357faa164404cef5b4',
        imgUrl: 'http://openweathermap.org/img/w'
    },

    goes: 4,

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

            else if(error) {
                console.log(error);
                if(self.goes > 0)
                {
                    self.goes = self.goes - 1;
                    self.apiByCityName(cityName, startDate, endDate);
                }
            }
        });
    },

    prepareData: function (data)
    {
        var self = this;
        var results = {
            icon: {}
            , 'temp_min': new Array()
            , 'temp_max': new Array()
            , 'humidity': new Array()
            , 'wind': new Array()
        };

        for(var i=0 ; i<data.length; i++)
        {
            var icon = data[i]['weather'][0]['icon'];
            var temp_min = data[i]['main']['temp_min']- 273.15;
            var temp_max = data[i]['main']['temp_max']- 273.15;
            var humidity = data[i]['main']['humidity'];
            var wind = data[i]['wind']['speed'];
            var isMorning = true;

            if(icon.indexOf('n') == -1 && isMorning === true) { // Exclude night icons
                if(results['icon'][icon] === undefined) {
                    results['icon'][icon] = 0;
                } else {
                    results['icon'][icon] += 1;
                }
                isMorning = false;
            } else {
                isMorning = true;
            }

            results['temp_min'].push(temp_min);
            results['temp_max'].push(temp_max);
            results['humidity'].push(humidity);
            results['wind'].push(wind);
        }


        results['temp_max'] = Math.round(_.max(results['temp_max']));
        results['temp_min'] = Math.round(_.min(results['temp_min']));
        results['humidity'] = Math.round((_.max(results['humidity'])+_.min(results['humidity']))/2);
        results['wind'] = Math.round((_.max(results['wind'])+_.min(results['wind']))/2);

        var max = _.max(results['icon'], function(icon){ return icon; });
        _.each(results['icon'], function(count, icon){
            if(count == max){
                results['icon'] = self.params.imgUrl+'/'+icon+'.png';
            }
        });

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
        var checkin = Date.parseExact(query.checkin, dateformat).add(-1).years();
        var checkout = Date.parseExact(query.checkout, dateformat).add(-1).years();
        console.log(checkin, checkout);
        var city = query.city;

        //var cityId = weatherApi.apiGetCityId(city);
        weatherApi.apiByCityName(city, checkin.getTime()/1000, checkout.getTime()/1000);
    }
}