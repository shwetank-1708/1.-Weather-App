const apiKey = "d406beff9fb84b4e7d5be89c9fd82025";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector("#searchBox");
const button = document.querySelector("#button");
let weatherIcon = document.querySelector("#weatherIcon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  console.log(data);
  console.log(data.cod);

  if (data.cod == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather_details").style.display = "none";
  } else {
    document.querySelector(".weather_details").style.display = "block";
    document.querySelector(".error").style.display = "none";

    document.querySelector("#temp").innerHTML =
      Math.round(data.main.temp) + " °C";
    document.querySelector("#main").innerHTML = data.weather[0].main;
    document.querySelector("#city").innerHTML = data.name;
    document.querySelector("#country").innerHTML = data.sys.country;
    document.querySelector("#feelsLike").innerHTML =
      Math.round(data.main.feels_like) + " °C";
    document.querySelector("#humidity").innerHTML = data.main.humidity + " %";
    document.querySelector("#windspeed").innerHTML = data.wind.speed + " Km/h";
    document.querySelector("#lat").innerHTML =
      "Lat: - " + Math.round(data.coord.lat);
    document.querySelector("#long").innerHTML =
      "Long: - " + Math.round(data.coord.lon);

    if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.gif";
    } else if (data.weather[0].main == "Haze") {
      weatherIcon.src = "images/foggy.gif";
    } else if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.gif";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/sun.gif";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.gif";
    }
  }
}

button.addEventListener("click", function () {
  checkWeather(searchBox.value);
  document.querySelector("#searchBox").value = "";
});
