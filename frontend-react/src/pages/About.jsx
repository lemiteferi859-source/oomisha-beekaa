import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function About() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-4">About Oomisha Beekaa</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          An intelligent agricultural platform built to support and empower smallholder farmers with the latest technology.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-10">
        <h2 className="text-2xl font-bold text-brandGreen mb-3">🎯 Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          <strong>Oomisha Beekaa</strong> (meaning "knowledge of the farm" in Afaan Oromoo) is dedicated to bridging the technology gap in agriculture. 
          We provide farmers with accessible AI-powered crop diagnostics, real-time weather data, 
          and transparent market pricing — all available in their local language.
        </p>
      </div>

      {/* What We Offer */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-3xl mb-3">🔬</div>
          <h3 className="font-bold text-gray-900 mb-2">{t('Crop Disease Detection')}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Upload a photo of your crop or describe symptoms. Our Google Gemini AI model analyzes the problem 
            and provides a diagnosis with treatment recommendations — in seconds.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-3xl mb-3">☀️</div>
          <h3 className="font-bold text-gray-900 mb-2">{t('Weather Forecast')}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Get real-time weather conditions for any city or region. Know when to plant, irrigate, spray, 
            or harvest based on accurate weather data from OpenWeatherMap.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-3xl mb-3">📈</div>
          <h3 className="font-bold text-gray-900 mb-2">{t('Market Prices')}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Access the latest market prices for crops like Teff, Wheat, Coffee, and Maize 
            across major Ethiopian markets. Make informed decisions to maximize your profit.
          </p>
        </div>
      </div>

      {/* Technology */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🛠️ Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="font-bold text-gray-800">React.js</p>
            <p className="text-gray-500 text-xs">Frontend UI</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="font-bold text-gray-800">Node.js + Express</p>
            <p className="text-gray-500 text-xs">Backend APIs</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="font-bold text-gray-800">MongoDB Atlas</p>
            <p className="text-gray-500 text-xs">Cloud Database</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="font-bold text-gray-800">Gemini AI</p>
            <p className="text-gray-500 text-xs">Disease Detection</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="font-bold text-gray-800">Tailwind CSS</p>
            <p className="text-gray-500 text-xs">Responsive Styling</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="font-bold text-gray-800">OpenWeatherMap</p>
            <p className="text-gray-500 text-xs">Weather Data</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="font-bold text-gray-800">JWT Auth</p>
            <p className="text-gray-500 text-xs">Security</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="font-bold text-gray-800">react-i18next</p>
            <p className="text-gray-500 text-xs">Local Language</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Ready to get started?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="bg-brandGreen hover:bg-green-800 text-white font-bold px-8 py-3 rounded-xl shadow-md transition"
          >
            Create Free Account
          </Link>
          <Link
            to="/"
            className="bg-white border-2 border-gray-300 hover:border-brandGreen text-gray-800 font-bold px-8 py-3 rounded-xl transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
