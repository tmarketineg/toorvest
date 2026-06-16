import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18nManager } from 'react-native';
import { getLanguage, setLanguage as setLang, Language, t } from '../i18n';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType>({
  language: 'en',
  setLanguage: async () => {},
  t: (key) => key,
  isRTL: false,
});

export const useI18n = () => useContext(I18nContext);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    getLanguage().then((lang) => {
      setLanguageState(lang);
      const isArabic = lang === 'ar';
      if (I18nManager.isRTL !== isArabic) {
        I18nManager.forceRTL(isArabic);
      }
    });
  }, []);

  const setLanguage = async (lang: Language) => {
    await setLang(lang);
    setLanguageState(lang);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, isRTL: language === 'ar' }}>
      {children}
    </I18nContext.Provider>
  );
}
