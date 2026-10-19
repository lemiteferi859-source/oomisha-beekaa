import { useState, useEffect } from 'react';
import API from '../api';
import { useTranslation } from 'react-i18next';

function Weather() {
  const { t } = useTranslation();
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const quickCities = [
    'Addis Ababa',
    'Adama',
    'Jimma',
    'Hawassa',
    'Nekemte',
    'Bishoftu',
    'Bahir Dar'
  ];

  const fetchWeatherForCity = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError(null);

    try {
      const response = await API.get(`/api/weather?city=${encodeURIComponent(cityName)}`);
      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherForCity('Addis Ababa');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherForCity(city.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-900">{t('Weather Forecast')}</h1>
        <p className="text-gray-500 text-sm mt-1">
          Hyper-local agricultural weather intelligence for Ethiopian farming zones
        </p>
      </div>

      {/* Quick Ethiopian City Selectors */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
        <span className="text-xs font-bold text-gray-400 uppercase mr-1">Quick Select:</span>
        {quickCities.map((c) => (
          <button
            key={c}
            onClick={() => {
              setCity(c);
              fetchWeatherForCity(c);
            }}
            className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition ${weather?.name?.toLowerCase() === c.toLowerCase() ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-400'}`}
          >
            📍 {c}
          </button>
        ))}
      </div>

      {/* Custom City Search Input */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search any Ethiopian city, town, or woreda (e.g. Shashemene, Gondar...)"
          />
          <button
            type="submit"
            disabled={loading}
            className={`py-3 px-6 rounded-xl font-bold text-white shadow-sm transition active:scale-95 ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Fetching...' : 'Check Weather'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3.5 rounded-xl mb-6 text-sm flex items-center gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Weather Results Display */}
      {weather && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Current Weather</span>
                <h2 className="text-3xl font-black mt-1">
                  {weather.name}, <span className="text-blue-200 text-xl font-medium">{weather.sys?.country || 'ET'}</span>
                </h2>
                <p className="text-blue-100 text-sm mt-1 capitalize font-medium flex items-center gap-1.5">
                  <span>⛅</span>
                  <span>{weather.weather?.[0]?.description || 'Mild Conditions'}</span>
                </p>
              </div>
              <div className="text-right sm:text-right">
                <span className="text-5xl font-black">{Math.round(weather.main?.temp)}°C</span>
                <p className="text-xs text-blue-200 mt-1">Feels like {Math.round(weather.main?.feels_like || weather.main?.temp)}°C</p>
              </div>
            </div>
          </div>

          {/* Meteorological Metrics */}
          <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50/50 border-b border-gray-100">
            <div className="bg-white p-4 rounded-xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase">Humidity</p>
              <p className="text-xl font-black text-gray-900 mt-1">{weather.main?.humidity}%</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Moisture level</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase">Wind Speed</p>
              <p className="text-xl font-black text-gray-900 mt-1">{weather.wind?.speed} <span className="text-xs font-normal text-gray-500">m/s</span></p>
              <p className="text-[10px] text-gray-400 mt-0.5">Spraying window</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase">Barometer</p>
              <p className="text-xl font-black text-gray-900 mt-1">{weather.main?.pressure || 1013} <span className="text-xs font-normal text-gray-500">hPa</span></p>
              <p className="text-[10px] text-gray-400 mt-0.5">Atmospheric state</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase">Condition</p>
              <p className="text-xl font-black text-blue-600 mt-1 capitalize">{weather.weather?.[0]?.main || 'Clear'}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Sky visibility</p>
            </div>
          </div>

          {/* Agronomic Farming Advice Banner */}
          {weather.farmingAdvice && (
            <div className="p-6 bg-green-50/80 border-t border-green-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brandGreen text-white flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
                🌾
              </div>
              <div>
                <h4 className="text-sm font-bold text-green-900 uppercase tracking-wide">Agronomic Advisory for Farmers</h4>
                <p className="text-sm text-green-800 mt-1 leading-relaxed">
                  {weather.farmingAdvice}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Weather;
