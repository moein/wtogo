var WTOGO = WTOGO || {};

WTOGO.user = {
    request: {},

    getUserInfo: function ()
    {
        this.request.checkin = getURLParameter(encodeURIComponent('aDateRange[arr]')).replace(/-/g, '');
        this.request.checkout = getURLParameter(encodeURIComponent('aDateRange[dep]')).replace(/-/g, '');
        var userLocale = $('meta[name=trv-localization]');
        this.locale = userLocale.attr('data-locale');

        this.getLocation();
    },

    getLocation: function () {
        if (navigator.geolocation)
        {
            return navigator.geolocation.getCurrentPosition(this.setLocation);
        }
        else
        {
            return false;
        }
    },

    setLocation: function (location)
    {
        WTOGO.user.origin = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        };
        console.log("User location:" + location.coords.latitude + ',' + location.coords.longitude);
        getCity(location.coords.latitude, location.coords.longitude);
    },

    setOriginCity: function (city, country) {
        WTOGO.user.origin = {
            city: city,
            country: country
        };
    },

    getCurrentCity: function(latitud, longitude)
    {
        var self = this;
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitud + ',' + longitude + '&key=AIzaSyBa0a0aPIoqUAulfB-4mLsz91E_m535bxQ',
            type: 'GET',
            async: false,
            success: function(data)
            {
                var response = JSON.parse(data);
                self.setOriginCity(response.result.city, response.result.country)
            }
        });
    }
}


function getURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function getCity(latitud, longitude) {
    var latlng = new google.maps.LatLng(latitud,longitude);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            debugger;
            if (results[1]) {
                debugger;
            } else {
                alert('No results found');
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });
}