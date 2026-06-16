import React, { useEffect } from 'react';
import { View, Animated } from 'react-native';

interface LoadingSkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  count?: number;
}

export function LoadingSkeleton({ width = '100%', height = 20, borderRadius = 8, count = 1 }: LoadingSkeletonProps) {
  const opacity = new Animated.Value(0.4);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Animated.View
          key={i}
          style={{
            width: width as any,
            height,
            borderRadius,
            backgroundColor: '#e5e7eb',
            opacity,
            marginBottom: 8,
          }}
        />
      ))}
    </>
  );
}
