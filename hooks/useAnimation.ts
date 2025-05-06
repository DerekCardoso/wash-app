import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

interface UseAnimationProps {
  toValue: number;
  duration?: number;
  useNativeDriver?: boolean;
  loop?: boolean;
}

export function useAnimation({
  toValue,
  duration = 300,
  useNativeDriver = true,
  loop = false,
}: UseAnimationProps) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const config = {
      toValue,
      duration,
      useNativeDriver,
    };

    if (loop) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, config),
          Animated.timing(animation, {
            ...config,
            toValue: 0,
          }),
        ])
      ).start();
    } else {
      Animated.timing(animation, config).start();
    }

    return () => {
      animation.stopAnimation();
    };
  }, [animation, toValue, duration, useNativeDriver, loop]);

  return animation;
} 