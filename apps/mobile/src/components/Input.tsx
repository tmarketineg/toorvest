import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({ label, error, leftIcon, rightIcon, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View className="mb-4">
      {label && <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</Text>}
      <View
        className={`flex-row items-center border rounded-xl px-4 py-3 ${
          focused ? 'border-brand-500' : error ? 'border-red-400' : 'border-gray-200 dark:border-gray-600'
        } bg-white dark:bg-gray-800`}
      >
        {leftIcon && <View className="mr-3">{leftIcon}</View>}
        <TextInput
          className="flex-1 text-base text-gray-800 dark:text-gray-100"
          placeholderTextColor="#9ca3af"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {rightIcon && <View className="ml-3">{rightIcon}</View>}
      </View>
      {error && <Text className="text-xs text-red-500 mt-1">{error}</Text>}
    </View>
  );
}
