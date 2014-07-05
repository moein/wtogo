module.exports = {
    demo: function(query){
        var checkin = query.checkin;
        var checkout = query.checkout;
        var city = query.city;

        //Do your shit here

        var result = {"result": [
          {
            "id": 35,
            "path_id": 74628,
            "city_name": "Osage",
            "country_name": "Ecuador",
            "image_url": "http://placehold.it/32x32",
            "latitude": -65.674423,
            "longitude": -16.399125
          },
          {
            "id": 40,
            "path_id": 63684,
            "city_name": "Fowlerville",
            "country_name": "Norway",
            "image_url": "http://placehold.it/32x32",
            "latitude": -43.063693,
            "longitude": 69.932693
          },
          {
            "id": 20,
            "path_id": 46217,
            "city_name": "Summerfield",
            "country_name": "French Southern Territories",
            "image_url": "http://placehold.it/32x32",
            "latitude": -86.193023,
            "longitude": 14.847716
          },
          {
            "id": 38,
            "path_id": 57482,
            "city_name": "Nord",
            "country_name": "Malaysia",
            "image_url": "http://placehold.it/32x32",
            "latitude": 6.116029,
            "longitude": -74.68677
          },
          {
            "id": 30,
            "path_id": 68752,
            "city_name": "Dixie",
            "country_name": "Syria",
            "image_url": "http://placehold.it/32x32",
            "latitude": 4.014172,
            "longitude": -168.640075
          }
        ]};


        return result;
    };
}