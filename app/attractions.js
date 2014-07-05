module.exports = function(query){
    var city = query.city;

    //Do your shit here

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

    return result;
};
