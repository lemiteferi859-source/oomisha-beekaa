import { useState, useEffect, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

function AdminPanel() {
  const { user } = useContext(AuthContext);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cropName: '',
    marketLocation: '',
    pricePerKg: '',
    currency: 'ETB'
  });

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const res = await API.get('/api/market');
      setPrices(res.data);
    } catch (err) {
      toast.error('Failed to load market data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/market', formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success(`${formData.cropName} added successfully!`);
      setFormData({ cropName: '', marketLocation: '', pricePerKg: '', currency: 'ETB' });
      setShowForm(false);
      fetchPrices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add price');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await API.delete(`/api/market/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success(`${name} deleted successfully`);
      fetchPrices();
    } catch (err) {
      toast.error('Failed to delete item');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Manage market prices and crop data</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-sm ${showForm ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-brandGreen text-white hover:bg-green-800'}`}
        >
          {showForm ? '✕ Cancel' : '+ Add New Price'}
        </button>
      </div>

      {/* Add New Price Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Add Market Price</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Crop Name</label>
              <input
                type="text"
                name="cropName"
                value={formData.cropName}
                onChange={handleChange}
                placeholder="e.g. Teff, Wheat"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen transition"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Market Location</label>
              <input
                type="text"
                name="marketLocation"
                value={formData.marketLocation}
                onChange={handleChange}
                placeholder="e.g. Addis Ababa"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen transition"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price per Kg</label>
              <input
                type="number"
                name="pricePerKg"
                value={formData.pricePerKg}
                onChange={handleChange}
                placeholder="e.g. 110"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen transition"
                required
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brandGreen transition"
                >
                  <option value="ETB">ETB</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-brandGreen hover:bg-green-800 text-white font-bold px-5 py-2.5 rounded-xl shadow-sm transition"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Prices Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="font-bold text-gray-800">All Market Prices ({prices.length})</h2>
        </div>
        {loading ? (
          <div className="p-10 text-center text-gray-400">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Crop</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price/Kg</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {prices.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-gray-400">No market data yet. Click "Add New Price" to get started.</td>
                  </tr>
                ) : (
                  prices.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/80 transition">
                      <td className="px-6 py-4 font-semibold text-gray-900">{item.cropName}</td>
                      <td className="px-6 py-4 text-gray-600">{item.marketLocation}</td>
                      <td className="px-6 py-4 font-bold text-yellow-600">{item.pricePerKg} {item.currency}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{new Date(item.dateRecorded).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(item._id, item.cropName)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-medium transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
