import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Master Your Finances with AI Precision",
      "subtitle": "Personalized wealth management, tax optimization, and FIRE planning for the modern Indian investor.",
      "start": "Start Your Journey",
      "explore": "Explore Features",
      "features": "Features",
      "about": "About",
      "login": "Login"
    }
  },
  hi: {
    translation: {
      "welcome": "AI सटीकता के साथ अपने वित्त पर महारत हासिल करें",
      "subtitle": "आधुनिक भारतीय निवेशक के लिए व्यक्तिगत धन प्रबंधन, कर अनुकूलन और FIRE योजना।",
      "start": "अपनी यात्रा शुरू करें",
      "explore": "विशेषताओं का अन्वेषण करें",
      "features": "विशेषताएं",
      "about": "हमारे बारे में",
      "login": "लॉगिन"
    }
  }
  // Additional 20+ languages will be added as JSON files later
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
