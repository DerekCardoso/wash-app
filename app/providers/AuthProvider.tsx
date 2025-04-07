import { createContext, useContext } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

const AuthContext = createContext<ReturnType<typeof useAuth>>({} as ReturnType<typeof useAuth>);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  useProtectedRoute(auth.user);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;