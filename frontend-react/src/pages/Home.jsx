import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-green-100/60 to-transparent py-14 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-green-200/60 text-brandGreen text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <span>🌾 Smart Agriculture Platform</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            {t('Welcome to Oomisha Beekaa')}
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Empowering farmers with AI-driven crop disease detection, localized real-time weather forecasts, and up-to-date market prices.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {user ? (
              <>
                <Link
                  to="/disease"
                  className="bg-brandGreen hover:bg-green-800 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition transform active:scale-95 flex items-center space-x-2"
                >
                  <span>🔬</span>
                  <span>Diagnose a Crop</span>
                </Link>
                <Link
                  to="/market"
                  className="bg-white border-2 border-brandGreen text-brandGreen hover:bg-green-50 font-bold px-6 py-3 rounded-xl shadow-sm transition flex items-center space-x-2"
                >
                  <span>📈</span>
                  <span>Check Market Prices</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-brandGreen hover:bg-green-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-95 flex items-center space-x-2 text-base"
                >
                  <span>✨</span>
                  <span>{t('Register')} & {t('Get Started')}</span>
                </Link>
                <Link
                  to="/login"
                  className="bg-white border-2 border-gray-300 hover:border-brandGreen text-gray-800 hover:text-brandGreen font-bold px-8 py-3.5 rounded-xl shadow-sm transition text-base"
                >
                  {t('Login')}
                </Link>
              </>
            )}
          </div>

          {user && (
            <p className="text-sm text-gray-500 mt-2">
              Signed in as <span className="font-semibold text-brandGreen">{user.name}</span> ({user.role || 'farmer'})
            </p>
          )}
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-6xl w-full px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Core Agricultural Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Disease Detection */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between">
            <div className="p-7">
              <div className="w-12 h-12 bg-green-100 text-brandGreen rounded-xl flex items-center justify-center text-2xl mb-4">
                🔬
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('Crop Disease Detection')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Upload a photo or describe symptoms. Our multimodal AI model analyzes your crop within seconds and recommends treatment.
              </p>
            </div>
            <div className="px-7 pb-6">
              <Link
                to="/disease"
                className="w-full block text-center bg-brandGreen hover:bg-green-800 text-white font-semibold py-2.5 rounded-xl transition shadow-sm"
              >
                Scan Crop Now →
              </Link>
            </div>
          </div>

          {/* Card 2: Weather Forecast */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between">
            <div className="p-7">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-4">
                ☀️
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('Weather Forecast')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Check hyper-local temperature, rainfall probabilities, humidity, and wind speed to schedule planting, spraying, and harvesting.
              </p>
            </div>
            <div className="px-7 pb-6">
              <Link
                to="/weather"
                className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition shadow-sm"
              >
                View Weather →
              </Link>
            </div>
          </div>

          {/* Card 3: Market Prices */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between">
            <div className="p-7">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center text-2xl mb-4">
                📈
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('Market Prices')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Live prices for Teff, Wheat, Maize, Coffee, and more across major markets. Real-time cloud data stored directly on MongoDB Atlas.
              </p>
            </div>
            <div className="px-7 pb-6">
              <Link
                to="/market"
                className="w-full block text-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2.5 rounded-xl transition shadow-sm"
              >
                Explore Market Rates →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Home;
