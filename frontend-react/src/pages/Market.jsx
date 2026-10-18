import { useState, useEffect } from 'react';
import API from '../api';
import { useTranslation } from 'react-i18next';

function Market() {
  const { t } = useTranslation();
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cropFilter, setCropFilter] = useState('');

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const url = cropFilter 
        ? `/api/market?crop=${cropFilter}`
        : '/api/market';
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
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('Market Prices')}</h1>
      
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex gap-4 items-center">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
          placeholder="Filter by crop name (e.g., Teff, Wheat, Coffee)"
          value={cropFilter}
          onChange={(e) => setCropFilter(e.target.value)}
        />
        <button
          onClick={fetchPrices}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded font-medium transition"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Loading market data...</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price per Kg</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Recorded</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prices.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No market prices found.</td>
                </tr>
              ) : (
                prices.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.cropName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.marketLocation}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-yellow-600">
                      {item.pricePerKg} {item.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                      {new Date(item.dateRecorded).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Market;
