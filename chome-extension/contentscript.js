

console.log('Getting suggestions...');

cities = [];
getSuggestions();

var container = addSuggestionsContainer();

cities.forEach(function(city)
{
    addCity(container, city);
});
