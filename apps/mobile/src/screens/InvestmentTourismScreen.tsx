import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useI18n } from '../providers/I18nProvider';
import { SearchBox } from '../components/SearchBox';
import { ArticleCard } from '../components/ArticleCard';
import { ProjectCard } from '../components/ProjectCard';
import { CategoryCard } from '../components/CategoryCard';
import { Button } from '../components/Button';
import { projectsService } from '../services/projects';
import { Building, Trees, Factory, Users, ChatCircleDots } from 'phosphor-react-native';

const { width } = Dimensions.get('window');

const heroSlides = [
  { id: '1', title: 'Investment Opportunities', subtitle: 'Discover high-return projects', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
  { id: '2', title: 'Tourism Ventures', subtitle: 'Explore tourism investments', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800' },
];

const categories = ['All', 'Real Estate', 'Agriculture', 'Industry', 'Technology'];

const sections = [
  { id: 'real-estate', title: 'Real Estate', icon: Building },
  { id: 'agriculture', title: 'Agriculture', icon: Trees },
  { id: 'industry', title: 'Industry', icon: Factory },
];

export function InvestmentTourismScreen({ navigation }: any) {
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showChat, setShowChat] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    projectsService.getAll()
      .then((res) => setProjects(res.data))
      .catch(() => setError('Failed to load projects'));
  }, []);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = (p.title || '').toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.sector === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        {/* Hero Carousel */}
        <FlatList
          data={heroSlides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ width }} className="h-48">
              <View className="flex-1 bg-brand-500 justify-center items-center px-6">
                <Text className="text-white text-xl font-bold text-center">{item.title}</Text>
                <Text className="text-white/80 text-sm text-center mt-2">{item.subtitle}</Text>
              </View>
            </View>
          )}
        />

        <View className="px-4 pt-4">
          <SearchBox value={search} onChangeText={setSearch} placeholder={t('search')} />

          {/* Articles */}
          <View className="mt-6">
            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">{t('articles')}</Text>
            <ArticleCard
              title={t('investment_guide_2024')}
              excerpt={t('investment_guide_2024_desc')}
              category="Guide"
            />
          </View>

          {/* Categories */}
          <View className="mt-6">
            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">{t('categories')}</Text>
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <CategoryCard
                  label={item}
                  isActive={activeCategory === item}
                  onPress={() => setActiveCategory(item)}
                />
              )}
            />
          </View>

          {/* Projects */}
          <View className="mt-6">
            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">{t('projects')}</Text>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                location={project.country?.name || ''}
                category={project.sector || ''}
                roi={project.budget ? `$${project.budget}` : ''}
                imageUrl={project.imageUrl || ''}
                onPress={() => console.log('View project:', project.id)}
              />
            ))}
          </View>

          {/* Section Cards */}
          <View className="mt-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <View key={section.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-3 shadow-sm">
                  <View className="flex-row items-center">
                    <View className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-900/30 items-center justify-center mr-3 rtl:ml-3 rtl:mr-0">
                      <Icon size={24} weight="light" color="#22c55e" />
                    </View>
                    <Text className="text-base font-semibold text-gray-800 dark:text-gray-100">{section.title}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Investors Hub */}
          <View className="mt-6 bg-brand-50 dark:bg-brand-900/30 rounded-2xl p-4">
            <View className="flex-row items-center mb-3">
              <Users size={24} weight="light" color="#22c55e" />
              <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 ml-3 rtl:mr-3 rtl:ml-0">{t('investors_hub')}</Text>
            </View>
            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {t('connect_investors')}
            </Text>
            <Button title={t('join_hub')} onPress={() => {}} size="sm" />
          </View>

          {/* Online Incubator */}
          <View className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-4">
            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{t('online_incubator')}</Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {t('access_mentorship')}
            </Text>
            <Button title={t('learn_more')} onPress={() => {}} variant="outline" size="sm" />
          </View>

          {/* Expert Directory */}
          <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-8 shadow-sm">
            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{t('expert_directory')}</Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {t('find_experts')}
            </Text>
            <Button title={t('browse_experts')} onPress={() => {}} variant="outline" size="sm" />
          </View>
        </View>
      </ScrollView>

      {/* Sofia Chat FAB */}
      <View className="absolute bottom-6 right-6">
        <TouchableOpacity
          onPress={() => navigation.navigate('Sofia')}
          activeOpacity={0.8}
          className="bg-brand-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        >
          <ChatCircleDots size={24} weight="light" color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
