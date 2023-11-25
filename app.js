const apiKey = "30b65fdef481df94e7c9a74e0daa2332";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=florida";

const checkWeather = async () => {
  const response = await fetch(apiUrl + `&appid=${apiKey}`);
  var data = await response.json();

  console.log(data);

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + `<i>°C</i>`;
  document.querySelector(".humidity").innerHTML = data.main.humidity;
  document.querySelector(".wind").innerHTML = data.wind.speed;
  document.querySelector(".wind").innerHTML = data.wind.speed;
};

checkWeather();
