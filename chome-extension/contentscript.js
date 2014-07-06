var WTOGO = WTOGO || {};
var lastUrl = undefined;
var $content = $('#content .itemlist');

String.prototype.hashCode = function(){
    if (Array.prototype.reduce){
        return this.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    }
    var hash = 0;
    if (this.length === 0) return hash;
    for (var i = 0; i < this.length; i++) {
        var character  = this.charCodeAt(i);
        hash  = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

var isValidUrl = function(url)
{
    return (url.indexOf('aDateRange') != -1 && url.indexOf('iPathId') != -1);
}

$content.bind('content_change', function() {
    WTOGO.comparison.closeComparison();
    WTOGO.user.getUserInfo();
    WTOGO.suggestions.getSuggestions();
});

setInterval(function(){
    currentUrl = window.location.href;
    if(isValidUrl(currentUrl))
    {
        if( (lastUrl !== undefined && currentUrl != lastUrl) ||
            (lastUrl === undefined)
        ) {
            $content.trigger('content_change');
        }
        lastUrl = currentUrl;
    }
}, 500);




