import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { Badge } from './Badge';

interface CompanyCardProps {
  name: string;
  category: string;
  logo?: string;
  description?: string;
  onPress: () => void;
}

export function CompanyCard({ name, category, logo, description, onPress }: CompanyCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-white rounded-2xl p-4 mb-3 shadow-sm"
    >
      <View className="flex-row items-center">
        {logo ? (
          <Image source={{ uri: logo }} className="w-12 h-12 rounded-xl" resizeMode="cover" />
        ) : (
          <View className="w-12 h-12 rounded-xl bg-brand-100 items-center justify-center">
            <Text className="text-brand-600 font-bold text-lg">{name[0]}</Text>
          </View>
        )}
        <View className="flex-1 ml-3">
          <Text className="text-base font-semibold text-gray-800">{name}</Text>
          <Text className="text-sm text-gray-500 mt-0.5">{category}</Text>
        </View>
        <Badge label="View" variant="info" />
      </View>
      {description && (
        <Text className="text-sm text-gray-500 mt-3" numberOfLines={2}>
          {description}
        </Text>
      )}
    </TouchableOpacity>
  );
}
