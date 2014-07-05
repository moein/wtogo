module.exports = function(query){
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
};
