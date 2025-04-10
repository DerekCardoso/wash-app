import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '@/app/styles/global';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <View style={styles.stepContainer}>
            <View
              style={[
                styles.circle,
                index <= currentStep ? styles.activeCircle : styles.inactiveCircle,
              ]}
            >
              <Text
                style={[
                  styles.stepNumber,
                  index <= currentStep ? styles.activeNumber : styles.inactiveText,
                ]}
              >
                {index + 1}
              </Text>
            </View>
            <Text
              style={[
                styles.stepText,
                globalStyles.text,
                index <= currentStep ? styles.activeText : styles.inactiveText,
              ]}
            >
              {step}
            </Text>
          </View>
          {index < steps.length - 1 && (
            <View
              style={[
                styles.line,
                index < currentStep ? styles.activeLine : styles.inactiveLine,
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  stepContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  activeCircle: {
    backgroundColor: '#2f95dc',
  },
  inactiveCircle: {
    backgroundColor: '#e0e0e0',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 12,
    textAlign: 'center',
  },
  activeText: {
    color: '#2f95dc',
  },
  activeNumber: {
    color: '#fff',
  },
  inactiveText: {
    color: '#9e9e9e',
  },
  line: {
    flex: 1,
    height: 2,
    marginHorizontal: 8,
  },
  activeLine: {
    backgroundColor: '#2f95dc',
  },
  inactiveLine: {
    backgroundColor: '#e0e0e0',
  },
}); 