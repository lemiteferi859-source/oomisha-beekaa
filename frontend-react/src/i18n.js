import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  en: {
    translation: {
      "Welcome to Oomisha Beekaa": "Welcome to Oomisha Beekaa",
      "Crop Disease Detection": "Crop Disease Detection",
      "Weather Forecast": "Weather Forecast",
      "Market Prices": "Market Prices",
      "Home": "Home",
      "Login": "Login",
      "Register": "Register",
      "Logout": "Logout",
      "Get Started": "Get Started",
      "Explore Features": "Explore Features"
    }
  },
  om: {
    translation: {
      "Welcome to Oomisha Beekaa": "Baga nagaan Oomisha Beekaa dhuftan",
      "Crop Disease Detection": "Dhukkuba Midhaanii Adda Baasuu",
      "Weather Forecast": "Raaga Haala Qilleensaa",
      "Market Prices": "Gatii Gabaa",
      "Home": "Mana",
      "Login": "Seeni",
      "Register": "Galmaa'i",
      "Logout": "Ba'i",
      "Get Started": "Jalqabi",
      "Explore Features": "Tajaajiloota Ilaali"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
