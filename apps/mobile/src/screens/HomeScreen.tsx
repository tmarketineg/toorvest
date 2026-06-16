import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useI18n } from '../providers/I18nProvider';
import { HeroSlideshow } from '../components/HeroSlideshow';
import { WhyToorvest } from '../components/WhyToorvest';
import { HomeSectionList } from '../components/HomeSectionList';
import { LoadingSkeleton } from '../components/LoadingSkeleton';

const slides = [
  { id: '1', title: 'Welcome to Toorvest', subtitle: 'Your investment gateway', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
  { id: '2', title: 'Explore Countries', subtitle: 'Discover global opportunities', imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800' },
  { id: '3', title: 'Business Hub', subtitle: 'Connect with companies', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800' },
];

const sections = [
  {
    title: 'Explore',
    items: [
      { id: 'countries', label: 'Countries & Pavilions', route: 'PavilionsTab' },
      { id: 'business', label: 'Business Hub', route: 'BusinessTab' },
      { id: 'investment', label: 'Investment & Tourism', route: 'InvestmentTab' },
    ],
  },
  {
    title: 'Quick Actions',
    items: [
      { id: 'bid', label: 'Submit a Bid', route: 'BidForm' },
      { id: 'sofia', label: 'Ask Sofia', route: 'Sofia' },
      { id: 'rewards', label: 'View Rewards', route: 'Rewards' },
    ],
  },
];

export function HomeScreen({ navigation }: any) {
  const { t } = useI18n();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="px-4 pt-4">
          <LoadingSkeleton height={224} borderRadius={16} />
          <View className="mt-6">
            <LoadingSkeleton height={24} width="60%" />
            <LoadingSkeleton count={3} height={72} borderRadius={16} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#22c55e" />}
      >
        <View className="px-4 pt-4">
          <Text className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">{t('welcome')}</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('hero_subtitle')}</Text>

          <HeroSlideshow
            slides={slides}
            onSlidePress={(slide) => console.log('Slide pressed:', slide.id)}
          />

          <WhyToorvest />

          <HomeSectionList
            sections={sections}
            onItemPress={(item) => {
              if (item.route) {
                navigation.navigate(item.route);
              }
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
