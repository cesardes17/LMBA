import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  UIManager,
  StyleSheet,
} from 'react-native';
import { Usuario } from '@/src/types/models/Usuario';
import StyledText from '../../common/StyledText';
import { UserActionsModal } from '../../common/UserActionsModal';
import { useTheme } from '@/src/hooks/useTheme';
import { usuarioService } from '@/src/services/usuarioService';
import { RoleSelectionModal } from '../../common/RoleSelectionModal';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}
const roles = [
  'Organizador',
  'Coorganizador',
  'Árbitro',
  'Cápitan',
  'Jugador',
  'Espectador',
];
type Props = {
  users: Usuario[];
  setUsers: React.Dispatch<React.SetStateAction<Usuario[]>>;
  error: { error: boolean; message: string };
};

export default function UserCardsMobile({ users, setUsers, error }: Props) {
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
  const { theme } = useTheme();

  const openActions = (user: Usuario) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleBanToggle = async () => {
    if (!selectedUser) return;
    try {
      const { data, error } = await usuarioService.updateBanStatus(
        selectedUser.id,
        !selectedUser.activo
      );
      if (error || !data) {
        throw error || new Error('Error al actualizar el estado de ban');
      }
    } catch (error) {
      console.error('Error al actualizar el estado de ban:', error);
      return;
    } finally {
      const updatedUsers = users.map((u) =>
        u.id === selectedUser.id ? { ...u, activo: !u.activo } : u
      );
      setUsers(updatedUsers);
      setIsModalVisible(false);
    }
  };
  const handleEditRole = () => {
    setIsModalVisible(false);
    setIsRoleModalVisible(true);
  };

  const handleRoleSelect = async (roleId: number) => {
    if (!selectedUser) return;
    try {
      const { data, error } = await usuarioService.updateUsuarioRol(
        selectedUser.id,
        roleId
      );
      if (error || !data) {
        throw error || new Error('Error al actualizar el rol');
      }
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
    } finally {
      const updatedUsers = users.map((u) =>
        u.id === selectedUser.id
          ? { ...u, rol_id: roleId, rol_nombre: roles[roleId - 1] }
          : u
      );
      setUsers(updatedUsers);
      setIsRoleModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {users.map((user) => (
        <TouchableOpacity
          key={user.id}
          onPress={() => openActions(user)}
          style={[
            styles.card,
            {
              backgroundColor: !user.activo
                ? theme.error + '10'
                : theme.cardBackground,
              borderColor: !user.activo ? theme.error + '30' : theme.border,
            },
          ]}
        >
          <View style={styles.contentContainer}>
            <StyledText variant='primary' weight='bold' size='medium'>
              {user.nombre}
            </StyledText>
            <StyledText variant='secondary'>{user.email}</StyledText>
            <StyledText variant='secondary'>{user.rol_nombre}</StyledText>

            <View style={styles.statusContainer}>
              <StyledText
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: !user.activo
                      ? theme.error + '15'
                      : theme.success + '15',
                    borderColor: !user.activo ? theme.error : theme.success,
                  },
                ]}
              >
                {!user.activo ? 'Baneado' : 'Activo'}
              </StyledText>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <UserActionsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onEdit={handleEditRole}
        onBan={handleBanToggle}
        isBanned={!selectedUser?.activo}
        user={selectedUser}
        onPenalize={() => {
          console.log('Sancionar jugador: ', selectedUser?.nombre);
        }}
      />

      <RoleSelectionModal
        visible={isRoleModalVisible}
        onClose={() => setIsRoleModalVisible(false)}
        onSelectRole={handleRoleSelect}
        currentRoleId={selectedUser?.rol_id || 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  contentContainer: {
    gap: 8,
  },
  statusContainer: {
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
});
