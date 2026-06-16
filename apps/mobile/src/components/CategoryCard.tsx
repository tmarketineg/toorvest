import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface CategoryCardProps {
  label: string;
  isActive?: boolean;
  onPress: () => void;
}

export function CategoryCard({ label, isActive = false, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`px-4 py-2 rounded-full mr-2 ${
        isActive ? 'bg-brand-500' : 'bg-gray-100'
      }`}
    >
      <Text className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
