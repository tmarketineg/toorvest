import React from 'react';
import { View, Text } from 'react-native';
import { TrendUp, Globe, Users, ShieldCheck } from 'phosphor-react-native';

const reasons = [
  { icon: TrendUp, title: 'Investment Opportunities', description: 'Access curated investment projects' },
  { icon: Globe, title: 'Global Connections', description: 'Connect with businesses worldwide' },
  { icon: Users, title: 'Expert Network', description: 'Get guidance from industry experts' },
  { icon: ShieldCheck, title: 'Secure Platform', description: 'Your data is protected' },
];

export function WhyToorvest() {
  return (
    <View className="mb-8">
      <Text className="text-xl font-bold text-gray-800 mb-4">Why Toorvest?</Text>
      {reasons.map((reason, index) => {
        const Icon = reason.icon;
        return (
          <View key={index} className="flex-row items-center mb-4 bg-white rounded-2xl p-4 shadow-sm">
            <View className="w-12 h-12 rounded-full bg-brand-50 items-center justify-center mr-4">
              <Icon size={24} weight="light" color="#22c55e" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-800">{reason.title}</Text>
              <Text className="text-sm text-gray-500 mt-0.5">{reason.description}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
