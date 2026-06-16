import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

interface HeroSlideshowProps {
  slides: Slide[];
  onSlidePress?: (slide: Slide) => void;
}

export function HeroSlideshow({ slides, onSlidePress }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % slides.length;
        scrollRef.current?.scrollTo({ x: next * width, animated: true });
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <View className="mb-6">
      <FlatList
        ref={scrollRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onSlidePress?.(item)}
            style={{ width }}
          >
            <Image source={{ uri: item.imageUrl }} className="w-full h-56" resizeMode="cover" />
            <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <Text className="text-white text-xl font-bold">{item.title}</Text>
              <Text className="text-white/80 text-sm mt-1">{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View className="flex-row justify-center mt-3">
        {slides.map((_, i) => (
          <View
            key={i}
            className={`w-2 h-2 rounded-full mx-1 ${
              i === currentIndex ? 'bg-brand-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>
    </View>
  );
}
