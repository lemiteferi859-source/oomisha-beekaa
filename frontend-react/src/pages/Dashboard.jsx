import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import API from '../api';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.token) return;
      try {
        const res = await API.get('/api/diseases/my-history', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setHistory(res.data);
      } catch (err) {
        console.error('Failed to load diagnosis history:', err);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchHistory();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-brandGreen text-white flex items-center justify-center text-3xl font-black shadow-lg flex-shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-black text-gray-900">{user?.name}</h1>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              <span className="inline-block bg-green-100 text-brandGreen text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {user?.role || 'farmer'}
              </span>
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {user?.preferredLanguage === 'om' ? 'Afaan Oromoo' : user?.preferredLanguage === 'am' ? 'አማርኛ (Amharic)' : 'English'}
              </span>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-5 py-2 rounded-xl text-sm transition border border-red-200"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link
          to="/disease"
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition flex items-center gap-4"
        >
          <div className="w-11 h-11 bg-green-100 text-brandGreen rounded-lg flex items-center justify-center text-xl flex-shrink-0">🔬</div>
          <div>
            <p className="font-bold text-gray-900 text-sm">{t('Crop Disease Detection')}</p>
            <p className="text-xs text-gray-500">Scan your crops with AI</p>
          </div>
        </Link>

        <Link
          to="/weather"
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition flex items-center gap-4"
        >
          <div className="w-11 h-11 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl flex-shrink-0">☀️</div>
          <div>
            <p className="font-bold text-gray-900 text-sm">{t('Weather Forecast')}</p>
            <p className="text-xs text-gray-500">Plan your farm activities</p>
          </div>
        </Link>

        <Link
          to="/market"
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition flex items-center gap-4"
        >
          <div className="w-11 h-11 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center text-xl flex-shrink-0">📈</div>
          <div>
            <p className="font-bold text-gray-900 text-sm">{t('Market Prices')}</p>
            <p className="text-xs text-gray-500">Check latest crop rates</p>
          </div>
        </Link>
      </div>

      {/* Past Diagnoses History Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span>🔬</span>
            <span>My Crop Diagnosis History ({history.length})</span>
          </h2>
          <Link to="/disease" className="text-xs font-bold text-brandGreen hover:underline">
            + New Scan
          </Link>
        </div>

        {loadingHistory ? (
          <div className="bg-white p-8 rounded-xl text-center text-gray-400 border border-gray-100 text-sm">
            Loading past diagnoses from cloud database...
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-sm">
            <div className="text-3xl mb-2">🌱</div>
            <p className="font-bold text-gray-700">No crop diagnoses recorded yet</p>
            <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
              Whenever you scan a crop leaf or report symptoms, your AI reports and treatments will be automatically saved here.
            </p>
            <Link
              to="/disease"
              className="inline-block mt-4 bg-brandGreen text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm hover:bg-green-800 transition"
            >
              Scan Your First Crop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-green-300 transition">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌿</span>
                    <h3 className="font-bold text-gray-900 text-base">{item.diseaseName}</h3>
                    <span className="bg-green-100 text-brandGreen text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      {item.cropAffected}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-brandGreen bg-green-50 px-2 py-0.5 rounded">
                      {item.confidenceScore}% Confidence
                    </span>
                    <span className="text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed bg-gray-50/80 p-3 rounded-xl border border-gray-100 mt-2">
                  <strong>Treatment:</strong> {item.treatment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account Details Card */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">Account Details</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-6 py-4 font-medium text-gray-500">Full Name</td>
              <td className="px-6 py-4 text-gray-900 font-semibold">{user?.name}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-gray-500">Email</td>
              <td className="px-6 py-4 text-gray-900">{user?.email}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-gray-500">Role</td>
              <td className="px-6 py-4 text-gray-900 capitalize">{user?.role || 'farmer'}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-gray-500">Preferred Language</td>
              <td className="px-6 py-4 text-gray-900">{user?.preferredLanguage === 'om' ? 'Afaan Oromoo' : user?.preferredLanguage === 'am' ? 'አማርኛ (Amharic)' : 'English'}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-gray-500">Account ID</td>
              <td className="px-6 py-4 text-gray-400 text-xs font-mono">{user?._id}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
