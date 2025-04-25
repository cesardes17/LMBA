import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Jugador, Usuario } from '@/src/types/models/Usuario';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import { usuarioService } from '@/src/services/usuarioService';
import StyledAlert from '@/src/components/common/StyledAlert';
import { useUserContext } from '@/src/context/userContext';
import { router } from 'expo-router';
import JugadorCardsMobile from '@/src/components/admin/userList/JugadorCardsMobile';

export default function ListadoJugadoresScreen() {
  const [users, setUsers] = useState<{ usuario: Usuario; jugador: Jugador }[]>(
    []
  );
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: '',
  });
  const { usuario, loading } = useUserContext();
  // const { width } = useWindowDimensions();

  // const isMobile = Platform.OS !== 'web' || width < 768;

  useEffect(() => {
    if (
      !usuario ||
      (usuario.rol_nombre !== 'Organizador' &&
        usuario.rol_nombre !== 'Coorganizador')
    ) {
      return router.replace('/'); // Redirige a la página de inicio si no hay usuario en el contexto ap
    }
    if (loading) {
      return;
    }
    const fetchUsers = async () => {
      try {
        const resultado = await usuarioService.getUsuariosJugadores();
        if (!resultado || resultado.length === 0) {
          throw new Error('No se encontraron usuarios');
        }

        setUsers(resultado);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError({ error: true, message: (error as Error).message });
      }
    };

    fetchUsers();
  }, [usuario, loading]); // Eliminada la dependencia error

  if (isLoading || loading) {
    return <StyledActivityIndicator />;
  }
  if (users.length === 0 || error.error) {
    return <StyledAlert>Error al cargar los usuarios</StyledAlert>;
  }
  return (
    <ScrollView style={{ padding: 16 }}>
      <JugadorCardsMobile users={users} setUsers={setUsers} />

      {/* <UserTableWeb users={users} setUsers={setUsers} /> */}
    </ScrollView>
  );
}
