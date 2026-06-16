import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { lightColors, darkColors } from '../theme/colors';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: 'light' | 'dark';
  themeMode: Theme;
  setThemeMode: (mode: Theme) => void;
  colors: typeof lightColors;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  themeMode: 'system',
  setThemeMode: () => {},
  colors: lightColors,
});

export const useThemeContext = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColor = useColorScheme();
  const [themeMode, setThemeModeState] = useState<Theme>('system');

  useEffect(() => {
    SecureStore.getItemAsync('theme').then((stored) => {
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setThemeModeState(stored);
      }
    });
  }, []);

  const setThemeMode = async (mode: Theme) => {
    setThemeModeState(mode);
    await SecureStore.setItemAsync('theme', mode);
  };

  const resolvedTheme = themeMode === 'system' ? (systemColor ?? 'light') : themeMode;
  const colors = resolvedTheme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, themeMode, setThemeMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}
