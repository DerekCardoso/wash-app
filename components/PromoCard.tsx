import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { globalStyles } from '@/app/styles/global';

interface PromoCardProps {
  image: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}

export function PromoCard({ image, title, subtitle, onPress }: PromoCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      accessibilityLabel={`Promoção: ${title}`}
      accessibilityRole="button"
    >
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={[globalStyles.textBold, styles.title]}>
          {title}
        </Text>
        <Text style={[globalStyles.text, styles.subtitle]}>
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 169,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 4,
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
}); 