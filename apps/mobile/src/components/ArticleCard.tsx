import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  imageUrl?: string;
  category?: string;
  onPress?: () => void;
}

export function ArticleCard({ title, excerpt, imageUrl, category, onPress }: ArticleCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="bg-white rounded-2xl overflow-hidden shadow-sm mb-4">
      {imageUrl && (
        <Image source={{ uri: imageUrl }} className="w-full h-40" resizeMode="cover" />
      )}
      <View className="p-4">
        {category && (
          <Text className="text-xs font-semibold text-brand-500 mb-1 uppercase">{category}</Text>
        )}
        <Text className="text-lg font-semibold text-gray-800 mb-1">{title}</Text>
        <Text className="text-sm text-gray-500" numberOfLines={2}>
          {excerpt}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
