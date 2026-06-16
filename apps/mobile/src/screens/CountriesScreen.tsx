import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useI18n } from '../providers/I18nProvider';
import { SearchBox } from '../components/SearchBox';
import { CountryCard } from '../components/CountryCard';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { EmptyState } from '../components/EmptyState';
import { countriesService } from '../services/countries';
import { useDebounce } from '../hooks/useDebounce';

export function CountriesScreen({ navigation }: any) {
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 300);

  const fetchCountries = async () => {
    try {
      const res = await countriesService.getAll();
      setCountries(res.data);
    } catch (e: any) {
      setError(e.message ?? 'Failed to load countries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCountries();
    setRefreshing(false);
  };

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="px-4 pt-4">
        <Text className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t('countries')}</Text>
        <SearchBox value={search} onChangeText={setSearch} placeholder={t('search')} />
      </View>

      {loading ? (
        <View className="px-4 mt-4">
          <LoadingSkeleton count={4} height={80} borderRadius={16} />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#22c55e" />}
          ListEmptyComponent={<EmptyState title={t('no_results')} message="Try a different search" />}
          renderItem={({ item }) => (
            <CountryCard
              name={item.name}
              flag={`https://flagcdn.com/w160/${item.code.toLowerCase()}.png`}
              pavilionCount={item.pavilionCount}
              onPress={() => navigation.navigate('CountryPavilion', { countryId: item.id, countryName: item.name })}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
