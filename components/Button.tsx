import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { globalStyles } from '@/app/styles/global';

interface ButtonProps {
  title: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({ 
  title, 
  onPress, 
  variant = 'primary',
  style,
  textStyle,
  disabled,
  loading
}: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        styles[`${variant}Button`],
        (disabled || loading) && styles.disabledButton,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#2f95dc'} />
      ) : typeof title === 'string' ? (
        <Text style={[
          styles.buttonText,
          styles[`${variant}ButtonText`],
          disabled && styles.disabledButtonText,
          globalStyles.textBold,
          textStyle
        ]}>
          {title}
        </Text>
      ) : (
        title
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#2f95dc',
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2f95dc',
  },
  secondaryButtonText: {
    color: '#2f95dc',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  outlineButtonText: {
    color: '#ff4444',
  },
  disabledButton: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  disabledButtonText: {
    color: '#666',
  },
}); 