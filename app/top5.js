var _ = require('underscore');

var TRV_SUGGEST_URL = 'http://www.trivago.com/search/com-US-US/v8_06_04_ac_8318_cache/suggest?q=';
var FLICKR_API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bfbcad4b4e0653a46fe2f0314a527691&format=json&sort=interestingness-desc&tag_mode=all&tags=cityview,';
var FLICKR_IMAGE_URL = 'https://farm{farm}.staticflickr.com/{server}/{id}_{secret}.jpg';
var MAX_RESULT_COUNT = 5;

var Top5 = Class.extend({
    init: function(response) {
        this.response = response;
        this.finishedImages = 0;
    },
    run: function(query) {
        this.prepareData(query, _.bind(this.getData, this));
    },
    getPathId: function(cityName, callback) {
        request = require('request');
        request(TRV_SUGGEST_URL + cityName, function(err, response, body){
            if (200 === response.statusCode && null === err) {
                response = JSON.parse(body);
                callback(response.result[0].p);
            } else {
                console.log(err);
            }
        });
    },

    parseJsonp: function(jsonpData) {
        var startPos = jsonpData.indexOf('({');
        var endPos = jsonpData.indexOf('})');
        var jsonString = jsonpData.substring(startPos+1, endPos+1);
        json = JSON.parse(jsonString);

        return json;
    },

    getTrvDate: function(dateObject) {
        var month = (dateObject.getMonth() + 1).toString();
        var day = dateObject.getDate().toString();

        if (month.length === 1) {
            month = '0' + month;
        }
        if (day.length === 1) {
            day = '0' + day;
        }
        return dateObject.getFullYear().toString() + month + day;
    },

    getImageUrl: function(cityName, callback) {
        var url = FLICKR_API_URL + cityName;
        var request = require('request');
        request(url, _.bind(function(err, response, body){
            if (200 === response.statusCode && null === err) {
                var photo = this.parseJsonp(body).photos.photo[0];
                var imageUrl = FLICKR_IMAGE_URL
                                .replace('{server}', photo.server)
                                .replace('{id}', photo.id)
                                .replace('{farm}', photo.farm)
                                .replace('{secret}', photo.secret);

                callback(imageUrl);
            } else {
                console.log(err);
            }
        }, this));
    },
    pushResult: function(index, row) {
        this.getPathId(row.city_search, _.bind(function(pathId){
            this.results[index] = {
                'path_id': pathId,
                'city_name': row.city_search,
                'country_name': row.country_search,
                'image_url': '',
                'longitude': row.longitude_search,
                'latitude': row.latitude_search
            };
            this.getImageUrl(row.city_search, _.bind(function(imageUrl){
                this.results[index].image_url = imageUrl;

                if (++this.finishedImages === MAX_RESULT_COUNT) {
                    this.response.send(JSON.stringify(this.results));
                }
            }, this));
        }, this));
    },

    prepareData: function (query, callback) {
        if (query.longitude === undefined || query.latitude === undefined) {
            request = require('request');
            request('http://ipinfo.io', function(err, response, body) {
                if (200 === response.statusCode && null === err) {
                    var location = JSON.parse(body).loc.split(',');
                    query.longitude = location[0];
                    query.latitude = location[1];

                    callback(query);
                } else {
                    console.log(err);
                }
            });
        } else {
            callback(query);
        }
    },

    getData: function(query) {
        var dateformat = 'yyyyMMdd';

        var checkin = Date.parseExact(query.checkin, dateformat);
        var checkout = Date.parseExact(query.checkout, dateformat);
        var platform = query.platform;
        var longitude = query.longitude;
        var latitude = query.latitude;

        var historyLimit = 3;
        var conditions = [];
        var caseConditions = [];

        for (var i = 0; i <= historyLimit; i++) {
            var weight = historyLimit - i + 1;
            var dateCondition = 'date_search BETWEEN ' + this.getTrvDate(checkin) + ' AND ' + this.getTrvDate(checkout);
            conditions.push(dateCondition);
            caseConditions.push('WHEN ' + dateCondition + ' THEN count_search*'+weight);

            checkin = checkin.addYears(-1);
            checkout = checkout.addYears(-1);
        }

        var sumSelect = 'SUM(CASE ' + caseConditions.join(' ') + ' ELSE 0 END) AS count';

        var query = 'SELECT longitude_search, latitude_search, city_search, country_search, ' + sumSelect + ' FROM hackathon.trv_data WHERE platform_search = "' +  platform + '" AND (' + conditions.join(' OR ') + ') GROUP BY CONCAT(longitude_search, latitude_search) ORDER BY count DESC LIMIT ' + MAX_RESULT_COUNT;

        var mysql      = require('mysql');
        var connection = mysql.createConnection({
            host     : '192.168.5.167',
            user     : 'tsp',
            password : 'tsp'
        });

        this.results = [];

        connection.query(query, _.bind(function(err, rows) {
            for(var i=0; i<rows.length; i++) {
                this.pushResult(i, rows[i]);
            }
        }, this));
    }
});

module.exports =  function(response){
    return new Top5(response);
};
