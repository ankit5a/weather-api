const redisClient = require("../cache/redis.client");
const { fetchWeatherFromAPI } = require("../services/weather.service");
const ApiError = require("../utils/apiError");

exports.getWeather = async (req, res, next) => {
  try {
    const city = req.query.city;

    if (!city) {
      throw new ApiError(400, "City query parameter is required");
    }

    const cacheKey = city.toLowerCase();

    // 1️⃣ Check cache
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.json({
        source: "cache",
        data: JSON.parse(cachedData),
      });
    }

    // 2️⃣ Fetch from 3rd party API
    const weatherData = await fetchWeatherFromAPI(city);

    // 3️⃣ Save to cache
    await redisClient.set(cacheKey, JSON.stringify(weatherData), {
      EX: process.env.CACHE_TTL,
    });

    return res.json({
      source: "api",
      data: weatherData,
    });
  } catch (error) {
    next(error); // 🔥 send to centralized handler
  }
};
