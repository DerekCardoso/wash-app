import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, useSegments } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/constants/firebase';
import { User } from 'firebase/auth';

type AuthContextType = ReturnType<typeof useAuth>;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Função para verificar se o usuário está autenticado
function useProtectedRoute(user: User | null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log('useProtectedRoute - user:', user?.uid);
    console.log('useProtectedRoute - segments:', segments);

    const inAuthGroup = segments[0] === '(auth)';
    const inOwnerGroup = segments[0] === '(owner)';
    const inCustomerGroup = segments[0] === '(customer)';

    if (!user && !inAuthGroup) {
      console.log('Redirecionando para login - usuário não autenticado');
      router.replace('/(auth)/login');
    } else if (user) {
      console.log('Usuário autenticado, verificando tipo...');
      // Verifica o tipo de usuário e redireciona se necessário
      const checkUserType = async () => {
        try {
          console.log('Buscando dados do usuário no Firestore...');
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('Dados do usuário:', userData);
            
            if (userData.userType === 'owner' && !inOwnerGroup) {
              console.log('Redirecionando para home do proprietário');
              router.replace('/(owner)/home');
            } else if (userData.userType === 'customer' && !inCustomerGroup) {
              console.log('Redirecionando para home do cliente');
              router.replace('/(customer)/home');
            } else if (inAuthGroup) {
              console.log('Redirecionando para área apropriada');
              router.replace(userData.userType === 'owner' ? '/(owner)/home' : '/(customer)/home');
            }
          } else {
            console.log('Documento do usuário não encontrado no Firestore');
          }
        } catch (error) {
          console.error('Erro ao verificar tipo do usuário:', error);
        }
      };

      checkUserType();
    }
  }, [user, segments]);
}

export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  useProtectedRoute(auth.user);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

// Tipo auxiliar para o usuário estendido
export type ExtendedUser = User & {
  userType?: 'customer' | 'owner';
  carWashId?: string;
};