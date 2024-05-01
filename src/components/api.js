import { key } from "./keys.json";

//   const currentLocation = document.querySelector(".location-name");
const currentLocation = "brasília";

export async function api() {
  try {
    const fetchCurrent = fetch(
      `http://api.weatherapi.com/v1/current.json?key=${key}&q=${currentLocation}&aqi=yes`
    );
    const fetchForecast = fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${currentLocation}&days=7`
    );

    const [currentResponse, forecastResponse] = await Promise.all([
      fetchCurrent,
      fetchForecast,
    ]);

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    const currentWeatherCondition = currentData.current.condition.text;
    const forecastDays = forecastData.forecast.forecastday;

    return { currentData, currentWeatherCondition, forecastData, forecastDays };
  } catch (error) {
    console.error("Error:", error);
    // Handle the error based on your application's specific requirements
    throw error;
  }
}
