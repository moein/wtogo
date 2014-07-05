module.exports =  function(query){
    var checkin = query.checkin;
    var checkout = query.checkout;
    var platform = query.platform;
    var longitude = query.longitude;
    var latitude = query.latitude;

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : '192.168.5.167',
        user     : 'tsp',
        password : 'tsp'
    });
    
    

    var result = {"result": [
        {
          "path_id": 32027,
          "name": "Madrid",
          "country_name": "Spain",
          "image_url": "https://c2.staticflickr.com/4/3191/2949202383_e3f50f7ebc_z.jpg",
          "longitude": -3.70379,
          "latitude": 40.41678
        },
        {
          "path_id": 36103,
          "name": "Paris",
          "country_name": "France",
          "image_url": "https://c2.staticflickr.com/4/3896/14353551974_b290bfb543_z.jpg",
          "longitude": 2.35222,
          "latitude": 48.85661
        },
        {
          "path_id": 38715,
          "name": "London",
          "country_name": "England",
          "image_url": "https://c2.staticflickr.com/8/7221/7395258214_5af05c7c4f.jpg",
          "longitude": -0.12776,
          "latitude": 51.50735
        },
        {
          "path_id": 44337,
          "name": "Rome",
          "country_name": "Italy",
          "image_url": "https://c2.staticflickr.com/8/7051/8688913741_38a6e92321_z.jpg",
          "longitude": 12.48018,
          "latitude": 41.87239
        },
        {
          "path_id": 84853,
          "name": "Tehran",
          "country_name": "Iran",
          "image_url": "https://c1.staticflickr.com/7/6058/6257722846_077ae5edbc_z.jpg",
          "longitude": 51.42306,
          "latitude": 35.69611
        },
    ]};


    require('../lib/response').send(JSON.stringify(result));
};
