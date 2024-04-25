import { key } from "./keys.json";

//   const currentLocation = document.querySelector(".location-name");
const currentLocation = "brasília";

export async function api() {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${key}&q=${currentLocation}&aqi=yes`
    );
    const data = await response.json();
    const weatherCondition = data.current.condition.text;
    return { data, weatherCondition };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
