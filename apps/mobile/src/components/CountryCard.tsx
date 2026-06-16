import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { CaretRight } from 'phosphor-react-native';

interface CountryCardProps {
  name: string;
  flag: string;
  pavilionCount?: number;
  onPress: () => void;
}

export function CountryCard({ name, flag, pavilionCount, onPress }: CountryCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow-sm"
    >
      <Image source={{ uri: flag }} className="w-12 h-8 rounded" resizeMode="cover" />
      <View className="flex-1 ml-4">
        <Text className="text-base font-semibold text-gray-800">{name}</Text>
        {pavilionCount !== undefined && (
          <Text className="text-sm text-gray-500">{pavilionCount} pavilions</Text>
        )}
      </View>
      <CaretRight size={20} weight="light" color="#9ca3af" />
    </TouchableOpacity>
  );
}
