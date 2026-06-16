import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Inbox } from 'phosphor-react-native';
import { useI18n } from '../providers/I18nProvider';
import { BidCard } from '../components/BidCard';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { EmptyState } from '../components/EmptyState';
import { bidsService } from '../services/bids';

export function CompanyDashboardScreen({ route, navigation }: any) {
  const { companyId, companyName } = route.params;
  const { t } = useI18n();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await bidsService.getInbox();
        setBids(res.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch bids');
      } finally {
        setLoading(false);
      }
    };
    fetchBids();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} className="mr-3 rtl:ml-3 rtl:mr-0">
          <ArrowLeft size={24} weight="light" color="#374151" />
        </TouchableOpacity>
        <View>
          <Text className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('bid_inbox')}</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">{companyName}</Text>
        </View>
      </View>

      {loading ? (
        <View className="p-4">
          <LoadingSkeleton count={3} height={120} borderRadius={16} />
        </View>
      ) : (
        <FlatList
          data={bids}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <EmptyState title={t('no_bids_yet')} message={t('bids_appear_here')} />
          }
          renderItem={({ item }) => (
            <BidCard
              title={item.title}
              companyName={item.client?.fullName}
              budget={item.budget}
              deadline={item.deadline}
              status={item.status}
              onPress={() => navigation.navigate('BidDetail', { bidId: item.id })}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
