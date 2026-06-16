import en from './en.json';
import ar from './ar.json';

export type Locale = 'en' | 'ar';
export type TranslationKey = keyof typeof en;

const translations: Record<Locale, typeof en> = { en, ar };

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

export { en, ar };
