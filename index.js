var express = require('express');
var app = express();

app.get('/api/top5', function(req, res){
    var result = require('./app/top5').demo(req.query);
    res.send(JSON.stringify(result));
});

app.get('/api/weather', function(req, res){
    var result = require('./app/weather').demo(req.query);
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

app.listen(3000);