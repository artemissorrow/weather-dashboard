var currentWeather = document.createElement("div");
var cityMain = document.createElement("h2");
var city;

$(currentWeather).addClass("list-group");

$("button").click(function () {
    city = $("input").val();

    if (city === "") {
        alert("Please enter a city");
    } else {
        getWeather(city);
        saveCity(city);

        function makeList(city) {
            $("#citylist").append("<li class='list-group-item city-list'>" + city + "</li>")
        }

        function saveCity(city) {
            var cityArray;
            if (localStorage.getItem("cities")) {
                cityArray = JSON.parse(localStorage.getItem("cities"));
            } else {
                cityArray = [];
            }

            if (city !== null || city !== "null") {
                cityArray.push(city);
                localStorage.setItem("cities", JSON.stringify(cityArray));
                var cityData = JSON.parse(localStorage.getItem("cities"))
            }

            cityData.forEach((city) => {
                makeList(city)
            })
        }
    }

})

var latitude;
var longitude;

function getWeather(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=2e3156227de377f7890d638acf2e705c";

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);

                    latitude = data.coord.lat;
                    longitude = data.coord.lon;

                    getWeather2();
                })
            }
            else {
                alert("Error: " + response.statusText);
            }
        })


    function getWeather2() {
        var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&exclude=hourly,minutely&appid=2e3156227de377f7890d638acf2e705c";

        fetch(apiUrl2)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        showWeather(data);
                        console.log(data);
                    })
                } else {
                    alert("Error: " + response.statusText);
                }
            })

    }

    function showWeather(data) {
        var date = moment().format("M/D/YYYY");
        cityMain.textContent = city + " - " + date;

        $("#mainforecast").append(cityMain);
        $("#mainforecast").append(currentWeather);
        $(cityMain).addClass("p-4")

        $(currentWeather).append("<p id='temp'></p>");
        $(currentWeather).append("<p id='humid'></p>");
        $(currentWeather).append("<p id='wind'></p>");
        $(currentWeather).append("<p class='uv' id='uv'></p>");

        document.getElementById("temp").textContent = "Temperature: " + data.current.temp + "° Fahrenheit";
        document.getElementById("humid").textContent = "Humidity: " + data.current.humidity + "%";
        document.getElementById("wind").textContent = "Wind Speed: " + data.current.wind_speed + " mph";
        document.getElementById("uv").textContent = "UV Index: " + data.current.uvi;

        if (data.current.uvi < 3) {
            $("#uv").addClass("uv-low");
        } else if (data.current.uvi < 6) {
            $("#uv").addClass("uv-med");
        } else {
            $("#uv").addClass("uv-high");
        }

        $("#mainforecast").append("<h2 class='pt-5'>5-Day Forecast:</h2>");

        $("#forecastBox").append("<div class='card custom-card' id='tomorrow'></div>");
        $("#forecastBox").append("<div class='card custom-card' id='plus2'></div>");
        $("#forecastBox").append("<div class='card custom-card' id='plus3'></div>");
        $("#forecastBox").append("<div class='card custom-card' id='plus4'></div>");
        $("#forecastBox").append("<div class='card custom-card' id='plus5'></div>");

        var cards = document.getElementsByClassName("card");

        for (var i = 0; i < cards.length; i++) {
            $(cards[i]).append("<h3></h3>");
            $(cards[i]).append("<p class='temp'></p>");
            $(cards[i]).append("<p class='hum'></p>");
        }

        for (var j = 0; j < cards.length && data.length; j++) {
            $(cards[j]).find("h3").text(moment().add(1, "day").format("M/D/YYYY"))
            $(cards[j]).find(".temp").text("Temperature: " + data.daily[j].temp.day + "° F")
            $(cards[j]).find(".hum").text("Humidity: " + data.daily[0].humidity + "%")
        }
    }
}

function getCities() {
    var cityData = JSON.parse(localStorage.getItem("cities"))

    cityData.forEach((city) => {
        $("#citylist").append("<li class='list-group-item city-list'>" + city + "</li>")
    })
}

getCities();

$(".city-list").click(function() {
    city = $(this).text();
    getWeather(city);
} )
