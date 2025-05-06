import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '@/app/styles/global';

interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  error?: string;
}

export function Checkbox({ value, onValueChange, error }: CheckboxProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkbox, value && styles.checked]}
        onPress={() => onValueChange(!value)}
      >
        {value && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
}); 