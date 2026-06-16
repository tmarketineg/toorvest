import React from 'react';
import { View, Text } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
}

export function Badge({ label, variant = 'info' }: BadgeProps) {
  const variants = {
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  };

  return (
    <View className={`px-2 py-1 rounded-full ${variants[variant]}`}>
      <Text className={`text-xs font-medium ${variants[variant].split(' ')[1]}`}>{label}</Text>
    </View>
  );
}
