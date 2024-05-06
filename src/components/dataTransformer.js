export function getWindDescription(windSpeedKph) {
  if (windSpeedKph < 5) {
    return "Calm";
  } else if (windSpeedKph < 11) {
    return "Light breeze";
  } else if (windSpeedKph < 20) {
    return "Moderate breeze";
  } else if (windSpeedKph < 29) {
    return "Fresh breeze";
  } else if (windSpeedKph < 39) {
    return "Strong breeze";
  } else if (windSpeedKph < 50) {
    return "Near gale";
  } else {
    return "Strong gale";
  }
}

export function getWindIconName(windDirection) {
  const windDirections = {
    N: "fa-long-arrow-up",
    NE: "fa-long-arrow-up",
    E: "fa-long-arrow-right",
    SE: "fa-long-arrow-down",
    S: "fa-long-arrow-down",
    SW: "fa-long-arrow-down",
    W: "fa-long-arrow-left",
    NW: "fa-long-arrow-up",
  };

  if (windDirection in windDirections) {
    return windDirections[windDirection];
  } else {
    // unknown wind direction
    return "fa-wind";
  }
}

export function getWeatherIcon(iconUrl) {
  const relativePath = iconUrl.split(".com").pop().split(".")[0];
  return `../assets${relativePath}.png`;
}

export function convertKmhToMs(windSpeedKmh) {
  // 1 km/h = 0.277778 m/s
  return Math.floor(windSpeedKmh * 0.277778);
}

export function dateToWeekDay(day) {
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

export function LoadAnimation() {
  const loader = document.querySelector(".loader");
  main.classList.add("hide");
  loader.classList.remove("hide");
}
