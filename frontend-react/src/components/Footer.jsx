import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-white text-xl font-black flex items-center space-x-2">
              <span>🌱</span>
              <span>Oomisha Beekaa</span>
            </Link>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Empowering farmers with AI-powered crop disease detection, weather forecasts, and real-time market prices.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/disease" className="hover:text-white transition">🔬 {t('Crop Disease Detection')}</Link></li>
              <li><Link to="/weather" className="hover:text-white transition">☀️ {t('Weather Forecast')}</Link></li>
              <li><Link to="/market" className="hover:text-white transition">📈 {t('Market Prices')}</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-white transition">{t('Login')}</Link></li>
              <li><Link to="/register" className="hover:text-white transition">{t('Register')}</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><span className="text-gray-500">Contact: oomishabeekaa@gmail.com</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {currentYear} Oomisha Beekaa. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Built with ❤️ for farmers</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
