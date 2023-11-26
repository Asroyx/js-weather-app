const apiKey = "30b65fdef481df94e7c9a74e0daa2332";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const historyContainer = document.querySelector("#card-history");

var liCount = historyContainer.getElementsByTagName("li").length;

historyContainer.style.opacity = "0";

const checkWeather = async (city) => {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
      throw new Error("Invalid input. Please enter a valid city name.");
    }
    var data = await response.json();

    const weatherElements = document.querySelectorAll(".weather > *");
    weatherElements.forEach((element) => {
      element.style.opacity = "0";
    });
    searchBox.value = "";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".card").classList.add("expanded");

    setTimeout(() => {
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + `<i>°C</i>`;
      document.querySelector(".humidity").innerHTML = data.main.humidity;
      document.querySelector(".wind").innerHTML = data.wind.speed;
      document.querySelector(
        ".weather-icon"
      ).src = `assets/${data.weather[0].main.toLowerCase()}.png`;

      historyContainer.innerHTML += `<li>${city}</li>`;

      weatherElements.forEach((element) => {
        element.style.opacity = "1";
        historyContainer.style.opacity = "1";
      });
    }, 200);
  } catch (error) {
    alert(error);
  }
};

historyContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    checkWeather(e.target.innerText);
  }
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchBtn.click();
  }
});
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
