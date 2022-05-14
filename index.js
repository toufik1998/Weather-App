let inpValue = document.querySelector("#search");
let form = document.querySelector("#weather-form");
let btn = document.querySelector("button");
let conditions = document.querySelector(".conditions");
let city = document.querySelector(".city");
let container = document.querySelector(".container");

const weather = {
  apiKey: "fbaca2baf86f38b39d7e95a96dac3336",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&icon=11d&appid=${this.apiKey}`
    )
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        console.log(data);
        const { name } = data;
        const { temp, humidity } = data.main;
        const { icon, description } = data.weather[0];
        const { speed } = data.wind;
        console.log(name, temp, humidity, icon, description, speed);
        container.style.height = "500px";
        conditions.innerHTML = `
        <div class="city">weather in ${name}</div>
        <div class="temperature"><i class="fa-solid fa-temperature-low"></i> temperature: ${temp}&deg;C</div>
        <div class="cloud">${description} <img src="http://openweathermap.org/img/w/${icon}.png" alt="weather icon"></div>
        <div class="humidity">humidity: <i class="fa-solid fa-lines-leaning"></i> ${humidity}%</div>
        <div class="windy-speed">windy-speed: <i class="fa-solid fa-flag"></i> ${speed} km/hr</div>

        `;
      })
      .catch((error) => {
        container.style.height = "fit-content";
        conditions.innerHTML = `Sorry ${error}`;
      });
  },
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  weather.fetchWeather(inpValue.value);
  inpValue.value = "";
});

window.addEventListener("keyup", function (e) {
  if (inpValue.value != "" && e.key === "Enter") {
    weather.fetchWeather(inpValue.value);
    inpValue.value = "";
  }
});
