const APIkey = "910664c37600639b012d56c7920ae21c";
const APIurl = "https://api.openweathermap.org/data/2.5/weather";
const searchInput = document.getElementById("search-input");
const locationElement = document.getElementById("location");
const weatherImg = document.getElementById("weather-img");
var temperature = document.getElementById("temperature");
var description = document.getElementById("description");
var wind = document.getElementById("wind");
const btn = document.getElementById("searchBtn");

weatherImg.style.width = "20em";

function conversion(val) {
  return (val - 273.15).toFixed(2); // Convert Kelvin to Celsius
}

btn.addEventListener("click", function () {
  const query = searchInput.value;
  if (query) {
    fetch(`${APIurl}?q=${query}&appid=${APIkey}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          locationElement.textContent = `${data.name}, ${data.sys.country}`;
          temperature.textContent = `Temp: ${conversion(
            data.main.temp
          )} °C`;
          description.textContent = `Weather: ${data.weather[0].description}`;
          wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
          weatherImg.innerHTML = `<img class="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="weather icon">`;
        } else {
          locationElement.textContent = "Location not found";
          temperature.textContent = "";
          description.textContent = "";
          wind.textContent = "";
          weatherImg.innerHTML = "";
        }
      })
      .catch((error) => {
        console.error("Error fetching the weather data:", error);
      });
  } else {
    alert("Please enter a location to search for");
  }
});
