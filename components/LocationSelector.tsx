import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '@/app/styles/global';

interface LocationSelectorProps {
  currentAddress: string;
  onChange: () => void;
}

export function LocationSelector({ currentAddress, onChange }: LocationSelectorProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onChange}
      accessibilityLabel="Selecionar localização"
      accessibilityRole="button"
    >
      <Ionicons name="location" size={20} color="#007AFF" />
      <Text 
        style={[globalStyles.text, styles.address]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {currentAddress}
      </Text>
      <Ionicons name="chevron-down" size={16} color="#666" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  address: {
    marginLeft: 8,
    marginRight: 4,
    color: '#333',
    flex: 1,
  },
}); 