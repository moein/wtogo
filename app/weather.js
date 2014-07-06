var _ = require('underscore');
var querystring = require('querystring');
var request = require('request');

var Weather = Class.extend({
    params: {
        url: 'http://api.openweathermap.org/data/2.5',
        appid: '6fd30e2b38e9e1357faa164404cef5b4',
        imgUrl: 'http://openweathermap.org/img/w'
    }

    , goes: 3

    , init: function(response) {
        this.response = response;
    }

    , run: function(query) {
        var dateformat = 'yyyyMMdd';
        var checkin = Date.parseExact(query.checkin, dateformat).addYears(-1);
        var checkout = Date.parseExact(query.checkout, dateformat).addYears(-1);
        var city = query.city;

        //var cityId = weatherApi.apiGetCityId(city);
        this.apiByCityName(city, checkin.getTime()/1000, checkout.getTime()/1000);
    }

    , apiByCityName: function(cityName, startDate, endDate)
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
        var serverResponse = this.response;

        request(callUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var res = JSON.parse(body);
                var data = self.prepareData(res.list);
                serverResponse.send(JSON.stringify(data));
            } else {
                if(self.goes > 0) {
                    self.goes = self.goes - 1;
                    self.apiByCityName(cityName, startDate, endDate);
                }

                if(error) {
                    console.log(error);
                }
            }
        });
    }

    , prepareData: function (data)
    {
        var calculateAvg = function(items) {
            var total = 0;
            _.each(items, function(num){
                total += num;
            });
            return total/items.length;
        };
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

            if(temp_min !== undefined) {
                results['temp_min'].push(temp_min);
            }
            if(temp_max !== undefined) {
                results['temp_max'].push(temp_max);
            }
            if(humidity !== undefined) {
                results['humidity'].push(humidity);
            }
            if(wind !== undefined) {
                results['wind'].push(wind);
            }
        }


        results['temp_avg'] = Math.round((calculateAvg(results['temp_min']) + calculateAvg(results['temp_max'])) / 2);
        results['temp_max'] = Math.round(_.max(results['temp_max']));
        results['temp_min'] = Math.round(_.min(results['temp_min']));
        results['humidity'] = Math.round(calculateAvg(results['humidity']));
        results['wind'] = Math.round((_.max(results['wind'])+_.min(results['wind']))/2);

        var max = _.max(results['icon'], function(icon){ return icon; });
        _.each(results['icon'], function(count, icon){
            if(count == max){
                results['icon'] = self.params.imgUrl+'/'+icon+'.png';
            }
        });

        return results;
    }
});


module.exports = function(response){
    return new Weather(response);
};