'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Locale = 'en' | 'ar';

const STORAGE_KEY = 'toorvest_locale';

function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'ar' || stored === 'en') return stored;
  return 'en';
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: 'ltr' | 'rtl';
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
  dir: 'ltr',
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getStoredLocale());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale, mounted]);

  const setLocale = useCallback((newLocale: Locale) => {
    localStorage.setItem(STORAGE_KEY, newLocale);
    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <LocaleContext.Provider value={{ locale, setLocale, dir }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
