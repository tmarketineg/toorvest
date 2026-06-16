import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useI18n } from '../providers/I18nProvider';
import { useAuth } from '../hooks/useAuth';
import { Avatar } from '../components/Avatar';
import { CaretRight, Gear, Trophy, SignOut } from 'phosphor-react-native';

export function ProfileScreen({ navigation }: any) {
  const { t } = useI18n();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      icon: Gear,
      label: t('settings'),
      onPress: () => navigation.navigate('Settings'),
    },
    {
      icon: Trophy,
      label: t('rewards'),
      onPress: () => navigation.navigate('Rewards'),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-4">
          <Text className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">{t('profile')}</Text>

          {/* User Info */}
          <View className="flex-row items-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-6">
            <Avatar name={user?.fullName} size="lg" />
            <View className="ml-4 rtl:mr-4 rtl:ml-0">
              <Text className="text-lg font-semibold text-gray-800 dark:text-gray-100">{user?.fullName || 'Guest'}</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">{user?.email || ''}</Text>
            </View>
          </View>

          {/* Menu */}
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={index}
                onPress={item.onPress}
                activeOpacity={0.7}
                className="flex-row items-center justify-between bg-white dark:bg-gray-800 rounded-2xl p-4 mb-3 shadow-sm"
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/30 items-center justify-center mr-3 rtl:ml-3 rtl:mr-0">
                    <Icon size={20} weight="light" color="#22c55e" />
                  </View>
                  <Text className="text-base text-gray-800 dark:text-gray-100">{item.label}</Text>
                </View>
                <CaretRight size={18} weight="light" color="#9ca3af" />
              </TouchableOpacity>
            );
          })}

          {/* Logout */}
          <TouchableOpacity
            onPress={logout}
            activeOpacity={0.7}
            className="flex-row items-center bg-red-50 dark:bg-red-900/30 rounded-2xl p-4 mt-4"
          >
            <View className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-800/50 items-center justify-center mr-3 rtl:ml-3 rtl:mr-0">
              <SignOut size={20} weight="light" color="#ef4444" />
            </View>
            <Text className="text-base text-red-500 dark:text-red-400 font-medium">{t('logout')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
