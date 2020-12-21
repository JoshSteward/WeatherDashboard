//hold queryURL 

var city_name = 'London'; 
var queryURL = "http://api.openweathermap.org/data/2.5/weather?id=2172797&appid=1f1a631dee508a73d37f378c49cda4b5"
//var queryURL2 = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=20e76b66c69276d8cd4b395fb8c3775e" + city;
var queryURL3 = "https://api.openweathermap.org/data/2.5/weather?q=" + city_name + "&appid=1f1a631dee508a73d37f378c49cda4b5";
var cities = ["Sydney", "Moscow", "Melbourne"];

//$("#add-city").on("click", function(){
    $.ajax({
        url: queryURL3,
        method: "GET"
    }).then(function(response){
        console.log(response);
        //create div to hold weather info 
        function toDisplay() { 
            var weatherInfo = $("<div class = 'weatherInfo'>")
            //append to html
            $("#weatherView").append(weatherInfo);
            //apend weather information to html 
            //get heading 
            var cityName = response.name;
            console.log(cityName);
            $("#heading").append(cityName);
            //get temp 
            var cityTemp = response.main.temp;
            console.log(cityTemp);
            var cityTemp = JSON.parse(cityTemp);
            //covert temp form Kelvin
            var cityTempCel = cityTemp - 273.15;
            console.log(Math.floor(cityTempCel));
            //$("#weatherView").append("<br>");
            $("#temperature").append(Math.floor(cityTempCel) + " °C");
            //get humidity 
            var cityHumidity = response.main.humidity;
            console.log(cityHumidity);
            //$("#weatherView").append("<br>");
            $("#humidity").append(cityHumidity + "%");
            //get windspeed
            var cityWindSpeed = response.wind.speed;
            console.log(cityWindSpeed);
            //$("#weatherView").append("<br>");
            $("#windSpeed").append(cityWindSpeed + " km/h");
            //get UV index
            //var cityUV = repsonse;
            //console.log(cityUV);
            }
        toDisplay();
    })
//})

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
    var city = $("#city-input").val().trim();

    // The movie from the textbox is then added to our array
    cities.push(city);
    console.log(city);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

//   function setFavicons(favImg){
//     let headTitle = document.querySelector('head');
//     let setFavicon = document.createElement('link');
//     setFavicon.setAttribute('rel', 'shortcut icon');
//     setFavicon.setAttribute('href',FavImg);
//     headTitle.appendChild(setFavicon);
//   }

//   setFavicons('https://spemer.com/image/favicon/favicon.png');
