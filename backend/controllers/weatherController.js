const axios = require("axios");

exports.getWeather = async (req, res) => {
  try {
    const { lat, lon } = req.params;

    // Fetch weather data
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_API_KEY}`
    );

    const weather = weatherResponse.data.weather[0].main;
    res.json({ weather });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};
