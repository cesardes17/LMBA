import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { UserCardList } from '@/src/components/admin/userCardList';
import StyledTextInput from '@/src/components/common/StyledTextInput';
import Separator from '@/src/components/common/Separator';
import { usuarioService } from '@/src/services/usuarioService';
import { useUserContext } from '@/src/context/userContext';
import { Usuario } from '@/src/types/models/Usuario';
import StyledModal from '@/src/components/common/StyledModal';
import StyledText from '@/src/components/common/StyledText';
import {
  SelectableCardGroup,
  Option,
} from '@/src/components/common/SelectableCardGroup';
import { rolesService } from '@/src/services/rolesServices';
import { Rol } from '@/src/types/models/Rol';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';

export default function ListadoUsuariosScreen() {
  const [searchText, setSearchText] = useState('');
  const { usuario } = useUserContext();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loadingPagination, setLoadingPagination] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [roles, setRoles] = useState<Option[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');

  const pageSize = 10;

  const fetchUsuarios = useCallback(
    async (page: number, reset = false) => {
      if (!usuario) return;

      try {
        if (page === 1) {
          setLoadingInitial(true);
        } else {
          setLoadingPagination(true);
        }

        const response = await usuarioService.getPaginatedUsers(
          usuario.rol_id,
          page,
          pageSize,
          searchText
        );

        if (reset) {
          setUsuarios(response);
        } else {
          setUsuarios((prev) => [...prev, ...response]);
        }

        setHasMoreData(response.length === pageSize);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoadingInitial(false);
        setLoadingPagination(false);
        setRefreshing(false);
      }
    },
    [usuario, searchText]
  );

  useEffect(() => {
    setCurrentPage(1);
    fetchUsuarios(1, true);
  }, [searchText, fetchUsuarios]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data, error } = await rolesService.getAllRoles();
        if (error || !data) {
          console.error('Error fetching roles:', error);
          return;
        }
        const rolesData: Option[] = data
          .filter((rol: Rol) =>
            ['Árbitro', 'Espectador', 'Coorganizador'].includes(rol.nombre)
          )
          .map((rol: Rol) => ({
            id: rol.id.toString(),
            title: rol.nombre,
            description: rol.descripcion,
          }));
        setRoles(rolesData);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleEndReached = () => {
    if (!loadingPagination && hasMoreData) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchUsuarios(nextPage);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setCurrentPage(1);
    fetchUsuarios(1, true);
  };

  const updateBanState = async (usuario: Usuario) => {
    await usuarioService.updateBanStatus(usuario.id, !usuario.activo);
    usuario.activo = !usuario.activo;
    setModalMessage(
      `El estado de baneo del usuario\n${usuario.nombre} ${usuario.apellidos}\nha sido actualizado.`
    );
    setModalVisible(true);
    setIsEditingRole(false);
  };

  const editUser = (usuario: Usuario) => {
    setModalMessage(`Editando el rol del usuario: ${usuario.nombre}`);
    setSelectedUser(usuario);
    setSelectedRoleId(usuario.rol_id.toString());
    setModalVisible(true);
    setIsEditingRole(true);
  };

  const saveRoleChange = async () => {
    if (selectedUser) {
      await usuarioService.updateUsuarioRol(
        selectedUser.id,
        parseInt(selectedRoleId)
      );
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((u) =>
          u.id === selectedUser.id
            ? {
                ...u,
                rol_id: parseInt(selectedRoleId),
                rol_nombre:
                  roles.find((r) => r.id === selectedRoleId)?.title ??
                  u.rol_nombre,
              }
            : u
        )
      );
      setModalVisible(false);
      setIsEditingRole(false);
    }
  };

  if (loadingInitial) {
    return <StyledActivityIndicator />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StyledTextInput
        placeholder='Buscar por nombre, apellidos o correo'
        value={searchText}
        onChangeText={setSearchText}
      />
      <Separator />
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingPagination ? <StyledActivityIndicator /> : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={({ item }) => (
          <UserCardList
            usuario={item}
            onEditUser={() => editUser(item)}
            onUpdateBanState={() => updateBanState(item)}
          />
        )}
      />
      <StyledModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSaveForm={saveRoleChange}
        isForm={isEditingRole}
      >
        {isEditingRole ? (
          <>
            <StyledText>{modalMessage}</StyledText>
            <SelectableCardGroup
              options={roles}
              selectedId={selectedRoleId}
              onSelect={(id) => setSelectedRoleId(id)}
            />
          </>
        ) : (
          <StyledText>{modalMessage}</StyledText>
        )}
      </StyledModal>
    </View>
  );
}
