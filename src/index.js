import "./style.css";
import { api } from "./components/api";
import {
  getWindDescription,
  convertKmhToMs,
  getWindIconName,
  getWeatherIcon,
} from "./components/dataTransformer";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

// Object to store all html elements
const elements = {
  locationName: document.querySelector(".location-name"),
  currentDate: document.querySelector(".current-date"),
  weatherIcon: document.querySelector(".temperature img"),
  tempValue: document.querySelector(".temp-value"),
  weatherType: document.querySelector(".weather-type"),
  feelsLikeTemp: document.querySelector(".feels-like-temp"),
  windSpeed: document.querySelector(".wind-speed"),
  windDirection: document.querySelector(
    ".specific .wind-speed .wind-direction i"
  ),
  windSpeedSpecific: document.querySelector(".specific .wind-speed h2"),
  humidity: document.querySelector(".specific .humidity h2"),
  uvIndex: document.querySelector(".specific .uv-index h2"),
  visibility: document.querySelector(".specific .visibility h2"),
  cloudiness: document.querySelector(".specific .cloudiness h2"),
  rainChance: document.querySelector(".specific .rain-chance h2"),
  weekDays: document.querySelectorAll(".day"),
};

api().then(({ data, weatherCondition }) => {
  console.log(data);
  console.log("Weather Condition:", weatherCondition);

  // Update the UI with the fetched data
  elements.locationName.textContent = data.location.name;
  elements.currentDate.textContent = data.location.localtime;
  elements.weatherIcon.src = getWeatherIcon(data.current.condition.icon);
  elements.tempValue.textContent = data.current.temp_c + "°C";
  elements.weatherType.textContent = data.current.condition.text;
  elements.feelsLikeTemp.textContent =
    "Feels like " + data.current.feelslike_c + "°C";
  elements.windSpeed.textContent = getWindDescription(data.current.wind_kph);

  elements.windDirection.classList.add(
    `fas`,
    getWindIconName(data.current.wind_dir)
  );

  elements.windSpeedSpecific.textContent =
    convertKmhToMs(data.current.wind_kph) + "m/s";
  elements.humidity.textContent = data.current.humidity + "%";
  elements.uvIndex.textContent = data.current.uv;
  elements.visibility.textContent = data.current.vis_km + "km";
  elements.cloudiness.textContent = data.current.cloud + "%";
  elements.rainChance.textContent = data.current.precip_mm + "mm";
});
