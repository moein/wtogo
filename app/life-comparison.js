module.exports = function(query){
    var sourceCity = query.source_city;
    var destinationCity = query.destination_city;

    //Do your shit here

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

    return result;
};
