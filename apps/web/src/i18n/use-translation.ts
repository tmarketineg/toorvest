'use client';

import { useLocale, type Locale } from '@/lib/use-locale';
import translations, { type Translation } from '@/i18n';

type NestedValue = string | { [key: string]: NestedValue };

function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? path;
}

export function useTranslation() {
  const { locale } = useLocale();

  const t = (key: string): string => {
    const dict = translations[locale] as Record<string, any>;
    return getNestedValue(dict, key);
  };

  const tExists = (key: string): boolean => {
    const dict = translations[locale] as Record<string, any>;
    const val = getNestedValue(dict, key);
    return val !== key;
  };

  return { t, tExists, locale };
}
