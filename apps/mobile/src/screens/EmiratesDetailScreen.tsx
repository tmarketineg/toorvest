import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Star, Sun } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { useI18n } from '../providers/I18nProvider';

const highlights = [
  { id: '1', title: 'Louvre Abu Dhabi', description: 'World-class museum and cultural center', rating: 4.8 },
  { id: '2', title: 'Sheikh Zayed Mosque', description: 'Stunning architectural masterpiece', rating: 4.9 },
  { id: '3', title: 'Saadiyat Island', description: 'Cultural and tourism hub', rating: 4.7 },
];

export function EmiratesDetailScreen({ route, navigation }: any) {
  const { emirateId, emirateName } = route.params;
  const { t } = useI18n();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} className="mr-3 rtl:ml-3 rtl:mr-0">
          <ArrowLeft size={24} weight="light" color="#374151" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-800 dark:text-gray-100">{emirateName}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800' }}
          className="w-full h-56"
          resizeMode="cover"
        />

        <View className="px-4 pt-4">
          <View className="flex-row items-center mb-4">
            <MapPin size={18} weight="light" color="#22c55e" />
            <Text className="text-gray-600 dark:text-gray-400 ml-2 rtl:mr-2 rtl:ml-0">{emirateName}, UAE</Text>
          </View>

          <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">{t('tourism_highlights')}</Text>

          {highlights.map((item) => (
            <View key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-3 shadow-sm">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-base font-semibold text-gray-800 dark:text-gray-100">{item.title}</Text>
                <View className="flex-row items-center">
                  <Star size={14} weight="fill" color="#f59e0b" />
                  <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1 rtl:mr-1 rtl:ml-0">{item.rating}</Text>
                </View>
              </View>
              <Text className="text-sm text-gray-500 dark:text-gray-400">{item.description}</Text>
            </View>
          ))}

          <View className="bg-brand-50 dark:bg-brand-900/30 rounded-2xl p-4 mb-8 mt-4">
            <View className="flex-row items-center mb-2">
              <Sun size={20} weight="light" color="#22c55e" />
              <Text className="text-base font-semibold text-gray-800 dark:text-gray-100 ml-2 rtl:mr-2 rtl:ml-0">{t('climate')}</Text>
            </View>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              {t('climate_desc')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
