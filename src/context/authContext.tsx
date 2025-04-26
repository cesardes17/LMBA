// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '@/src/services/authService';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const saveAuthData = async (user: any, sessionData: any) => {
    try {
      await AsyncStorage.setItem('authUser', JSON.stringify(user));
      await AsyncStorage.setItem('session', JSON.stringify(sessionData));
    } catch (error) {
      console.error('Error guardando datos de autenticación:', error);
    }
  };

  const clearAuthData = async () => {
    try {
      await AsyncStorage.removeItem('authUser');
      await AsyncStorage.removeItem('session');
    } catch (error) {
      console.error('Error limpiando datos de autenticación:', error);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await AuthService.login({ email, password });
    if (!res.error) {
      setAuthUser(res.user);
      const sessionRes = await AuthService.getSession();
      setSession(sessionRes.session);
      await saveAuthData(res.user, sessionRes.session);
    }
    return res;
  };

  const register = async (email: string, password: string) => {
    const res = await AuthService.register({ email, password });
    if (!res.error) {
      setAuthUser(res.user);
      const sessionRes = await AuthService.getSession();
      setSession(sessionRes.session);
      await saveAuthData(res.user, sessionRes.session);
    }
    return res;
  };

  const logout = async () => {
    setLogoutInProgress(true);
    await AuthService.logout();
    setAuthUser(null);
    setSession(null);
    await clearAuthData();
    setLogoutInProgress(false);
    router.replace('/');
  };

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('authUser');
        const storedSession = await AsyncStorage.getItem('session');

        if (storedUser && storedSession) {
          setAuthUser(JSON.parse(storedUser));
          setSession(JSON.parse(storedSession));
          setAuthLoading(false);
          return;
        }

        const { session } = await AuthService.getSession();
        const { user } = await AuthService.getCurrentUser();
        setSession(session);
        setAuthUser(user);
        if (user && session) {
          await saveAuthData(user, session);
        }
      } catch (error) {
        console.error('Error cargando sesión:', error);
      }
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
