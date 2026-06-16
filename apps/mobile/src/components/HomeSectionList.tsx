import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CaretRight } from 'phosphor-react-native';
import { useI18n } from '../providers/I18nProvider';

interface SectionItem {
  id: string;
  label: string;
  route?: string;
}

interface Section {
  title: string;
  items: SectionItem[];
}

interface HomeSectionListProps {
  sections: Section[];
  onItemPress: (item: SectionItem) => void;
}

export function HomeSectionList({ sections, onItemPress }: HomeSectionListProps) {
  return (
    <View>
      {sections.map((section, sIndex) => (
        <View key={sIndex} className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-3">{section.title}</Text>
          {section.items.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => onItemPress(item)}
              activeOpacity={0.7}
              className="flex-row items-center justify-between bg-white rounded-xl p-4 mb-2 shadow-sm"
            >
              <Text className="text-base text-gray-700">{item.label}</Text>
              <CaretRight size={18} weight="light" color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}
