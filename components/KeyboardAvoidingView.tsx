import React from 'react';
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';

interface KeyboardAvoidingViewProps {
  children: React.ReactNode;
}

export function KeyboardAvoidingView({ children }: KeyboardAvoidingViewProps) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <RNKeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {children}
      </RNKeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 