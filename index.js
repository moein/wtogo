var express = require('express');
var app = express();
var setHeaders = function(res)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
};

var args = process.argv.slice(2);

app.get('/api/top5', function(req, res){
    var result = require('./app/top5')(req.query);
    setHeaders(res);
    res.send(JSON.stringify(result));
});

app.get('/api/weather', function(req, res){
    var app = require('./app/weather');
    setHeaders(res);
    var result = app.demo(req.query);
    res.send(JSON.stringify(result));
});

app.get('/api/life-comparison', function(req, res){
    var result = require('./app/life-comparison')(req.query);
    res.send(JSON.stringify(result));
});

app.get('/api/attractions', function(req, res){
    var result = require('./app/attractions')(req.query);
    res.send(JSON.stringify(result));
});

if(args[0] === undefined)
{
    port = 8080;
}
else
{
    port = args[0];
}

console.log('Running server on -> localhost:'+port);
app.listen(port);