import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { View } from 'react-native';

export function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
        <LoadingSkeleton width={48} height={48} borderRadius={24} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
