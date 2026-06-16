import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Envelope, Lock, Eye, EyeSlash } from 'phosphor-react-native';
import { useI18n } from '../providers/I18nProvider';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function LoginScreen({ navigation }: any) {
  const { t } = useI18n();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError(t('fill_required'));
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.response?.data?.message || t('login_failed'));
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
              <Text className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t('login')}</Text>
              <Text className="text-base text-gray-500 dark:text-gray-400">{t('welcome')}</Text>
            </View>

            {error ? (
              <View className="bg-red-50 dark:bg-red-900/30 rounded-xl p-3 mb-4">
                <Text className="text-red-500 dark:text-red-400 text-sm">{error}</Text>
              </View>
            ) : null}

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
              label={t('password')}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              leftIcon={<Lock size={20} weight="light" color="#9ca3af" />}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7}>
                  {showPassword ? (
                    <EyeSlash size={20} weight="light" color="#9ca3af" />
                  ) : (
                    <Eye size={20} weight="light" color="#9ca3af" />
                  )}
                </TouchableOpacity>
              }
            />

            <TouchableOpacity className="self-end mb-6" activeOpacity={0.7}>
              <Text className="text-brand-500 text-sm font-medium">{t('forgot_password')}</Text>
            </TouchableOpacity>

            <Button title={t('sign_in')} onPress={handleLogin} loading={loading} fullWidth />

            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-500 dark:text-gray-400 text-sm">{t('no_account')} </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={0.7}>
                <Text className="text-brand-500 text-sm font-semibold">{t('sign_up')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
