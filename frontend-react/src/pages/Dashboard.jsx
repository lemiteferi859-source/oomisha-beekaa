import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

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
