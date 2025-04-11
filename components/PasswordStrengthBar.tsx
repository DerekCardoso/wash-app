import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '@/app/styles/global';

interface PasswordStrengthBarProps {
  password: string;
}

export function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
  const getPasswordStrength = () => {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
  };

  const getStrengthText = () => {
    const strength = getPasswordStrength();
    switch (strength) {
      case 0:
      case 1:
        return { text: 'Muito fraca', color: '#ff4444' };
      case 2:
        return { text: 'Fraca', color: '#ffbb33' };
      case 3:
        return { text: 'Média', color: '#ffbb33' };
      case 4:
        return { text: 'Forte', color: '#00C851' };
      case 5:
        return { text: 'Muito forte', color: '#007E33' };
      default:
        return { text: '', color: '#ccc' };
    }
  };

  const strengthInfo = getStrengthText();
  const progress = (getPasswordStrength() / 5) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${progress}%`, backgroundColor: strengthInfo.color }
          ]} 
        />
      </View>
      <Text style={[styles.strengthText, globalStyles.text, { color: strengthInfo.color }]}>
        {strengthInfo.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  barContainer: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    textAlign: 'right',
  },
}); 