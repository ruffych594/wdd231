// OpenWeatherMap: current weather + 3-day forecast for Harare, Zimbabwe
const API_KEY = "83a90393c347d73df8a77786aaf21565";
const LAT = -17.8292;
const LON = 31.0522;

const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const weatherIcon = document.querySelector("#weather-icon");
const forecastList = document.querySelector("#forecast");

async function getWeather() {
  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentURL),
      fetch(forecastURL),
    ]);
    if (!currentRes.ok || !forecastRes.ok) throw new Error("Weather request failed");

    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    displayCurrent(current);
    displayForecast(forecast);
  } catch (error) {
    weatherDesc.textContent = "Weather data unavailable";
    console.error(error);
  }
}

function displayCurrent(data) {
  const { temp } = data.main;
  const { description, icon } = data.weather[0];

  currentTemp.innerHTML = `${Math.round(temp)}&deg;C`;
  weatherDesc.textContent = description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  weatherIcon.alt = description;
}

function displayForecast(data) {
  const today = new Date().toISOString().slice(0, 10);

  // The API returns 3-hour slots; keep the midday reading for each of the next 3 days
  const days = data.list
    .filter((item) => item.dt_txt.includes("12:00:00") && !item.dt_txt.startsWith(today))
    .slice(0, 3);

  forecastList.innerHTML = "";
  days.forEach((day) => {
    const label = new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
    const li = document.createElement("li");
    li.innerHTML = `<span class="day">${label}</span>${Math.round(day.main.temp)}&deg;C`;
    forecastList.appendChild(li);
  });
}

getWeather();
