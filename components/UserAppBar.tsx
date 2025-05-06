import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '@/app/styles/global';

export function UserAppBar() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/profile');
    });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePress}>
          <Animated.View style={[styles.content, { transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0) || '?'}
              </Text>
            </View>

            <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>Bem-vindo(a)</Text>
              <Text style={styles.userNameText} numberOfLines={1}>
                {user?.name || 'Usuário'}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#4A90E2',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#4A90E2',
    borderBottomWidth: 1,
    borderBottomColor: '#3A80D2',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#4A90E2',
    fontWeight: 'bold',
    fontSize: 18,
  },
  greetingContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  userNameText: {
    fontSize: 16,
    color: '#fff',
    maxWidth: 200,
  },
}); 