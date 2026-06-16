import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Globe, Moon, Bell } from 'phosphor-react-native';
import { useI18n } from '../providers/I18nProvider';
import { useThemeContext } from '../providers/ThemeProvider';

export function SettingsScreen({ navigation }: any) {
  const { t, language, setLanguage } = useI18n();
  const { themeMode, setThemeMode } = useThemeContext();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} className="mr-3 rtl:ml-3 rtl:mr-0">
          <ArrowLeft size={24} weight="light" color="#374151" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('settings')}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-4">
          {/* Language */}
          <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center mb-4">
              <Globe size={20} weight="light" color="#22c55e" />
              <Text className="text-base font-semibold text-gray-800 dark:text-gray-100 ml-3 rtl:mr-3 rtl:ml-0">{t('language')}</Text>
            </View>
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setLanguage('en')}
                activeOpacity={0.7}
                className={`flex-1 py-3 rounded-xl items-center ${
                  language === 'en' ? 'bg-brand-500' : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <Text className={`font-medium ${language === 'en' ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                  {t('english')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLanguage('ar')}
                activeOpacity={0.7}
                className={`flex-1 py-3 rounded-xl items-center ${
                  language === 'ar' ? 'bg-brand-500' : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <Text className={`font-medium ${language === 'ar' ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                  {t('arabic')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dark Mode */}
          <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Moon size={20} weight="light" color="#22c55e" />
                <Text className="text-base font-semibold text-gray-800 dark:text-gray-100 ml-3 rtl:mr-3 rtl:ml-0">{t('dark_mode')}</Text>
              </View>
              <Switch
                value={themeMode === 'dark'}
                onValueChange={(value) => setThemeMode(value ? 'dark' : 'light')}
                trackColor={{ false: '#d1d5db', true: '#86efac' }}
                thumbColor={themeMode === 'dark' ? '#22c55e' : '#f3f4f6'}
              />
            </View>
          </View>

          {/* Notifications */}
          <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Bell size={20} weight="light" color="#22c55e" />
                <Text className="text-base font-semibold text-gray-800 dark:text-gray-100 ml-3 rtl:mr-3 rtl:ml-0">{t('notifications')}</Text>
              </View>
              <Switch
                value={true}
                onValueChange={() => {}}
                trackColor={{ false: '#d1d5db', true: '#86efac' }}
                thumbColor="#22c55e"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
