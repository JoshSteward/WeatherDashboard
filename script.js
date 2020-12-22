$(document).ready(function (){

//hold queryURL 

// when button is click grab city name 
/*
$("#add-city").on("click", function(event) {
    event.preventDefault();
    var city_input = $("#city_input").val().trim();
    console.log("test")
    console.log(city_input);
  //push new city into the array of cities
    cities.push(city_input);
    renderButtons()
 });
 */

var city_input = 'Sydney';
// link this to html button 
//let city_input = 'London'; 
var queryURL = "http://api.openweathermap.org/data/2.5/weather?id=2172797&appid=1f1a631dee508a73d37f378c49cda4b5"
//var queryURL2 = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=20e76b66c69276d8cd4b395fb8c3775e" + city;
//var queryURL3 = "https://api.openweathermap.org/data/2.5/weather?q=" + city_input + "&appid=1f1a631dee508a73d37f378c49cda4b5";
var cities = ["Sydney", "Moscow", "Melbourne"];

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
            //var dateNow = moment().format('dddd, MMMM Do');
            $("#heading").append('City: ' + cityName);
            //$("#heading").text(dateNow);
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
            }
    );
}

function emptyDivs(){
    $("#heading").empty();
    $("#temperature").empty();
    $("#humidity").empty();
    $("#windSpeed").empty();
}

displayWeatherInfo();

function renderButtons(){
    $("#buttons-view2").empty();
    for (var i = 0; i < cities.length; i++) {
        //generate button 
        var a = $("<button>");
        //add class to button
        a.addClass("btn btn-light");
        //add data attribures 
        a.attr("data-name", cities[i]);
        //add text
        a.text(cities[i]);
        //append
        $("#buttons-view2").append(a);
        console.log(cities[i])
    }
}
renderButtons();


// This function handles events where the add city button is clicked
$("#add-city").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    city= $("#city_input").val();
    //var city_new= (city);
    console.log(city);

    // The movie from the textbox is then added to our array
    cities.push(city);
    console.log(cities);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

    //$(document).on("click",".weatherInfo", displayWeatherInfo);
    //renderButtons();

    //displayWeatherInfo();
});
