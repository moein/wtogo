var express = require('express');
var app = express();

app.get('/api/top5', function(req, res){

    var checkin = req.query.checkin;
    var checkout = req.query.checkout;
    var city = req.query.city;

    //Do your stuff here
    
    var result = {"result": [
        {
            "name": "Berlin"
        },
        {
            "name": "Berlin"
        },
        {
            "name": "Berlin"
        },
        {
            "name": "Berlin"
        },
        {
            "name": "Berlin"
        },
    ]};
    res.send(JSON.stringify(result));
});

app.get('/api/weather', function(req, res){

    var checkin = req.query.checkin;
    var checkout = req.query.checkout;
    var city = req.query.city;

    //Do your stuff here
    
    var result = {"weather": {
        "temp": 23.23,
        "cloud": 0.155,
        "humidity": 0.14
    }};
    res.send(JSON.stringify(result));
});

app.get('/api/life-comparison', function(req, res){
    
    var sourceCity = req.query.source_city;
    var destinationCity = req.query.destination_city;
    
    //Do your stuff here
    
    var result = {"differences": [
        {
            "item": "Beer",
            "source": "5.4 €",
            "destination": "6.3 €"
        },
        {
            "item": "Meal, Inexpensive Restaurant",
            "source": "10.5 €",
            "destination": "11 €"
        }
    ]};
    res.send(JSON.stringify(result));
});

app.get('/api/attractions', function(req, res){
    //https://console.developers.google.com/project?authuser=0
    
    var city = req.query.city;
    
    //Do your stuff here
    
    var result = {
        "attractions": [
            {
                "id": 1,
                "name": "Parque del retiro",
                "image": "retiro.jpg"
            },
            {
                "id": 2,
                "name": "Parque del retiro jesus",
                "image": "retiro.jpg"
            },
            {
                "id": 3,
                "name": "Parque del retiro antonio",
                "image": "retiro.jpg"
            },
        ]
    };
    res.send(JSON.stringify(result));
});

app.listen(3000);