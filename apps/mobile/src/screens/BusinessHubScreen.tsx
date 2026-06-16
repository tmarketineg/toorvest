import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useI18n } from '../providers/I18nProvider';
import { SearchBox } from '../components/SearchBox';
import { ArticleCard } from '../components/ArticleCard';
import { CategoryCard } from '../components/CategoryCard';
import { CompanyCard } from '../components/CompanyCard';
import { StartBidFAB } from '../components/StartBidFAB';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { EmptyState } from '../components/EmptyState';
import { useDebounce } from '../hooks/useDebounce';
import { companiesService } from '../services/companies';

const categories = ['All', 'Technology', 'Construction', 'Energy', 'Finance', 'Healthcare'];

export function BusinessHubScreen({ navigation }: any) {
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await companiesService.getAll();
      setCompanies(res.data || []);
    } catch (e: any) {
      setError(e.message || 'Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  const filtered = companies.filter((c: any) => {
    const name = c.companyName || c.name || '';
    const matchesSearch = name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const cat = c.serviceCategories?.[0] || 'General';
    const matchesCategory = activeCategory === 'All' || cat === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-4">
          <Text className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t('business_hub')}</Text>
          <SearchBox value={search} onChangeText={setSearch} placeholder={t('search')} />
        </View>

        {/* Articles */}
        <View className="px-4 mt-6">
          <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">{t('articles')}</Text>
          <ArticleCard
            title={t('business_trends')}
            excerpt={t('business_trends_desc')}
            imageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
            category="Trends"
          />
        </View>

        {/* Categories */}
        <View className="mt-6">
          <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 px-4 mb-3">{t('categories')}</Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <CategoryCard
                label={item}
                isActive={activeCategory === item}
                onPress={() => setActiveCategory(item)}
              />
            )}
          />
        </View>

        {/* Companies */}
        <View className="px-4 mt-6 mb-20">
          <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Companies</Text>
          {loading ? (
            <LoadingSkeleton count={3} height={100} borderRadius={16} />
          ) : error ? (
            <View className="bg-red-50 p-4 rounded-xl">
              <Text className="text-red-600 text-center">{error}</Text>
            </View>
          ) : filtered.length === 0 ? (
            <EmptyState title={t('no_results')} message="Try a different search or category" />
          ) : (
            filtered.map((company: any) => (
              <CompanyCard
                key={company.id}
                name={company.companyName || company.name}
                category={company.serviceCategories?.[0] || 'General'}
                description={company.description || ''}
                onPress={() =>
                  navigation.navigate('CompanyDashboard', { companyId: company.id, companyName: company.companyName || company.name })
                }
              />
            ))
          )}
        </View>
      </ScrollView>

      <StartBidFAB onPress={() => navigation.navigate('BidForm')} />
    </SafeAreaView>
  );
}
