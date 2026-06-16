import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'phosphor-react-native';
import { useI18n } from '../providers/I18nProvider';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { bidsService } from '../services/bids';

export function BidFormScreen({ route, navigation }: any) {
  const { t } = useI18n();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title) {
      Alert.alert(t('error_occurred'), t('fill_all_fields'));
      return;
    }
    setLoading(true);
    try {
      await bidsService.submit({
        title,
        description: description || undefined,
        budgetMin: budgetMin ? parseFloat(budgetMin) : undefined,
        budgetMax: budgetMax ? parseFloat(budgetMax) : undefined,
        deadline: deadline || undefined,
      });
      Alert.alert(t('success'), t('bid_submitted'), [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      Alert.alert(t('error_occurred'), t('bid_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} className="mr-3 rtl:ml-3 rtl:mr-0">
          <ArrowLeft size={24} weight="light" color="#374151" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('submit_bid')}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
        <Input
          label={t('bid_title')}
          placeholder="Enter bid title"
          value={title}
          onChangeText={setTitle}
        />

        <Input
          label={t('bid_description')}
          placeholder="Describe your bid"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <Input
          label={t('estimated_budget') + ' (Min)'}
          placeholder="0.00"
          value={budgetMin}
          onChangeText={setBudgetMin}
          keyboardType="numeric"
        />

        <Input
          label={t('estimated_budget') + ' (Max)'}
          placeholder="0.00"
          value={budgetMax}
          onChangeText={setBudgetMax}
          keyboardType="numeric"
        />

        <Input
          label={t('deadline')}
          placeholder="YYYY-MM-DD"
          value={deadline}
          onChangeText={setDeadline}
        />

        <View className="mt-4">
          <Button title={t('submit')} onPress={handleSubmit} loading={loading} fullWidth />
        </View>

        <View className="mt-3">
          <Button title={t('cancel')} onPress={() => navigation.goBack()} variant="ghost" fullWidth />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
