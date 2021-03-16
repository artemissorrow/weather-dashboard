var currentWeather = document.createElement("p");
var cityMain = document.createElement("h2");
var city;

$("button").click(function (){
    city = $("input").val();

    if (city === ""){
        alert("Please enter a city");
    } else {
        console.log(city);
        getWeather(city); }
    
})

function getWeather(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=2e3156227de377f7890d638acf2e705c";

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    showWeather();
                })
            } else {
                alert("Error: " + response.statusText);
            }
        })
}

function showWeather() {
    cityMain.textContent = city;
$("#mainforecast").append(cityMain);
}