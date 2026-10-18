import { useState } from 'react';
import API from '../api';
import { useTranslation } from 'react-i18next';

function Weather() {
  const { t } = useTranslation();
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;
    
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await API.get(`/api/weather?city=${city}`);
      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('Weather Forecast')}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <form onSubmit={fetchWeather} className="flex gap-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city or region (e.g., Addis Ababa)"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`py-2 px-6 rounded font-semibold text-white ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Searching...' : 'Get Weather'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {weather && (
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">{weather.name}, {weather.sys?.country}</h2>
            <div className="text-4xl font-bold text-blue-600">
              {Math.round(weather.main?.temp)}°C
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <div>
              <p className="text-sm font-medium">Condition</p>
              <p className="text-lg capitalize">{weather.weather?.[0]?.description}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Humidity</p>
              <p className="text-lg">{weather.main?.humidity}%</p>
            </div>
            <div>
              <p className="text-sm font-medium">Wind Speed</p>
              <p className="text-lg">{weather.wind?.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
