import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import UserCardsMobile from '@/src/components/admin/userList/UserCardsMobile';
import { Usuario } from '@/src/types/models/Usuario';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import { usuarioService } from '@/src/services/usuarioService';
import StyledAlert from '@/src/components/common/StyledAlert';
import { useUserContext } from '@/src/context/userContext';
import { router } from 'expo-router';
import StyledTextInput from '@/src/components/common/StyledTextInput';

export default function ListadoUsuariosScreen() {
  const [users, setUsers] = useState<Usuario[]>([]);
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
        const resultado = await usuarioService.getUsuariosNoJugadores(
          usuario.rol_id,
          search
        );
        if (!resultado || resultado.length === 0) {
          throw new Error('No se encontraron usuarios');
        }
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

  if (isLoading || loading) {
    return <StyledActivityIndicator />;
  }
  if (users.length === 0 || error.error) {
    return <StyledAlert>Error al cargar los usuarios</StyledAlert>;
  }
  return (
    <ScrollView style={{ padding: 16 }}>
      <View style={{ marginBottom: 16 }}>
        <StyledTextInput
          placeholder='Buscar usuarios...'
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <UserCardsMobile users={users} setUsers={setUsers} />
    </ScrollView>
  );
}
