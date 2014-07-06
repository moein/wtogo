var express = require('express');
var app = express();
require('./lib/class');
require('datejs');

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

app.get('/api/weather', function(req, res)
{
    require('./app/weather')(res).run(req.query);
});

appGet('/api/life-comparison', function(req){
    require('./app/life-comparison')(req.query);
});

app.get('/api/attractions', function(req, res){
    require('./app/attractions')(res).run(req.query);
});

appGet('/api/city-country', function(req){
    require('./app/city-country')(req.query);
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
