import "./style.css";
import { api } from "./components/api";
import {
  getWindDescription,
  convertKmhToMs,
  getWindIconName,
  getWeatherIcon,
  dateToWeekDay,
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
    currentDateDisplay(currentData);
    weekForecast(forecastDays);
  }
);

function currentDateDisplay(currentDay) {
  // Update the UI with the fetched currentDay
  console.log(currentDay.location);
  elements.locationName.textContent = `${currentDay.location.name}, ${currentDay.location.country}`;
  elements.currentDate.textContent = currentDay.location.localtime;
  elements.weatherIcon.src = getWeatherIcon(currentDay.current.condition.icon);
  elements.tempValue.textContent = currentDay.current.temp_c + "°C";
  elements.weatherType.textContent = currentDay.current.condition.text;
  elements.feelsLikeTemp.textContent =
    "Feels like " + currentDay.current.feelslike_c + "°C";
  elements.windSpeed.textContent = getWindDescription(
    currentDay.current.wind_kph
  );

  elements.windDirection.classList.add(
    `fas`,
    getWindIconName(currentDay.current.wind_dir)
  );

  elements.windSpeedSpecific.textContent =
    convertKmhToMs(currentDay.current.wind_kph) + "m/s";
  elements.humidity.textContent = currentDay.current.humidity + "%";
  elements.uvIndex.textContent = currentDay.current.uv;
  elements.visibility.textContent = currentDay.current.vis_km + "km";
  elements.cloudiness.textContent = currentDay.current.cloud + "%";
  elements.rainChance.textContent = currentDay.current.precip_mm + "mm";
}

function weekForecast(weekDays) {
  weekDays.forEach((day, index) => {
    const dayElement = elements.weekDays[index];
    dayElement.querySelector(".day-name").textContent = dateToWeekDay(day.date);
    dayElement.querySelector(".max-temperature").textContent =
      "Max: " + day.day.maxtemp_c + "°C";
    dayElement.querySelector(".min-temperature").textContent =
      "Min: " + day.day.mintemp_c + "°C";
    dayElement.querySelector(".day-icon").src = getWeatherIcon(
      day.day.condition.icon
    );
  });
}
