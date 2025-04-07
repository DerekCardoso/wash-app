import { Stack } from 'expo-router';
import { CustomHeader } from '@/components/CustomHeader';

export default function OwnerLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }} />
  );
} 