$(document).ready(function (){



var dateNow = moment().format('dddd, MMMM Do');
console.log(dateNow);

var city_input = 'Sydney';
var cities = [];

var citiesHistory = [];
// Function to set cities from citiesHistory array into local storage
function saveCities() {
    localStorage.setItem("cities2", JSON.stringify(cities));
    console.log(cities)
}

function my_button_handler(){
    console.log("is this button clicked")
    //city_input = $("#city_input").val().trim();
    city_input = $("#city_input").val();
    //var city_input = JSON.stringify(city_input);
    console.log("test")
    console.log(city_input);
  //push new city into the array of cities
    cities.push(city_input);
    renderButtons()

    $("#add-city").on("click", function(event) {
        //event.preventDefault();
        city_input = $("#city_input").val().trim();
        console.log("test")
        console.log(city_input);
      //push new city into the array of cities
        cities.push(city_input);
        //renderButtons()
     });
}


$("#add-city").click(displayWeatherInfo)

function displayWeatherInfo() {
    city_input = $("#city_input").val().trim();
    var queryURL3 = "https://api.openweathermap.org/data/2.5/weather?q=" + city_input + "&appid=1f1a631dee508a73d37f378c49cda4b5";
    console.log(queryURL3);
    emptyDivs();
    $.ajax({
        url: queryURL3,
        method: "GET"
    }).then(function(response){
        console.log(response);
        //create div to hold weather info
            var weatherInfo = $("<div class = 'weatherInfo'>")
            console.log(weatherInfo);
            //append to html
            $("#weatherView").append(weatherInfo);
            //apend weather information to html 
            //get heading 
            cityName = response.name;
            console.log(cityName);
            var dateNow = moment().format('dddd, MMMM Do');
            $("#heading").append(cityName);
            $("#dateNow").text(dateNow);
            //console.log(dateNow);             
            //get temp 
            var cityTemp = response.main.temp;
            console.log(cityTemp);
            var cityTemp = JSON.parse(cityTemp);
            //covert temp form Kelvin
            var cityTempCel = cityTemp - 273.15;
            console.log(Math.floor(cityTempCel));
            //$("#weatherView").append("<br>");
            $("#temperature").append('Temperature: ' + Math.floor(cityTempCel) + " °C");
            //get humidity 
            var cityHumidity = response.main.humidity;
            console.log(cityHumidity);
            //$("#weatherView").append("<br>");
            $("#humidity").append('Humidity: '+ cityHumidity + "%");
            //get windspeed
            var cityWindSpeed = response.wind.speed;
            console.log(cityWindSpeed);
            //$("#weatherView").append("<br>");
            $("#windSpeed").append('Wind Speed: '+ cityWindSpeed + " km/h");
            //get UV index
            //var cityUV = repsonse;
            //console.log(cityUV);
            //console.log("test")
            var lon = response.coord.lon;
            var lat = response.coord.lat;
            console.log(lon);
            var uvIndexUrl = "https://api.openweathermap.org/data/2.5/uvi?" + "&lat=" + lat + "&lon=" + lon + "&appid=1f1a631dee508a73d37f378c49cda4b5" 
            
            $.ajax({
                url: uvIndexUrl,
                method: "GET"
            }).then(function (response) {
                var uvIndex = response.value
                console.log(uvIndex);
                $("#uvIndex").append('UV Index: ' + uvIndex);

            });
            }
    );
          
}


function emptyDivs(){
    $("#heading").empty();
    $("#temperature").empty();
    $("#humidity").empty();
    $("#windSpeed").empty();
    $(".forecastCards").empty();
    $("#uvIndex").empty();
}

$("#add-city").click(fiveDayForecast)
function fiveDayForecast(){
    city_input = $("#city_input").val().trim();
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city_input + "&appid=1f1a631dee508a73d37f378c49cda4b5";
    console.log(queryURL2);
    saveCities();


    $.ajax({
        url:queryURL2,
        method:"GET"
    }).then(function(response){
        console.log(response);

       for (i=4; i < response.list.length; i+=8) {
            var icon = "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";
            console.log(icon);
            var card = ` 
          <div class="card col-2">
            <div class="card-body">
                <h6 class="card-title"> ${response.list[i].dt_txt}</h6>
                <h6 class="card-subtitle mb-2 text-muted"></h6>
                <img class="icon" src="http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png"></img>
                <p class="card-temp">Temperature: ${(Math.floor((response.list[i].main.temp)-273.15))}°C</p>
                <p class="card-humidity">Humidity: ${response.list[i].main.humidity}%</p>
            </div>
        </div>
          `
         $(".forecastCards").append(card);

        }
    });

}

//displayWeatherInfo();

function renderButtons(){
    $("#buttons-view2").empty();
    for (var i = 0; i < cities.length; i++) {
        //generate button 
        var a = $("<button>");
        //add class to button
        a.addClass("btn btn-outline-secondary");
        //add data attribures 
        a.attr("data-name", cities[i]);
        //add text
        a.text(cities[i]);
        //append
        $("#buttons-view2").append(a);
        console.log(cities[i])
    }
}


// This function handles events where the add city button is clicked
$("#add-city").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    city= $("#city_input").val();
    //var city_new= (city);
    console.log(city);

    // The city from the textbox is then added to our array
    cities.push(city);
    console.log(cities);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

$(document).ready(function() {
    if(localStorage.getItem("cities2") !== null) {
        console.log("DOIT")
        var savedCity = localStorage.getItem("cities2");
        cities = JSON.parse(savedCity)
        renderButtons();
        }
});


});
