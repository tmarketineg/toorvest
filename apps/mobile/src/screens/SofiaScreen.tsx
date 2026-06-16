import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'phosphor-react-native';
import { SofiaChat } from '../components/SofiaChat';

export function SofiaScreen({ navigation }: any) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} className="mr-3">
          <ArrowLeft size={24} weight="light" color="#374151" />
        </TouchableOpacity>
        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-full bg-brand-500 items-center justify-center mr-2">
            <Text className="text-white text-sm font-bold">S</Text>
          </View>
          <View>
            <Text className="text-lg font-semibold text-gray-800">Sofia</Text>
            <Text className="text-xs text-green-500">Online</Text>
          </View>
        </View>
      </View>

      <SofiaChat />
    </SafeAreaView>
  );
}
