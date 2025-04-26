import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { usuarioService } from '@/src/services/usuarioService';
import { useAuth } from './authContext'; // suponiendo que tienes uno
import { Usuario } from '@/src/types/models/Usuario';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserContextProps {
  usuario: Usuario | null;
  loading: boolean;
  error: Error | null;
  refetchUsuario: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { authUser } = useAuth();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const saveUserData = async (userData: Usuario) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error guardando datos de usuario:', error);
    }
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem('userData');
    } catch (error) {
      console.error('Error limpiando datos de usuario:', error);
    }
  };

  const fetchUsuario = useCallback(async () => {
    if (!authUser?.id) {
      await clearUserData();
      setUsuario(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await usuarioService.getByUUID(authUser.id);
    if (error || !data) {
      setError(error);
      setUsuario(null);
      await clearUserData();
    } else {
      setUsuario(data);
      setError(null);
      await saveUserData(data);
    }
    setLoading(false);
  }, [authUser?.id]);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userData');
        if (storedUser && authUser?.id) {
          setUsuario(JSON.parse(storedUser));
          setLoading(false);
          // Actualizar en segundo plano
          fetchUsuario();
          return;
        }

        if (authUser?.email) {
          await fetchUsuario();
        } else {
          setUsuario(null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error cargando datos de usuario:', error);
        setLoading(false);
      }
    };

    loadUserData();
  }, [authUser, fetchUsuario]);

  return (
    <UserContext.Provider
      value={{ usuario, loading, error, refetchUsuario: fetchUsuario }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error('useUserContext debe usarse dentro de UserProvider');
  return context;
};
