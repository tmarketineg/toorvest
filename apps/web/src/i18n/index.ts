import en from './en';
import ar from './ar';

export type Translation = typeof en;
export type TranslationKey = keyof Translation;

const translations = { en, ar } as const;

export default translations;
