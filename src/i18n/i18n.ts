import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import translationEN from "./lang/en.json";
import translationES from "./lang/es.json";
import translationFR from "./lang/fr.json";
import Cookies from 'js-cookie';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: translationEN,
    },
    fr: {
        translation: translationFR,
    },
    es: {
        translation: translationES,
    },
};

const language = Cookies.get('language')

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: language ? Cookies.get('language') : 'en',
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;