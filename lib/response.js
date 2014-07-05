Response = (function(){
    var responseObject;

    return {
        init: function(response) {
            responseObject = response;
            responseObject.header('Access-Control-Allow-Origin', '*');
            responseObject.header('Access-Control-Allow-Methods', 'GET');
            responseObject.header('Access-Control-Allow-Headers', 'Content-Type');
        },
        send: function(responseText) {
            responseObject.send(responseText);
        }
    };
}());

module.exports = Response;
