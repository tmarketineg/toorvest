import React from 'react';
import { View, TextInput } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';

interface SearchBoxProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBox({ value, onChangeText, placeholder = 'Search...' }: SearchBoxProps) {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
      <MagnifyingGlass size={20} weight="light" color="#9ca3af" />
      <TextInput
        className="flex-1 ml-3 text-base text-gray-800"
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
