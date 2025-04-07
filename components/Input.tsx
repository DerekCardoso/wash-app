import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { globalStyles } from '@/app/styles/global';

interface InputProps extends TextInputProps {
  error?: string;
}

export function Input({ style, error, ...props }: InputProps) {
  return (
    <TextInput
      style={[styles.input, error && styles.inputError, globalStyles.text, style]}
      placeholderTextColor="#999"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#ff4444',
  },
}); 