import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/constants/firebase';
import { db } from '@/constants/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { AppUser } from '@/types/user';

interface RegisterData {
  email: string;
  password: string;
  name: string;
  userType: 'customer' | 'owner';
  companyName?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              name: userData.name,
              userType: userData.userType,
            });
          } else {
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              name: firebaseUser.displayName || '',
              userType: 'customer',
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            name: firebaseUser.displayName || '',
            userType: 'customer',
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async ({ email, password, name, userType, companyName }: RegisterData) => {
    try {
      setError(null);
      setSuccess(null);
      setLoading(true);

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Por favor, informe um e-mail válido');
      }

      // Validar senha
      if (password.length < 8) {
        throw new Error('A senha deve ter pelo menos 8 caracteres');
      }

      // Validar nome
      if (!name.trim()) {
        throw new Error('Por favor, informe seu nome');
      }

      // Validar companyName para proprietários
      if (userType === 'owner' && !companyName?.trim()) {
        throw new Error('Por favor, informe o nome do estabelecimento');
      }

      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name,
        email,
        userType,
        companyName,
        createdAt: new Date()
      });
      
      const appUser: AppUser = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name,
        userType,
      };

      setUser(appUser);
      setSuccess('Cadastro realizado com sucesso!');
      return appUser;
    } catch (error: any) {
      console.error('Erro detalhado:', error);
      
      let errorMessage = 'Erro ao realizar cadastro';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este e-mail já está em uso';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'E-mail inválido';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'A senha deve ter pelo menos 8 caracteres';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Erro de conexão. Verifique sua internet';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setSuccess(null);
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Login realizado com sucesso!');
    } catch (error: any) {
      let errorMessage = 'Erro ao realizar login';
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'E-mail ou senha incorretos';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'E-mail inválido';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Erro de conexão. Verifique sua internet';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      setSuccess(null);
      setLoading(true);
      await signOut(auth);
      setSuccess('Logout realizado com sucesso!');
    } catch (error: any) {
      setError('Erro ao realizar logout');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      setSuccess(null);
      setLoading(true);

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Por favor, informe um e-mail válido');
      }

      await sendPasswordResetEmail(auth, email);
      setSuccess('Email de recuperação enviado com sucesso!');
    } catch (error: any) {
      let errorMessage = 'Erro ao enviar email de recuperação';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Nenhum usuário encontrado com este e-mail';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'E-mail inválido';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Erro de conexão. Verifique sua internet';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    success,
    register,
    login,
    logout,
    resetPassword
  };
}