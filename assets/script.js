var currentWeather = document.createElement("ul");
var cityMain = document.createElement("h2");
var city;

$("button").click(function () {
    city = $("input").val();

    if (city === "") {
        alert("Please enter a city");
    } else {
        console.log(city);
        getWeather(city);
    }

})

var latitude;
var longitude;

function getWeather() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=2e3156227de377f7890d638acf2e705c";

    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // showWeather();
                console.log(data);

                latitude = data.coord.lat;
                longitude = data.coord.lon;

                console.log(latitude);
                console.log(longitude);
            })
        } else {
            alert("Error: " + response.statusText);
        }

        
    })

    var apiUrl2 ="https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&exclude=hourly,minutely&appid=2e3156227de377f7890d638acf2e705c";

    fetch(apiUrl2)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // showWeather();
                    console.log(data);
                })
            } else {
                alert("Error: " + response.statusText);
            }
        })

}


// function showWeather() {
//     cityMain.textContent = city;
//     $("#mainforecast").append(cityMain);
//     $("#mainforecast").append(currentWeather);

//     $(currentWeather).add("<li id='temp'></li>");
//     $(currentWeather).add("<li id='humid'></li>");
//     $(currentWeather).add("<li id='wind'></li>");
//     $(currentWeather).add("<li id='uv'></li>")


// }
