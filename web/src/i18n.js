import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationAR from './locales/ar.json'
import translationEN from './locales/en.json'
import translationFR from './locales/fr.json'

const resources = {
  ar: translationAR,
  en: translationEN,
  'en-US': translationEN,
  fr: translationFR,
  'fr-FR': translationFR,
}

i18n
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false }, // React already does escaping
    fallbackLng: 'en-US',
    resources: resources,
  })
export default i18n
