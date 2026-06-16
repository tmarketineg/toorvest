import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
}: ButtonProps) {
  const baseClasses = 'rounded-xl flex-row items-center justify-center';

  const sizeClasses = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  };

  const variantClasses = {
    primary: 'bg-brand-500',
    secondary: 'bg-gray-100',
    outline: 'border border-brand-500 bg-transparent',
    ghost: 'bg-transparent',
  };

  const textClasses = {
    primary: 'text-white font-semibold',
    secondary: 'text-gray-800 font-semibold',
    outline: 'text-brand-500 font-semibold',
    ghost: 'text-brand-500 font-medium',
  };

  const textSize = { sm: 'text-sm', md: 'text-base', lg: 'text-lg' };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
        disabled ? 'opacity-50' : ''
      } ${fullWidth ? 'w-full' : ''}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#22c55e'} />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon}
          <Text className={`${textClasses[variant]} ${textSize[size]}`}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
