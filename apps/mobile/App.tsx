import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/providers/AuthProvider';
import { ThemeProvider } from './src/providers/ThemeProvider';
import { I18nProvider } from './src/providers/I18nProvider';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <I18nProvider>
          <AuthProvider>
            <RootNavigator />
            <StatusBar style="auto" />
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
