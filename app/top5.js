module.exports = function(query){
    var checkin = query.checkin;
    var checkout = query.checkout;
    var city = query.city;

    //Do your shit here

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


    return result;
};
