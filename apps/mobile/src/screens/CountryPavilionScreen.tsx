import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Lightbulb, MapPin, Phone } from 'phosphor-react-native';
import { useI18n } from '../providers/I18nProvider';
import { SearchBox } from '../components/SearchBox';
import { ArticleCard } from '../components/ArticleCard';
import { TipsInterstitial } from '../components/TipsInterstitial';
import { useDebounce } from '../hooks/useDebounce';
import { countriesService } from '../services/countries';
import { api } from '../services/api';

const tourismItems = [
  { id: '1', name: 'Historic Sites', icon: '🏛️' },
  { id: '2', name: 'Beaches', icon: '🏖️' },
  { id: '3', name: 'Mountains', icon: '⛰️' },
  { id: '4', name: 'Deserts', icon: '🏜️' },
];

export function CountryPavilionScreen({ route, navigation }: any) {
  const { countryId, countryName } = route?.params ?? {};
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [showTips, setShowTips] = useState(false);
  const [tipsViewed, setTipsViewed] = useState(false);
  const [emirates, setEmirates] = useState<any[]>([]);
  const [tips, setTips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!countryId) return;
    setLoading(true);
    Promise.all([
      countriesService.getEmirates(countryId),
      api.get(`/countries/${countryId}/tips`),
    ])
      .then(([emiratesRes, tipsRes]) => {
        setEmirates(emiratesRes.data?.data ?? emiratesRes.data ?? []);
        setTips(tipsRes.data?.data ?? tipsRes.data ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [countryId]);

  const handleTipsTrigger = () => {
    if (!tipsViewed) {
      setShowTips(true);
    }
  };

  const handleTipsClose = () => {
    setShowTips(false);
    setTipsViewed(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} className="mr-3 rtl:ml-3 rtl:mr-0">
          <ArrowLeft size={24} weight="light" color="#374151" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-800 dark:text-gray-100">{countryName}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-4">
          {loading ? (
            <View className="items-center justify-center py-12">
              <Text className="text-gray-500 dark:text-gray-400">{t('loading')}</Text>
            </View>
          ) : (
          <>
          <SearchBox
            value={search}
            onChangeText={setSearch}
            placeholder={`${t('search')} ${countryName}...`}
          />

          {/* Articles */}
          <View className="mt-6">
            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">{t('articles')}</Text>
            <ArticleCard
              title={t('investment_guide')}
              excerpt={t('investment_guide_desc')}
              imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
              category="Guide"
            />
          </View>

          {/* Tips Trigger */}
          <TouchableOpacity
            onPress={handleTipsTrigger}
            activeOpacity={0.7}
            className="flex-row items-center bg-brand-50 dark:bg-brand-900/30 rounded-2xl p-4 mt-4"
          >
            <View className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-800/50 items-center justify-center mr-3 rtl:ml-3 rtl:mr-0">
              <Lightbulb size={24} weight="light" color="#22c55e" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-800 dark:text-gray-100">{t('tips')}</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                {tipsViewed ? t('tips_viewed') : t('tap_tips')}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Tourism */}
          <View className="mt-6">
            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">{t('tourism')}</Text>
            <FlatList
              data={tourismItems}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="items-center mr-4 rtl:ml-4 rtl:mr-0">
                  <View className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-900/30 items-center justify-center mb-2">
                    <Text className="text-2xl">{item.icon}</Text>
                  </View>
                  <Text className="text-xs text-gray-600 dark:text-gray-400">{item.name}</Text>
                </View>
              )}
            />
          </View>

          {/* Emirates */}
          <View className="mt-6 mb-4">
            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">{t('emirates')}</Text>
            {emirates.map((emirate) => (
              <TouchableOpacity
                key={emirate.id}
                onPress={() =>
                  navigation.navigate('EmiratesDetail', {
                    emirateId: emirate.id,
                    emirateName: emirate.name,
                  })
                }
                activeOpacity={0.7}
                className="flex-row items-center bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm mb-3"
              >
                <Image source={{ uri: emirate.image }} className="w-20 h-20" resizeMode="cover" />
                <View className="flex-1 p-3">
                  <Text className="text-base font-semibold text-gray-800 dark:text-gray-100">{emirate.name}</Text>
                  <View className="flex-row items-center mt-1">
                    <MapPin size={14} weight="light" color="#9ca3af" />
                    <Text className="text-sm text-gray-500 dark:text-gray-400 ml-1 rtl:mr-1 rtl:ml-0">{t('view_details')}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Contact */}
          <View className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-8">
            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">{t('contact')}</Text>
            <View className="flex-row items-center mb-2">
              <Phone size={18} weight="light" color="#22c55e" />
              <Text className="text-gray-600 dark:text-gray-300 ml-2 rtl:mr-2 rtl:ml-0">+971 4 123 4567</Text>
            </View>
            <Text className="text-sm text-gray-500 dark:text-gray-400">contact@pavilion.com</Text>
          </View>
          )}
        </View>
      </ScrollView>

      <TipsInterstitial visible={showTips} onClose={handleTipsClose} tips={tips} />
    </SafeAreaView>
  );
}
