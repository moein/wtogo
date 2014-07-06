var express = require('express');
var app = express();
require('./lib/class');

var args = process.argv.slice(2);

function appGet(uri, func) {
    app.get(uri, function(req, res){
        var response = require('./lib/response');
        response.init(res);
        func(req);
    });
}

appGet('/api/top5', function(req){
    require('./app/top5')(req.query);
});

appGet('/api/weather', function(req)
{
    if(req.query.city === undefined) {
        req.query = {
            checkin: '20140502',
            checkout: '20140510',
            city: 'Cordoba, mx'
        };
    }
    require('./app/weather')(req.query);
});

app.get('/api/life-comparison', function(req, res){
    require('./app/life-comparison')(res).run(req.query);
});

app.get('/api/attractions', function(req, res){
    require('./app/attractions')(res).run(req.query);
});

app.get('/api/city-country', function(req, res){
    require('./app/city-country')(res).run(req.query);
});

if(args[0] === undefined)
{
    port = 3000;
}
else
{
    port = args[0];
}

app.listen(port, function() {
    console.log('Hey I am running on http://localhost:' + port);
});
