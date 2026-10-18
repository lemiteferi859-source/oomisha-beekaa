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
      "Explore Features": "Explore Features",
      "Dashboard": "Dashboard",
      "Admin Panel": "Admin Panel",
      "About Us": "About Us",
      "Smart Agriculture Platform": "Smart Agriculture Platform",
      "Core Agricultural Tools": "Core Agricultural Tools",
      "Scan Crop Now": "Scan Crop Now",
      "View Weather": "View Weather",
      "Explore Market Rates": "Explore Market Rates"
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
      "Explore Features": "Tajaajiloota Ilaali",
      "Dashboard": "Daashboordii",
      "Admin Panel": "Paanaalii Bulchiinsaa",
      "About Us": "Waa'ee Keenya",
      "Smart Agriculture Platform": "Pilaatoofoorimii Qonna Ammayyaa",
      "Core Agricultural Tools": "Meeshaalee Qonnaa Ijoo",
      "Scan Crop Now": "Midhaan Qoradhu",
      "View Weather": "Haala Qilleensaa Ilaali",
      "Explore Market Rates": "Gatii Gabaa Ilaali"
    }
  },
  am: {
    translation: {
      "Welcome to Oomisha Beekaa": "እንኳን ወደ ኦሚሻ ቤካ በደህና መጡ",
      "Crop Disease Detection": "የሰብል በሽታ ምርመራ",
      "Weather Forecast": "የአየር ሁኔታ ትንበያ",
      "Market Prices": "የሰብል ገበያ ዋጋ",
      "Home": "መነሻ",
      "Login": "ግባ",
      "Register": "ተመዝገብ",
      "Logout": "ውጣ",
      "Get Started": "ጀምር",
      "Explore Features": "አገልግሎቶችን ይመልከቱ",
      "Dashboard": "ዳሽቦርድ",
      "Admin Panel": "አስተዳዳሪ ፓነል",
      "About Us": "ስለ እኛ",
      "Smart Agriculture Platform": "ዘመናዊ የግብርና መድረክ",
      "Core Agricultural Tools": "ዋና ዋና የግብርና መተግበሪያዎች",
      "Scan Crop Now": "ሰብልን አሁን ይመርምሩ",
      "View Weather": "የአየር ሁኔታን ይመልከቱ",
      "Explore Market Rates": "የገበያ ዋጋዎችን ይመልከቱ"
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
