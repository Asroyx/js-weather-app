const apiKey = "30b65fdef481df94e7c9a74e0daa2332";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const checkWeather = async (city) => {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  const weatherElements = document.querySelectorAll(".weather > *");
  weatherElements.forEach((element) => {
    element.style.opacity = "0";
  });

  setTimeout(() => {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + `<i>°C</i>`;
    document.querySelector(".humidity").innerHTML = data.main.humidity;
    document.querySelector(".wind").innerHTML = data.wind.speed;

    document.querySelector(
      ".weather-icon"
    ).src = `assets/${data.weather[0].main.toLowerCase()}.png`;

    // Tüm weather altındaki elementlerin opacity'sini 1'e ayarla
    weatherElements.forEach((element) => {
      element.style.opacity = "1";
    });
  }, 200);
};

searchBtn.addEventListener("click", () => {
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".card").classList.add("expanded");
  checkWeather(searchBox.value);
});
