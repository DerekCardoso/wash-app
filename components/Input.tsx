import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '@/app/styles/global';

interface ValidationFeedback {
  icon?: string;
  message: string;
  color: string;
}

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  onBlur?: () => void;
  validation?: ValidationFeedback;
  hint?: string;
  isPassword?: boolean;
  validateOnBlur?: boolean;
  prefix?: string;
}

export function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  onBlur,
  validation,
  hint,
  isPassword = false,
  validateOnBlur = false,
  prefix,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [shouldShowValidation, setShouldShowValidation] = useState(!validateOnBlur);

  const handleFocus = () => {
    setIsFocused(true);
    if (validateOnBlur) {
      setShouldShowValidation(false);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (validateOnBlur) {
      setShouldShowValidation(true);
    }
    onBlur?.();
  };

  const showValidationOrHint = () => {
    if (error) return true;
    if (!validateOnBlur) return true;
    if (validateOnBlur && shouldShowValidation) return true;
    return false;
  };

  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.inputContainer, 
          error && styles.inputError,
          validation?.color && shouldShowValidation && { borderColor: validation.color }
        ]}
      >
        {prefix && (
          <Text style={styles.prefix}>{prefix}</Text>
        )}
        <TextInput
          style={[styles.input, globalStyles.text]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        )}
        {validation?.icon && shouldShowValidation && (
          <Text style={[styles.validationIcon, { color: validation.color }]}>
            {validation.icon}
          </Text>
        )}
      </View>
      
      {showValidationOrHint() && (error || validation?.message || hint) && (
        <Text 
          style={[
            styles.helperText,
            globalStyles.text,
            error && styles.errorText,
            validation && shouldShowValidation && { color: validation.color }
          ]}
          accessibilityLiveRegion="polite"
        >
          {error || (shouldShowValidation && validation?.message) || hint}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff4444',
  },
  eyeIcon: {
    padding: 8,
  },
  validationIcon: {
    marginLeft: 8,
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  errorText: {
    color: '#ff4444',
  },
  prefix: {
    marginRight: 8,
    fontSize: 16,
  },
}); 