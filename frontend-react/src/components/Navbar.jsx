import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-brandGreen text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-black text-2xl tracking-wide hover:opacity-95 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="text-2xl">🌱</span>
            <span>Oomisha Beekaa</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-2 items-center">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md font-medium text-sm transition ${isActive('/') ? 'bg-green-800 text-white shadow-inner' : 'hover:bg-green-700/60'}`}
            >
              {t('Home')}
            </Link>
            <Link 
              to="/disease" 
              className={`px-3 py-2 rounded-md font-medium text-sm transition ${isActive('/disease') ? 'bg-green-800 text-white shadow-inner' : 'hover:bg-green-700/60'}`}
            >
              🔬 {t('Crop Disease Detection')}
            </Link>
            <Link 
              to="/weather" 
              className={`px-3 py-2 rounded-md font-medium text-sm transition ${isActive('/weather') ? 'bg-green-800 text-white shadow-inner' : 'hover:bg-green-700/60'}`}
            >
              ☀️ {t('Weather Forecast')}
            </Link>
            <Link 
              to="/market" 
              className={`px-3 py-2 rounded-md font-medium text-sm transition ${isActive('/market') ? 'bg-green-800 text-white shadow-inner' : 'hover:bg-green-700/60'}`}
            >
              📈 {t('Market Prices')}
            </Link>
          </div>

          {/* Desktop Auth & Language Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Language Switcher */}
            <div className="flex bg-green-800/80 rounded-lg p-0.5 border border-green-600/40 mr-1">
              <button 
                onClick={() => changeLanguage('en')} 
                className={`text-xs px-2.5 py-1 rounded font-bold transition ${i18n.language === 'en' ? 'bg-white text-brandGreen shadow-sm' : 'text-green-100 hover:text-white'}`}
                title="English"
              >
                EN
              </button>
              <button 
                onClick={() => changeLanguage('om')} 
                className={`text-xs px-2.5 py-1 rounded font-bold transition ${i18n.language === 'om' ? 'bg-white text-brandGreen shadow-sm' : 'text-green-100 hover:text-white'}`}
                title="Afaan Oromoo"
              >
                OM
              </button>
              <button 
                onClick={() => changeLanguage('am')} 
                className={`text-xs px-2.5 py-1 rounded font-bold transition ${i18n.language === 'am' ? 'bg-white text-brandGreen shadow-sm' : 'text-green-100 hover:text-white'}`}
                title="አማርኛ (Amharic)"
              >
                AM
              </button>
            </div>

            <div className="h-6 w-px bg-green-600/60"></div>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-green-800/70 py-1 px-3 rounded-full border border-green-600/40">
                  <div className="w-7 h-7 rounded-full bg-white text-brandGreen flex items-center justify-center font-bold text-xs shadow-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-semibold text-white max-w-[120px] truncate">{user.name}</span>
                </div>
                <Link to="/dashboard" className="text-sm px-3 py-1.5 rounded-lg hover:bg-green-700/60 transition font-medium">{t('Dashboard')}</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm px-3 py-1.5 rounded-lg bg-yellow-500/90 hover:bg-yellow-400 text-gray-900 font-bold transition shadow-sm">{t('Admin Panel')}</Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="text-sm bg-red-600/90 hover:bg-red-700 text-white font-semibold px-3.5 py-1.5 rounded-lg shadow-sm transition"
                >
                  {t('Logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className={`text-sm font-semibold px-3.5 py-1.5 rounded-lg border border-white/80 hover:bg-white hover:text-brandGreen transition ${isActive('/login') ? 'bg-white text-brandGreen' : 'text-white'}`}
                >
                  {t('Login')}
                </Link>
                <Link 
                  to="/register" 
                  className={`text-sm font-bold px-4 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-gray-900 shadow-md transition transform active:scale-95 ${isActive('/register') ? 'ring-2 ring-white' : ''}`}
                >
                  {t('Register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Language Switcher for Mobile */}
            <div className="flex bg-green-800/80 rounded-lg p-0.5 border border-green-600/40">
              <button 
                onClick={() => changeLanguage('en')} 
                className={`text-xs px-2 py-0.5 rounded font-bold ${i18n.language === 'en' ? 'bg-white text-brandGreen' : 'text-green-100'}`}
              >
                EN
              </button>
              <button 
                onClick={() => changeLanguage('om')} 
                className={`text-xs px-2 py-0.5 rounded font-bold ${i18n.language === 'om' ? 'bg-white text-brandGreen' : 'text-green-100'}`}
              >
                OM
              </button>
              <button 
                onClick={() => changeLanguage('am')} 
                className={`text-xs px-2 py-0.5 rounded font-bold ${i18n.language === 'am' ? 'bg-white text-brandGreen' : 'text-green-100'}`}
              >
                AM
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-green-800 hover:bg-green-700 focus:outline-none transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-green-900 border-t border-green-700/60 px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md font-medium ${isActive('/') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-800/60'}`}
          >
            {t('Home')}
          </Link>
          <Link 
            to="/disease" 
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md font-medium ${isActive('/disease') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-800/60'}`}
          >
            🔬 {t('Crop Disease Detection')}
          </Link>
          <Link 
            to="/weather" 
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md font-medium ${isActive('/weather') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-800/60'}`}
          >
            ☀️ {t('Weather Forecast')}
          </Link>
          <Link 
            to="/market" 
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md font-medium ${isActive('/market') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-800/60'}`}
          >
            📈 {t('Market Prices')}
          </Link>

          <div className="pt-3 border-t border-green-800 flex flex-col space-y-2">
            {user ? (
              <>
                <div className="flex items-center space-x-2 py-2 px-3 bg-green-800/60 rounded-lg">
                  <div className="w-7 h-7 rounded-full bg-white text-brandGreen flex items-center justify-center font-bold text-xs shadow-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-semibold truncate">{user.name}</span>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md font-medium ${isActive('/dashboard') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-800/60'}`}
                >
                  📊 {t('Dashboard')}
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md font-bold bg-yellow-500/90 hover:bg-yellow-400 text-gray-900 shadow-sm"
                  >
                    ⚙️ {t('Admin Panel')}
                  </Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg shadow transition"
                >
                  {t('Logout')}
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center border border-white text-white font-semibold py-2 rounded-lg hover:bg-white hover:text-brandGreen transition"
                >
                  {t('Login')}
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center bg-yellow-400 text-gray-900 font-bold py-2 rounded-lg hover:bg-yellow-300 shadow transition"
                >
                  {t('Register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
