import { I18nManager } from 'react-native';

export const isRTL = () => I18nManager.isRTL;

export const rtlStyle = (ltr: object, rtl: object) =>
  I18nManager.isRTL ? rtl : ltr;

export const rtlFlex = (direction: 'row' | 'row-reverse' = 'row') =>
  I18nManager.isRTL
    ? direction === 'row'
      ? { flexDirection: 'row-reverse' as const }
      : { flexDirection: 'row' as const }
    : { flexDirection: direction as const };

export const rtlTextAlign = () =>
  I18nManager.isRTL ? ('right' as const) : ('left' as const);

export const rtlMargin = (start: number, end: number = start) =>
  I18nManager.isRTL
    ? { marginRight: start, marginLeft: end }
    : { marginLeft: start, marginRight: end };

export const rtlPadding = (start: number, end: number = start) =>
  I18nManager.isRTL
    ? { paddingRight: start, paddingLeft: end }
    : { paddingLeft: start, paddingRight: end };
