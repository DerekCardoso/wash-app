import { Stack } from 'expo-router';
import { KeyboardAvoidingView } from '@/components/KeyboardAvoidingView';

export default function AuthLayout() {
  return (
    <KeyboardAvoidingView>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </KeyboardAvoidingView>
  );
} 