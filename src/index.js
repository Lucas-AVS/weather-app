import "./style.css";
import { api } from "./components/api";

// Object to store all html elements
const elements = {
  locationName: document.querySelector(".location-name"),
  currentDate: document.querySelector(".current-date"),
  tempValue: document.querySelector(".temp-value"),
  weatherType: document.querySelector(".weather-type"),
  feelsLikeTemp: document.querySelector(".feels-like-temp"),
  windSpeed: document.querySelector(".wind-speed"),
  windSpeedSpecific: document.querySelector(".specific .wind-speed"),
  humidity: document.querySelector(".specific .humidity"),
  uvIndex: document.querySelector(".specific .uv-index"),
  visibility: document.querySelector(".specific .visibility"),
  cloudiness: document.querySelector(".specific .cloudiness"),
  rainChance: document.querySelector(".specific .rain-chance"),
  weekDays: document.querySelectorAll(".day"),
};

api().then(({ data, weatherCondition }) => {
  console.log(data);
  console.log("Weather Condition:", weatherCondition);

  // Update the UI with the fetched data
  elements.locationName.textContent = data.location.name;
  elements.currentDate.textContent = data.location.localtime;
  elements.tempValue.textContent = data.current.temp_c + "°C";
  elements.weatherType.textContent = data.current.condition.text;
  elements.feelsLikeTemp.textContent =
    "Feels like " + data.current.feelslike_c + "°C";
  elements.windSpeed.textContent = data.current.wind_kph + "km/h";
  elements.windSpeedSpecific.textContent = data.current.wind_kph + "km/h";
  elements.humidity.textContent = data.current.humidity + "%";
  elements.uvIndex.textContent = data.current.uv;
  elements.visibility.textContent = data.current.vis_km + "km";
  elements.cloudiness.textContent = data.current.cloud + "%";
  elements.rainChance.textContent = data.current.precip_mm + "mm";
});
