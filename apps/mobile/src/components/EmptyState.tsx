import React from 'react';
import { View, Text } from 'react-native';
import { FolderOpen } from 'phosphor-react-native';

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, message, icon }: EmptyStateProps) {
  return (
    <View className="flex-1 justify-center items-center py-12 px-6">
      {icon || <FolderOpen size={48} weight="light" color="#d1d5db" />}
      <Text className="text-lg font-semibold text-gray-600 mt-4 text-center">{title}</Text>
      {message && (
        <Text className="text-sm text-gray-400 mt-2 text-center">{message}</Text>
      )}
    </View>
  );
}
