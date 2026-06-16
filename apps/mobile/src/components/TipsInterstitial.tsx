import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native';
import { X } from 'phosphor-react-native';

interface TipsInterstitialProps {
  visible: boolean;
  onClose: () => void;
  tips: string[];
}

export function TipsInterstitial({ visible, onClose, tips }: TipsInterstitialProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < tips.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onClose();
      setCurrentIndex(0);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <View className="flex-1 bg-brand-500 justify-center items-center px-6">
        <TouchableOpacity
          onPress={onClose}
          className="absolute top-12 right-6"
          activeOpacity={0.7}
        >
          <X size={28} weight="light" color="#fff" />
        </TouchableOpacity>

        <Text className="text-white text-sm font-medium mb-4">
          {currentIndex + 1} / {tips.length}
        </Text>

        <Text className="text-white text-2xl font-bold text-center mb-8 leading-relaxed">
          {tips[currentIndex]}
        </Text>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.7}
          className="bg-white rounded-xl px-8 py-3"
        >
          <Text className="text-brand-500 font-semibold text-base">
            {currentIndex < tips.length - 1 ? 'Next' : 'Get Started'}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
