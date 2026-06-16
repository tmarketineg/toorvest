import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { PaperPlaneTilt } from 'phosphor-react-native';
import { MessageBubble } from './MessageBubble';
import { sofiaService } from '../services/sofia';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface SofiaChatProps {
  onOpenFullChat?: () => void;
}

export function SofiaChat({ onOpenFullChat }: SofiaChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Sofia, your investment assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const { data } = await sofiaService.sendMessage(input.trim());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <MessageBubble
            message={item.text}
            isUser={item.isUser}
            timestamp={item.timestamp}
          />
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      {isTyping && (
        <View className="px-4 pb-2">
          <View className="bg-gray-100 self-start rounded-2xl px-4 py-2">
            <Text className="text-gray-400 text-sm">Sofia is typing...</Text>
          </View>
        </View>
      )}
      <View className="flex-row items-center px-4 py-3 border-t border-gray-100 bg-white">
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-base"
          placeholder="Type a message..."
          placeholderTextColor="#9ca3af"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity
          onPress={sendMessage}
          activeOpacity={0.7}
          className="ml-2 w-10 h-10 rounded-full bg-brand-500 items-center justify-center"
        >
          <PaperPlaneTilt size={18} weight="light" color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
