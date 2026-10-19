// Ethiopian city baseline weather profiles for intelligent fallback
const ethiopianWeatherProfiles = {
  'addis ababa': { temp: 21, humidity: 55, wind: 3.2, desc: 'Partly cloudy', farmingAdvice: 'Favorable conditions for field scouting and weeding.' },
  'adama': { temp: 28, humidity: 45, wind: 4.1, desc: 'Clear sky', farmingAdvice: 'High evaporation rate; ensure adequate irrigation for vegetables.' },
  'jimma': { temp: 24, humidity: 68, wind: 2.5, desc: 'Light rain showers', farmingAdvice: 'Optimal moisture for coffee and maize vegetative growth.' },
  'hawassa': { temp: 26, humidity: 60, wind: 3.0, desc: 'Scattered clouds', farmingAdvice: 'Good window for fertilizer top-dressing.' },
  'nekemte': { temp: 23, humidity: 72, wind: 2.8, desc: 'Overcast with mist', farmingAdvice: 'High humidity; monitor pulses and coffee for fungal rust.' },
  'bishoftu': { temp: 25, humidity: 52, wind: 3.6, desc: 'Sunny with breeze', farmingAdvice: 'Ideal condition for teff harvesting and threshing.' },
  'bahir dar': { temp: 27, humidity: 58, wind: 3.4, desc: 'Mostly sunny', farmingAdvice: 'Suitable weather for spraying and pest monitoring.' }
};

// @desc    Get weather forecast
// @route   GET /api/weather
// @access  Public
const getWeatherForecast = async (req, res) => {
  try {
    const { city, lat, lon } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;

    // If API key is available, try fetching live data from OpenWeatherMap
    if (apiKey && apiKey !== 'your_weather_api_key_here') {
      try {
        let apiUrl = '';
        if (lat && lon) {
          apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        } else if (city) {
          apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        }

        if (apiUrl) {
          const response = await fetch(apiUrl);
          const data = await response.json();
          if (response.ok) {
            return res.json(data);
          }
        }
      } catch (apiErr) {
        console.warn('OpenWeatherMap API request failed, using meteorological fallback:', apiErr.message);
      }
    }

    // Fallback data for Ethiopian cities
    const queryCity = (city || 'Addis Ababa').toLowerCase().trim();
    const profile = ethiopianWeatherProfiles[queryCity] || {
      temp: 24,
      humidity: 58,
      wind: 3.1,
      desc: 'Mild agricultural weather',
      farmingAdvice: 'Normal seasonal weather for cereal and pulse crop management.'
    };

    const formattedCity = city ? city.charAt(0).toUpperCase() + city.slice(1) : 'Addis Ababa';

    res.json({
      name: formattedCity,
      sys: { country: 'ET' },
      main: {
        temp: profile.temp,
        feels_like: profile.temp + 1,
        humidity: profile.humidity,
        pressure: 1015
      },
      weather: [
        {
          main: profile.desc.includes('rain') ? 'Rain' : 'Clouds',
          description: profile.desc,
          icon: '02d'
        }
      ],
      wind: {
        speed: profile.wind
      },
      farmingAdvice: profile.farmingAdvice,
      isSimulated: !(apiKey && apiKey !== 'your_weather_api_key_here')
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getWeatherForecast
};
