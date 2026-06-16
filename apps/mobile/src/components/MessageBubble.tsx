import React from 'react';
import { View, Text } from 'react-native';

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

export function MessageBubble({ message, isUser, timestamp }: MessageBubbleProps) {
  return (
    <View
      className={`max-w-[80%] mb-3 ${isUser ? 'self-end' : 'self-start'}`}
    >
      <View
        className={`rounded-2xl px-4 py-3 ${
          isUser ? 'bg-brand-500 rounded-tr-sm' : 'bg-gray-100 rounded-tl-sm'
        }`}
      >
        <Text className={`text-base ${isUser ? 'text-white' : 'text-gray-800'}`}>
          {message}
        </Text>
      </View>
      {timestamp && (
        <Text className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {timestamp}
        </Text>
      )}
    </View>
  );
}
