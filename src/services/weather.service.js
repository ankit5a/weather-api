const axios = require("axios");

exports.fetchWeatherFromAPI = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY;

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`;

  const response = await axios.get(url);

  return {
    city: response.data.resolvedAddress,
    temperature: response.data.currentConditions.temp,
    humidity: response.data.currentConditions.humidity,
    conditions: response.data.currentConditions.conditions,
  };
};
