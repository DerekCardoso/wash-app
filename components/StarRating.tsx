import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StarRatingProps {
  value: number;
  size?: number;
  spacing?: number;
}

export function StarRating({ value, size = 16, spacing = 2 }: StarRatingProps) {
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Ionicons
          key={i}
          name="star"
          size={size}
          color="#FFD700"
          style={{ marginRight: spacing }}
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <Ionicons
          key={i}
          name="star-half"
          size={size}
          color="#FFD700"
          style={{ marginRight: spacing }}
        />
      );
    } else {
      stars.push(
        <Ionicons
          key={i}
          name="star-outline"
          size={size}
          color="#FFD700"
          style={{ marginRight: spacing }}
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      {stars}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}); 