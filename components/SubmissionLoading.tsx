import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { globalStyles } from '@/app/styles/global';

type SubmissionLoadingProps = {
  message?: string;
};

export function SubmissionLoading({ 
  message = 'Processando sua solicitação...' 
}: SubmissionLoadingProps) {
  return (
    <View 
      style={styles.overlay}
      accessibilityRole="progressbar"
      accessibilityLabel="Carregando"
    >
      <ActivityIndicator 
        size="large" 
        color="#4CAF50"
      />
      <Text 
        style={[styles.text, globalStyles.text]}
        accessibilityLiveRegion="polite"
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  text: {
    color: 'white',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
  },
}); 