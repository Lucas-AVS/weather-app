// import { key } from "./keys.json";

export async function api(location) {
  try {
    const fetchCurrent = fetch(
      `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=yes`
    );
    const fetchForecast = fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${{ secrets.API_KEY }}&q=${location}&days=7`
    );

    const [currentResponse, forecastResponse] = await Promise.all([
      fetchCurrent,
      fetchForecast,
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("Network response was not ok");
    }

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
