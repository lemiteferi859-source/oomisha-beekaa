// @desc    Get weather forecast
// @route   GET /api/weather
// @access  Public
const getWeatherForecast = async (req, res) => {
  try {
    const { city, lat, lon } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey || apiKey === 'your_weather_api_key_here') {
      return res.status(500).json({ message: 'Weather API key not configured' });
    }

    let apiUrl = '';
    
    // Support either city name or coordinates
    if (lat && lon) {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else if (city) {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    } else {
      return res.status(400).json({ message: 'Please provide city or lat/lon parameters' });
    }

    // Using native fetch (Node 18+)
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ message: data.message || 'Error fetching weather data' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getWeatherForecast
};
