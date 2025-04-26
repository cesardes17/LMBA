import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Jugador, Usuario } from '@/src/types/models/Usuario';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import StyledAlert from '@/src/components/common/StyledAlert';
import JugadorCardsMobile from '@/src/components/admin/userList/JugadorCardsMobile';
import { usuarioService } from '@/src/services/usuarioService';
import { useUserContext } from '@/src/context/userContext';

export default function ListadoJugadoresScreen() {
  const { usuario, loading: userLoading } = useUserContext();
  const [users, setUsers] = useState<{ usuario: Usuario; jugador: Jugador }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: '',
  });

  useEffect(() => {
    if (!usuario || userLoading) return;

    const fetchUsers = async () => {
      try {
        const resultado = await usuarioService.getUsuariosJugadores();
        if (!resultado || resultado.length === 0) {
          throw new Error('No se encontraron usuarios');
        }
        setUsers(resultado);
      } catch (err) {
        setError({ error: true, message: (err as Error).message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [usuario, userLoading]);

  if (userLoading || isLoading) {
    return <StyledActivityIndicator />;
  }

  if (error.error || users.length === 0) {
    return (
      <StyledAlert>
        {error.message || 'Error al cargar los usuarios'}
      </StyledAlert>
    );
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      <JugadorCardsMobile users={users} setUsers={setUsers} />
    </ScrollView>
  );
}
