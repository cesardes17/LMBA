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
import StyledAlert from '../../common/StyledAlert';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Props = {
  users: Usuario[];
  setUsers: React.Dispatch<React.SetStateAction<Usuario[]>>;
  error: { error: boolean; message: string };
};

export default function UserCardsMobile({ users, setUsers, error }: Props) {
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { theme } = useTheme();

  const openActions = (user: Usuario) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleBanToggle = () => {
    if (!selectedUser) return;

    const updatedUsers = users.map((u) =>
      u.id === selectedUser.id ? { ...u, activo: !u.activo } : u
    );
    setUsers(updatedUsers);
    setIsModalVisible(false);
  };

  const handleEditRole = () => {
    // Aquí puedes lanzar otro modal o navegación a edición de rol
    console.log('Editar rol de:', selectedUser?.nombre);
    setIsModalVisible(false);
  };

  if (error.error) {
    return (
      <View style={styles.container}>
        <StyledAlert variant='info'>{error.message}</StyledAlert>
      </View>
    );
  }

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
