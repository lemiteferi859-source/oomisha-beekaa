import { useState, useEffect } from 'react';
import API from '../api';
import { useTranslation } from 'react-i18next';

function Market() {
  const { t } = useTranslation();
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cropFilter, setCropFilter] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const regions = [
    { label: 'All Markets', value: '' },
    { label: 'Addis Ababa', value: 'Addis Ababa' },
    { label: 'Adama', value: 'Adama' },
    { label: 'Jimma', value: 'Jimma' },
    { label: 'Nekemte', value: 'Nekemte' },
    { label: 'Bishoftu', value: 'Bishoftu' },
    { label: 'Hawassa', value: 'Hawassa' },
  ];

  const popularCrops = ['Teff', 'Wheat', 'Coffee', 'Maize', 'Barley'];

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (cropFilter) params.append('crop', cropFilter);
      if (selectedLocation) params.append('location', selectedLocation);

      const url = params.toString() ? `/api/market?${params.toString()}` : '/api/market';
      const response = await API.get(url);
      setPrices(response.data);
    } catch (err) {
      setError('Error fetching market prices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    // eslint-disable-next-line
  }, [selectedLocation]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPrices();
  };

  // Calculate statistics
  const maxPrice = prices.length > 0 ? Math.max(...prices.map(p => p.pricePerKg)) : 0;
  const avgPrice = prices.length > 0 ? Math.round(prices.reduce((sum, p) => sum + p.pricePerKg, 0) / prices.length) : 0;
  const topCrop = prices.find(p => p.pricePerKg === maxPrice);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">{t('Market Prices')}</h1>
          <p className="text-gray-500 text-sm mt-1">
            Real-time verified grain and commodity rates across major Ethiopian trading hubs
          </p>
        </div>
        <div className="text-xs bg-green-100 text-brandGreen font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Live Cloud Synced
        </div>
      </div>

      {/* Market Statistics Cards */}
      {prices.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Average Price</p>
              <p className="text-2xl font-black text-gray-900 mt-1">{avgPrice} <span className="text-sm font-semibold text-gray-500">ETB/kg</span></p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center text-xl font-bold">
              ⚖️
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Highest Valued</p>
              <p className="text-2xl font-black text-brandGreen mt-1">{topCrop ? topCrop.cropName.split(' ')[0] : '-'}</p>
              <p className="text-xs text-gray-500">{maxPrice} ETB/kg ({topCrop?.marketLocation || ''})</p>
            </div>
            <div className="w-12 h-12 bg-green-50 text-brandGreen rounded-xl flex items-center justify-center text-xl font-bold">
              ⭐
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Listings</p>
              <p className="text-2xl font-black text-gray-900 mt-1">{prices.length} <span className="text-sm font-semibold text-gray-500">Crops</span></p>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold">
              📊
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-3">
          <input
            type="text"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            placeholder="Search crop by name (e.g., Teff, Wheat, Coffee, Maize...)"
            value={cropFilter}
            onChange={(e) => setCropFilter(e.target.value)}
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-bold shadow-sm transition active:scale-95"
          >
            Search
          </button>
        </form>

        {/* Quick Crop Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-bold text-gray-400 uppercase mr-1">Crops:</span>
          <button
            onClick={() => { setCropFilter(''); }}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${!cropFilter ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All
          </button>
          {popularCrops.map((crop) => (
            <button
              key={crop}
              onClick={() => { setCropFilter(crop); }}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${cropFilter === crop ? 'bg-yellow-500 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {crop}
            </button>
          ))}
        </div>

        {/* Regional Market Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase mr-1">Regions:</span>
          {regions.map((region) => (
            <button
              key={region.label}
              onClick={() => setSelectedLocation(region.value)}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${selectedLocation === region.value ? 'bg-brandGreen text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              📍 {region.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* Market Data Table */}
      {loading ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-gray-100 text-gray-400">
          <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          Loading real-time Ethiopian commodity prices...
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Crop Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Trading Market</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price per Kg</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Market Value Bar</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Date Recorded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {prices.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                    No market records found for the selected filter. Try choosing "All Markets" or clearing the search.
                  </td>
                </tr>
              ) : (
                prices.map((item) => {
                  const percentage = maxPrice > 0 ? Math.round((item.pricePerKg / maxPrice) * 100) : 0;
                  return (
                    <tr key={item._id} className="hover:bg-gray-50/80 transition">
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900 flex items-center gap-2">
                        <span>🌱</span>
                        <span>{item.cropName}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                        📍 {item.marketLocation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-base font-black text-gray-900">{item.pricePerKg}</span>{' '}
                        <span className="text-xs font-bold text-yellow-600 uppercase">{item.currency || 'ETB'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-36 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-brandGreen h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] text-gray-400">{percentage}% of peak</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm text-right">
                        {new Date(item.dateRecorded).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Market;
