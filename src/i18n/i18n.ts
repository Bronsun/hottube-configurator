import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import plTranslation from './locales/pl.json';

// Get stored language or use browser default
const storedLang = localStorage.getItem('i18nextLng');
const defaultLang = storedLang || 'pl'; // Use English as default if no stored preference

// Initialize i18next
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      pl: {
        translation: plTranslation,
      },
    },
    lng: defaultLang, // Use the detected/stored language instead of forcing Polish
    fallbackLng: 'pl', // Use English as fallback language
    debug: process.env.NODE_ENV !== 'production',

    interpolation: {
      escapeValue: false, // React already safes from XSS
    },

    // Language detection options
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;