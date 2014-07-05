var weatherApi = {
    params: {
        url: 'api.openweathermap.org/data/2.5/',
        appid: 'APPID=6fd30e2b38e9e1357faa164404cef5b4'
    },

    apiByCityName: function(cityName, st)
    {
        var cityParams = 'q='+cityName;
        var options = {
            host: this.params.url,
            port: 80,
            path: '/history/city?'+this.params.url+'&'+cityParams,
            method: 'POST'
        };

        var req = http.request(options, function(res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
          });
        });

        req.on('error', function(e) {
          console.log('problem with request: ' + e.message);
        });

        // write data to request body
        req.write('data\n');
        req.write('data\n');
        req.end();
    }
}



module.exports = {
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

    call: function(query)
    {
        var dateformat = 'YYYYMMDD';
        var checkin = Date.parseExact(query.checkin, dateformat);
        var checkout = Date.parseExact(query.checkout, dateformat);
        var city = query.city;

        var querystring = require("querystring");
        var datejs = require('datejs');

        weatherApi.apiByCityName(querystring.stringify(city), checkin.getTime(), checkout.getTime());
    }
}