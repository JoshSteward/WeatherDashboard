//hold queryURL 
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1f1a631dee508a73d37f378c49cda4b5"


$("#search-button").on("click", function(){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        //get heading 
        var cityName = response.city.name;
        console.log(cityName);
        //get temp 
        var cityTemp = response.list[0].main.temp;
        console.log(cityTemp);
        var cityTemp = JSON.parse(cityTemp);
        //covert temp form Kelvin
        var cityTempCel = cityTemp - 273.15;
        console.log(cityTempCel);
        //get humidity 
        var cityHumidity = response.list[0].main.humidity;
        console.log(cityHumidity);
        //get windspeed
        var cityWindSpeed = response.list[0].wind.speed;
        console.log(cityWindSpeed);
        //get UV index
        var cityUV = repsonse;
        //console.log(cityUV);
    })
})
