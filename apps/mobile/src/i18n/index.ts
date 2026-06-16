import { I18nManager } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import en from './en.json';
import ar from './ar.json';

export type Language = 'en' | 'ar';

const translations: Record<Language, Record<string, string>> = { en, ar };

let currentLanguage: Language = 'en';

export const setLanguage = async (lang: Language) => {
  currentLanguage = lang;
  await SecureStore.setItemAsync('language', lang);
  const isArabic = lang === 'ar';
  if (I18nManager.isRTL !== isArabic) {
    I18nManager.forceRTL(isArabic);
  }
};

export const getLanguage = async (): Promise<Language> => {
  const stored = await SecureStore.getItemAsync('language');
  if (stored === 'ar' || stored === 'en') {
    currentLanguage = stored;
    return stored;
  }
  return 'en';
};

export const t = (key: string): string => {
  return translations[currentLanguage]?.[key] ?? translations.en[key] ?? key;
};

export const isCurrentRTL = () => I18nManager.isRTL;
