var express = require('express');
var app = express();
require('./lib/class');
<<<<<<< HEAD
=======
require('datejs');
>>>>>>> b769d3aa8b28676365e43edc972cd410c66901d5

var args = process.argv.slice(2);

function appGet(uri, func) {
    app.get(uri, function(req, res){
        var response = require('./lib/response');
        response.init(res);
        func(req);
    });
}

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    next();
});

app.get('/api/top5', function(req, res){
    require('./app/top5')(res).run(req.query);
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
