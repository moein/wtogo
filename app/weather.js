var querystring = require("querystring");
var datejs = require('datejs');
var request = require('request');

var weatherApi = {
    params: {
        url: 'http://api.openweathermap.org/data/2.5',
        appid: '6fd30e2b38e9e1357faa164404cef5b4'
    },

    apiGetCityId: function(cityName)
    {
        var reqParams = {
            APPID: this.params.appid,
            q: cityName
        };

        var options = {
            host: this.params.url,
            path: '/history/city?'+querystring.stringify(reqParams)
        };

        console.log(options);

        var req = http.get(options, function(res) {
            //another chunk of data has been recieved, so append it to `str`
              response.on('data', function (chunk) {
                str += chunk;
              });

              //the whole response has been recieved, so we just print it out here
              response.on('end', function () {
                console.log(str);
              });

        }).on('error', function(e) {
          console.log('Problem with request: ' + e.message);
        });


        req.write('data\n');
        req.write('data\n');
        req.end();
    },

    apiByCityName: function(cityName, startDate, endDate)
    {
        var reqParams = {
            APPID: this.params.appid,
            q: cityName,
            type: 'tick',
            start: startDate,
            //end: endDate
        };
        
        var callUrl = this.params.url + '/history/city?' + querystring.stringify(reqParams);
        console.log(callUrl);
        request(callUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body) // Print the google web page.
            }
            else if(error){
                console.log(error);
            }
        });
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