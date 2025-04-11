import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';
import { globalStyles } from '@/app/styles/global';

interface MaskedInputProps extends Omit<MaskInputProps, 'style'> {
  error?: string;
}

export function MaskedInput({ error, ...props }: MaskedInputProps) {
  return (
    <View style={styles.container}>
      <MaskInput
        style={[
          styles.input,
          globalStyles.text,
          error && styles.inputError
        ]}
        placeholderTextColor="#999"
        {...props}
      />
      {error && (
        <Text style={[styles.errorText, globalStyles.text]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
}); 