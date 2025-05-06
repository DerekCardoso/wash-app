import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '@/app/styles/global';

interface ActiveOrderCardProps {
  carWashName: string;
  estimatedTime: string;
  progress: number;
  onPress?: () => void;
}

export function ActiveOrderCard({
  carWashName,
  estimatedTime,
  progress,
  onPress,
}: ActiveOrderCardProps) {
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const progressAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de balanço do ícone
    const startShakeAnimation = () => {
      // Primeiro, garante que o ícone está parado
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start(() => {
        // Espera 5 segundos antes de começar a balançar
        setTimeout(() => {
          Animated.sequence([
            Animated.timing(shakeAnimation, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
              toValue: -1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
              toValue: 0.5,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
              toValue: -0.5,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start(() => {
            // Após balançar, espera 5 segundos para começar novamente
            setTimeout(startShakeAnimation, 5000);
          });
        }, 5000);
      });
    };

    startShakeAnimation();

    // Animação da barra de progresso
    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const rotate = shakeAnimation.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-10deg', '10deg'],
  });

  const progressWidth = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons name="car" size={24} color="#FFF" />
        </Animated.View>
        <Text style={styles.title}>Pedido em andamento</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.carWashName}>{carWashName}</Text>
        <Text style={styles.estimatedTime}>
          Pronto em {estimatedTime}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressWidth,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round(progress * 100)}% concluído
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 8,
  },
  content: {
    marginBottom: 12,
  },
  carWashName: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 4,
  },
  estimatedTime: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#FFF',
    marginTop: 4,
    textAlign: 'right',
  },
}); 