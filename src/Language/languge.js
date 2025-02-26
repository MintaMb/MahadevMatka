import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ar from './ar.json';
import sp from './sp.json';

import purtuguese from './purtuguese.json'

import { useTranslation } from 'react-i18next';
import { NativeModules } from 'react-native';
import i18next from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const resources = {
  en: {
    translation: en,
  },
  purtuguese: {
    translation: purtuguese
  },
  sp: {
    translation: sp
  },

};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'ar',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});
const langague_change = async (value) => {
  AsyncStorage.setItem("language", value)
  // const {i18n} = useTranslation();  
  i18n.changeLanguage(value);
  // NativeModules.DevSettings.reload();
  // console.log(value);
}



const lang = (value) => {
  const { t } = useTranslation();
  return t(value);
}
export { lang, langague_change };
