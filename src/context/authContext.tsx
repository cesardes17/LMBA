// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '@/src/services/authService';
import { router } from 'expo-router';

interface AuthContextProps {
  authUser: any;
  session: any;
  authloading: boolean;
  logoutInProgress: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [authloading, setAuthLoading] = useState(true);
  const [logoutInProgress, setLogoutInProgress] = useState(false);

  const login = async (email: string, password: string) => {
    const res = await AuthService.login({ email, password });
    if (!res.error) {
      setAuthUser(res.user);
      const sessionRes = await AuthService.getSession();
      setSession(sessionRes.session);
    }
    return res;
  };

  const register = async (email: string, password: string) => {
    const res = await AuthService.register({ email, password });
    if (!res.error) {
      setAuthUser(res.user);
      const sessionRes = await AuthService.getSession();
      setSession(sessionRes.session);
    }
    return res;
  };

  const logout = async () => {
    setLogoutInProgress(true);
    await AuthService.logout();
    setAuthUser(null);
    setSession(null);
    setLogoutInProgress(false);

    // 🚀 Redirige tú manualmente
    router.replace('/');
  };

  useEffect(() => {
    const loadSession = async () => {
      const { session } = await AuthService.getSession();
      const { user } = await AuthService.getCurrentUser();
      setSession(session);
      setAuthUser(user);
      setAuthLoading(false);
    };
    loadSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        session,
        authloading,
        login,
        register,
        logout,
        logoutInProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};
