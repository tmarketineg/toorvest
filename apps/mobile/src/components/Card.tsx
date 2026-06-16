import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

export function Card({ children, onPress, className = '' }: CardProps) {
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className={`bg-white rounded-2xl p-4 shadow-sm ${className}`}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={`bg-white rounded-2xl p-4 shadow-sm ${className}`}>
      {children}
    </View>
  );
}
