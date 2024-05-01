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

api().then(
  ({ currentData, currentWeatherCondition, forecastData, forecastDays }) => {
    console.log(currentData);
    console.log("Weather Condition:", currentWeatherCondition);
    console.log(forecastData.forecast.forecastday);
    console.log(forecastDays);

    // Update the UI with the fetched currentData
    elements.locationName.textContent = currentData.location.name;
    elements.currentDate.textContent = currentData.location.localtime;
    elements.weatherIcon.src = getWeatherIcon(
      currentData.current.condition.icon
    );
    elements.tempValue.textContent = currentData.current.temp_c + "°C";
    elements.weatherType.textContent = currentData.current.condition.text;
    elements.feelsLikeTemp.textContent =
      "Feels like " + currentData.current.feelslike_c + "°C";
    elements.windSpeed.textContent = getWindDescription(
      currentData.current.wind_kph
    );

    elements.windDirection.classList.add(
      `fas`,
      getWindIconName(currentData.current.wind_dir)
    );

    elements.windSpeedSpecific.textContent =
      convertKmhToMs(currentData.current.wind_kph) + "m/s";
    elements.humidity.textContent = currentData.current.humidity + "%";
    elements.uvIndex.textContent = currentData.current.uv;
    elements.visibility.textContent = currentData.current.vis_km + "km";
    elements.cloudiness.textContent = currentData.current.cloud + "%";
    elements.rainChance.textContent = currentData.current.precip_mm + "mm";

    weekForecast(forecastDays);
  }
);

function weekForecast(weekDays) {
  weekDays.forEach((day, index) => {
    const dayElement = elements.weekDays[index];
    dayElement.querySelector(".day-name").textContent = dateToWeekDay(day.date);
    dayElement.querySelector(".day-temp").textContent =
      day.day.avgtemp_c + "°C";
    dayElement.querySelector(".day-icon").src = getWeatherIcon(
      day.day.condition.icon
    );
  });
}

function dateToWeekDay(day) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[new Date(day).getDay()];
}
