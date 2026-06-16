import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Trophy, Star, Gift } from 'phosphor-react-native';
import { useI18n } from '../providers/I18nProvider';

const rewards = [
  { id: '1', title: 'First Investment', points: 100, completed: true },
  { id: '2', title: 'Complete Profile', points: 50, completed: true },
  { id: '3', title: 'Refer a Friend', points: 200, completed: false },
  { id: '4', title: 'First Bid', points: 150, completed: false },
];

export function RewardsScreen({ navigation }: any) {
  const { t } = useI18n();
  const totalPoints = rewards.filter((r) => r.completed).reduce((sum, r) => sum + r.points, 0);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} className="mr-3 rtl:ml-3 rtl:mr-0">
          <ArrowLeft size={24} weight="light" color="#374151" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('rewards')}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-4">
          {/* Points Summary */}
          <View className="bg-brand-500 rounded-2xl p-6 mb-6">
            <View className="flex-row items-center mb-2">
              <Trophy size={24} weight="light" color="#fff" />
              <Text className="text-white/80 text-sm ml-2 rtl:mr-2 rtl:ml-0">{t('your_points')}</Text>
            </View>
            <Text className="text-white text-4xl font-bold">{totalPoints}</Text>
            <Text className="text-white/60 text-sm mt-1">{t('keep_earning')}</Text>
          </View>

          {/* Rewards List */}
          <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">{t('available_rewards')}</Text>
          {rewards.map((reward) => (
            <View
              key={reward.id}
              className={`flex-row items-center rounded-2xl p-4 mb-3 ${
                reward.completed ? 'bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700' : 'bg-white dark:bg-gray-800 shadow-sm'
              }`}
            >
              <View
                className={`w-12 h-12 rounded-full items-center justify-center mr-3 rtl:ml-3 rtl:mr-0 ${
                  reward.completed ? 'bg-brand-500' : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                {reward.completed ? (
                  <Star size={20} weight="fill" color="#fff" />
                ) : (
                  <Gift size={20} weight="light" color="#9ca3af" />
                )}
              </View>
              <View className="flex-1">
                <Text className={`text-base font-semibold ${reward.completed ? 'text-brand-700 dark:text-brand-400' : 'text-gray-800 dark:text-gray-100'}`}>
                  {reward.title}
                </Text>
                <Text className={`text-sm ${reward.completed ? 'text-brand-600 dark:text-brand-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  {reward.points} {t('points')}
                </Text>
              </View>
              {reward.completed && (
                <View className="bg-brand-500 px-3 py-1 rounded-full">
                  <Text className="text-white text-xs font-medium">{t('earned')}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
