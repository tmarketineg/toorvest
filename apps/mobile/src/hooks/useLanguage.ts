import { useState, useEffect } from 'react';
import { getLanguage, setLanguage as setLang, Language, t } from '../i18n';

export const useLanguage = () => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    getLanguage().then(setLanguageState);
  }, []);

  const changeLanguage = async (lang: Language) => {
    await setLang(lang);
    setLanguageState(lang);
  };

  return { language, changeLanguage, t, isRTL: language === 'ar' };
};
