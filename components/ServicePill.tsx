import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '@/app/styles/global';

interface ServicePillProps {
  icon: string;
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export function ServicePill({ icon, label, active = false, onPress }: ServicePillProps) {
  return (
    <TouchableOpacity
      style={[styles.container, active && styles.activeContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.icon, active && styles.activeIcon]}>{icon}</Text>
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeContainer: {
    backgroundColor: '#FF6B00',
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
    color: '#666',
  },
  activeIcon: {
    color: '#fff',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  activeLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 