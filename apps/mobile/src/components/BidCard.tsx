import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Badge } from './Badge';
import { Clock } from 'phosphor-react-native';

interface BidCardProps {
  title: string;
  companyName: string;
  budget: string;
  deadline: string;
  status: 'pending' | 'accepted' | 'rejected';
  onPress: () => void;
}

export function BidCard({ title, companyName, budget, deadline, status, onPress }: BidCardProps) {
  const statusVariant = {
    pending: 'warning' as const,
    accepted: 'success' as const,
    rejected: 'error' as const,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-white rounded-2xl p-4 mb-3 shadow-sm"
    >
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-base font-semibold text-gray-800 flex-1" numberOfLines={1}>
          {title}
        </Text>
        <Badge label={status} variant={statusVariant[status]} />
      </View>
      <Text className="text-sm text-gray-500 mb-2">{companyName}</Text>
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold text-brand-600">{budget}</Text>
        <View className="flex-row items-center">
          <Clock size={14} weight="light" color="#9ca3af" />
          <Text className="text-xs text-gray-400 ml-1">{deadline}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
