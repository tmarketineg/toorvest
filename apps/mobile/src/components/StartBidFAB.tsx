import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Plus } from 'phosphor-react-native';

interface StartBidFABProps {
  onPress: () => void;
}

export function StartBidFAB({ onPress }: StartBidFABProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="absolute bottom-6 right-6 bg-brand-500 flex-row items-center px-5 py-3 rounded-full shadow-lg"
    >
      <Plus size={20} weight="light" color="#fff" />
      <Text className="text-white font-semibold ml-2">Start Bid</Text>
    </TouchableOpacity>
  );
}
