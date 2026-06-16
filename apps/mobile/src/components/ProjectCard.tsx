import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { MapPin } from 'phosphor-react-native';

interface ProjectCardProps {
  title: string;
  location: string;
  imageUrl?: string;
  category: string;
  roi?: string;
  onPress: () => void;
}

export function ProjectCard({ title, location, imageUrl, category, roi, onPress }: ProjectCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-white rounded-2xl overflow-hidden shadow-sm mb-3"
    >
      {imageUrl && (
        <Image source={{ uri: imageUrl }} className="w-full h-36" resizeMode="cover" />
      )}
      <View className="p-4">
        <Text className="text-xs font-semibold text-brand-500 uppercase mb-1">{category}</Text>
        <Text className="text-base font-semibold text-gray-800 mb-1">{title}</Text>
        <View className="flex-row items-center mb-2">
          <MapPin size={14} weight="light" color="#9ca3af" />
          <Text className="text-sm text-gray-500 ml-1">{location}</Text>
        </View>
        {roi && (
          <Text className="text-sm font-semibold text-brand-600">ROI: {roi}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
