import { useState, useEffect, useCallback } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User,
  updateProfile
} from 'firebase/auth';
import { auth } from '../constants/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../constants/firebase';

interface RegisterData {
  email: string;
  password: string;
  name: string;
  userType: 'customer' | 'owner';
  companyName?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Tentando fazer login com:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login bem-sucedido:', userCredential.user.uid);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (err) {
      console.error('Erro no login:', err);
      let errorMessage = 'Erro no login';
      
      if (err instanceof Error) {
        const errorCode = (err as any).code;
        console.log('Código do erro:', errorCode);
        
        switch (errorCode) {
          case 'auth/user-not-found':
            errorMessage = 'Usuário não encontrado';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Senha incorreta';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Email inválido';
            break;
          case 'auth/invalid-credential':
            errorMessage = 'Email ou senha incorretos';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Muitas tentativas. Tente novamente mais tarde';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Erro de conexão. Verifique sua internet';
            break;
          default:
            errorMessage = `Erro inesperado: ${errorCode}`;
        }
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async ({ email, password, name, userType, companyName }: RegisterData) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Tentando registrar usuário:', email);
      // 1. Cria usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuário criado:', userCredential.user.uid);
      
      // 2. Atualiza o perfil com o nome
      await updateProfile(userCredential.user, { displayName: name });
      console.log('Perfil atualizado');
      
      // 3. Cria documento no Firestore com dados adicionais
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        userType,
        companyName,
        createdAt: new Date()
      });
      console.log('Documento do usuário criado no Firestore');

      // 4. Atualiza estado local
      setUser({ ...userCredential.user, displayName: name });
      
      return userCredential.user;
    } catch (err) {
      console.error('Erro no registro:', err);
      let errorMessage = 'Erro no registro';
      
      if (err instanceof Error) {
        const errorCode = (err as any).code;
        console.log('Código do erro:', errorCode);
        
        switch (errorCode) {
          case 'auth/email-already-in-use':
            errorMessage = 'Email já está em uso';
            break;
          case 'auth/weak-password':
            errorMessage = 'Senha muito fraca (mínimo 6 caracteres)';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Email inválido';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Erro de conexão. Verifique sua internet';
            break;
          default:
            errorMessage = `Erro inesperado: ${errorCode}`;
        }
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Estado de autenticação alterado:', user?.uid);
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  
  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
    } catch (err) {
      setError('Erro ao fazer logout');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError('Erro ao enviar email de recuperação');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
    resetPassword
  };
};