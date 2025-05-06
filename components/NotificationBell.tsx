import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAnimation } from '@/hooks/useAnimation';

interface NotificationBellProps {
  count: number;
  onPress: () => void;
}

export function NotificationBell({ count, onPress }: NotificationBellProps) {
  const pulseAnim = useAnimation({
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
    loop: true,
  });

  return (
    <TouchableOpacity 
      onPress={onPress}
      accessibilityLabel={`${count} notificações não lidas`}
      accessibilityRole="button"
    >
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.bellContainer,
            {
              transform: [
                {
                  scale: pulseAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 1.1, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Ionicons name="notifications" size={24} color="#666" />
          {count > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {count > 99 ? '99+' : count}
              </Text>
            </View>
          )}
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  bellContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 