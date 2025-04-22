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
  const { authUser } = useAuth(); // Supabase Auth
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsuario = useCallback(async () => {
    if (!authUser?.id) return;
    setLoading(true);
    const { data, error } = await usuarioService.getByUUID(authUser.id);
    if (error) {
      setError(error);
      setUsuario(null);
    } else {
      setUsuario(data);
      setError(null);
    }
    setLoading(false);
  }, [authUser?.id]);

  useEffect(() => {
    if (authUser?.email) fetchUsuario();
    else {
      setUsuario(null);
      setLoading(false);
    }
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
