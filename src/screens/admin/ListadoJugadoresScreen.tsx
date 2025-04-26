import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useResponsiveWidth } from '@/src/hooks/useWidth';
import { Jugador, Usuario } from '@/src/types/models/Usuario';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import JugadorCardsMobile from '@/src/components/admin/userList/JugadorCardsMobile';
import { usuarioService } from '@/src/services/usuarioService';
import { useUserContext } from '@/src/context/userContext';
import StyledTextInput from '@/src/components/common/StyledTextInput';
import { router } from 'expo-router';

export default function ListadoJugadoresScreen() {
  const responsiveWidth = useResponsiveWidth();
  const [users, setUsers] = useState<
    {
      usuario: Usuario;
      jugador: Jugador;
    }[]
  >([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: '',
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { usuario, loading } = useUserContext();

  const fetchUsers = useCallback(
    async (search?: string) => {
      try {
        if (!usuario) {
          return;
        }
        const resultado = await usuarioService.getUsuariosJugadores(search);
        if (!resultado || resultado.length === 0) {
          if (search) {
            throw new Error('No hay usuarios que coincidan con la búsqueda');
          } else {
            throw new Error('No se encontraron usuarios');
          }
        }
        setError({ error: false, message: '' });
        setUsers(resultado);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError({ error: true, message: (error as Error).message });
      }
    },
    [usuario]
  );

  useEffect(() => {
    if (
      !usuario ||
      (usuario.rol_nombre !== 'Organizador' &&
        usuario.rol_nombre !== 'Coorganizador')
    ) {
      return router.replace('/');
    }
    if (loading) {
      return;
    }
    fetchUsers();
  }, [usuario, loading, fetchUsers]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    fetchUsers(text);
  };

  if (isLoading || isLoading) {
    return <StyledActivityIndicator />;
  }

  return (
    <ScrollView
      style={{ padding: 16 }}
      contentContainerStyle={{
        width: responsiveWidth,
        alignSelf: 'center',
      }}
    >
      <View style={{ marginBottom: 16 }}>
        <StyledTextInput
          placeholder='Buscar usuarios...'
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <JugadorCardsMobile users={users} setUsers={setUsers} error={error} />
    </ScrollView>
  );
}
