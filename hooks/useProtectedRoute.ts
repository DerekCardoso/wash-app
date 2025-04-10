import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { AppUser } from '@/types/user';

export function useProtectedRoute(user: AppUser | null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    const inOwnerGroup = segments[0] === '(owner)';
    const inCustomerGroup = segments[0] === '(customer)';

    if (!user && !inAuthGroup) {
      // Redireciona para o login se não estiver autenticado
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // Redireciona para a home apropriada se já estiver autenticado
      if (user.userType === 'owner') {
        router.replace('/(owner)/home');
      } else {
        router.replace('/(customer)/home');
      }
    } else if (user && inOwnerGroup && user.userType !== 'owner') {
      // Redireciona para a home do cliente se tentar acessar área do dono
      router.replace('/(customer)/home');
    } else if (user && inCustomerGroup && user.userType !== 'customer') {
      // Redireciona para a home do dono se tentar acessar área do cliente
      router.replace('/(owner)/home');
    }
  }, [user, segments]);
} 