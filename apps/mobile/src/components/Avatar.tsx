import React from 'react';
import { View, Text, Image } from 'react-native';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ uri, name, size = 'md' }: AvatarProps) {
  const sizes = { sm: 32, md: 48, lg: 64 };
  const textSizes = { sm: 'text-xs', md: 'text-base', lg: 'text-xl' };
  const s = sizes[size];

  if (uri) {
    return <Image source={{ uri }} style={{ width: s, height: s, borderRadius: s / 2 }} />;
  }

  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View
      style={{ width: s, height: s, borderRadius: s / 2 }}
      className="bg-brand-500 items-center justify-center"
    >
      <Text className={`text-white font-semibold ${textSizes[size]}`}>{initials || '?'}</Text>
    </View>
  );
}
