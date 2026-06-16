import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Envelope, Lock, Phone } from 'phosphor-react-native';
import { useI18n } from '../providers/I18nProvider';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function RegisterScreen({ navigation }: any) {
  const { t } = useI18n();
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      setError(t('fill_required'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('passwords_no_match'));
      return;
    }
    setLoading(true);
    setError('');
    try {
      await register({ fullName, email, password, phone });
    } catch (err: any) {
      setError(err.response?.data?.message || t('register_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 justify-center px-6">
            <View className="mb-8">
              <Text className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t('register')}</Text>
              <Text className="text-base text-gray-500 dark:text-gray-400">{t('create_account')}</Text>
            </View>

            {error ? (
              <View className="bg-red-50 dark:bg-red-900/30 rounded-xl p-3 mb-4">
                <Text className="text-red-500 dark:text-red-400 text-sm">{error}</Text>
              </View>
            ) : null}

            <Input
              label={t('full_name')}
              placeholder="John Doe"
              value={fullName}
              onChangeText={setFullName}
              leftIcon={<User size={20} weight="light" color="#9ca3af" />}
            />

            <Input
              label={t('email')}
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Envelope size={20} weight="light" color="#9ca3af" />}
            />

            <Input
              label={t('phone')}
              placeholder="+1 234 567 890"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              leftIcon={<Phone size={20} weight="light" color="#9ca3af" />}
            />

            <Input
              label={t('password')}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              leftIcon={<Lock size={20} weight="light" color="#9ca3af" />}
            />

            <Input
              label={t('confirm_password')}
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              leftIcon={<Lock size={20} weight="light" color="#9ca3af" />}
            />

            <Button title={t('sign_up')} onPress={handleRegister} loading={loading} fullWidth />

            <View className="flex-row justify-center mt-6 mb-4">
              <Text className="text-gray-500 dark:text-gray-400 text-sm">{t('has_account')} </Text>
              <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
                <Text className="text-brand-500 text-sm font-semibold">{t('sign_in')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
