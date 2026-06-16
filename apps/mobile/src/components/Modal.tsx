import React from 'react';
import { View, Text, TouchableOpacity, Modal as RNModal } from 'react-native';
import { X } from 'phosphor-react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ visible, onClose, title, children }: ModalProps) {
  return (
    <RNModal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl pt-4 pb-8 px-6 max-h-[80%]">
          <View className="flex-row items-center justify-between mb-4">
            {title && <Text className="text-lg font-semibold text-gray-800">{title}</Text>}
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <X size={24} weight="light" color="#6b7280" />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </RNModal>
  );
}
