export const kelvinToCelsius = (temperature) => {
  return Math.round(temperature - 273);
};

export const celsiusToFahrenheit = (temperature) => {
  return Math.round(temperature * 1.8 + 32);
};

export const fahrenheitToCelsius = (temperature) => {
  return Math.round((temperature - 32) / 1.8);
};

export const mpsToKmph = (meters) => {
  return Math.round(meters * 3.6);
};

export const kmphToMph = (kilometers) => {
  return Math.round(kilometers / 1.609344);
};

export const mphToKmph = (miles) => {
  return Math.round(miles * 1.609344);
};
