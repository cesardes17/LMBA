import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  UIManager,
  StyleSheet,
} from 'react-native';
import { Usuario, Jugador } from '@/src/types/models/Usuario';
import StyledText from '../../common/StyledText';
import { UserActionsModal } from '../../common/UserActionsModal';
import { useTheme } from '@/src/hooks/useTheme';
import { jugadorService } from '@/src/services/jugadorService';
import StyledAlert from '../../common/StyledAlert';
import { usuarioService } from '@/src/services/usuarioService';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type UserJugador = {
  usuario: Usuario;
  jugador: Jugador;
};

type Props = {
  users: UserJugador[];
  setUsers: React.Dispatch<React.SetStateAction<UserJugador[]>>;
  error: { error: boolean; message: string };
};

export default function JugadorCardsMobile({ users, setUsers, error }: Props) {
  const [selectedUser, setSelectedUser] = useState<UserJugador | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { theme } = useTheme();

  const openActions = (user: UserJugador) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleBanToggle = useCallback(async () => {
    if (!selectedUser) return;
    try {
      const { data, error } = await usuarioService.updateBanStatus(
        selectedUser.usuario.id,
        !selectedUser.usuario.activo
      );
      if (error || !data) {
        throw error || new Error('Error al actualizar el estado de ban');
      }
    } catch (error) {
      console.error('Error al actualizar el estado de ban:', error);
      return;
    } finally {
      const updatedUsers = users.map((u) =>
        u.usuario.id === selectedUser.usuario.id
          ? { ...u, usuario: { ...u.usuario, activo: !u.usuario.activo } }
          : u
      );
      setUsers(updatedUsers);
      setIsModalVisible(false);
    }
  }, [selectedUser, users, setUsers]);

  const handleEditRole = useCallback(() => {
    console.log('Editar rol de:', selectedUser?.usuario.nombre);
    setIsModalVisible(false);
  }, [selectedUser]);

  const handleSancionar = useCallback(async () => {
    if (!selectedUser) return;
    const { error, success } = await jugadorService.actualizarSancionJugador(
      Number(selectedUser.jugador.id),
      !selectedUser.jugador.sancionado
    );
    if (!success && error) {
      console.error('Error al actualizar la sanción:', error);
      return;
    }
    const updatedUsers = users.map((u) =>
      u.usuario.id === selectedUser.usuario.id
        ? { ...u, jugador: { ...u.jugador, sancionado: !u.jugador.sancionado } }
        : u
    );
    setUsers(updatedUsers);
    setIsModalVisible(false);
  }, [selectedUser, users, setUsers]);

  const renderJugadorCard = useCallback(
    (userJugador: UserJugador) => (
      <TouchableOpacity
        key={userJugador.usuario.id}
        onPress={() => openActions(userJugador)}
        style={[
          styles.card,
          {
            backgroundColor:
              !userJugador.usuario.activo || userJugador.jugador.sancionado
                ? theme.error + '10'
                : theme.cardBackground,
            borderColor:
              !userJugador.usuario.activo || userJugador.jugador.sancionado
                ? theme.error + '30'
                : theme.border,
          },
        ]}
      >
        <View style={styles.contentContainer}>
          <StyledText variant='primary' weight='bold' size='medium'>
            {userJugador.usuario.nombre} {userJugador.usuario.apellidos}
          </StyledText>
          <StyledText variant='secondary'>
            {userJugador.usuario.email}
          </StyledText>
          <StyledText variant='secondary'>
            {userJugador.usuario.rol_nombre}
          </StyledText>

          <View style={styles.jugadorInfo}>
            <StyledText variant='secondary' weight='bold'>
              Dorsal: {userJugador.jugador.dorsal_preferido}
            </StyledText>
            <StyledText variant='secondary'>
              Posición: {userJugador.jugador.posicion_preferida}
            </StyledText>
          </View>

          <View style={styles.statusContainer}>
            <StyledText
              style={[
                styles.statusBadge,
                {
                  backgroundColor: !userJugador.usuario.activo
                    ? theme.error + '15'
                    : theme.success + '15',
                  borderColor: !userJugador.usuario.activo
                    ? theme.error
                    : theme.success,
                },
              ]}
            >
              {!userJugador.usuario.activo ? 'Baneado' : 'Activo'}
            </StyledText>
            <StyledText
              style={[
                styles.statusBadge,
                {
                  backgroundColor: userJugador.jugador.sancionado
                    ? theme.error + '15'
                    : theme.success + '15',
                  borderColor: userJugador.jugador.sancionado
                    ? theme.error
                    : theme.success,
                },
              ]}
            >
              {userJugador.jugador.sancionado ? 'Sancionado' : 'Sin Sanción'}
            </StyledText>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [theme]
  );

  const memoizedCards = useMemo(
    () => users.map(renderJugadorCard),
    [users, renderJugadorCard]
  );

  if (error.error) {
    return <StyledAlert variant='info'> {error.message}</StyledAlert>;
  }

  return (
    <View style={styles.container}>
      {memoizedCards}
      <UserActionsModal
        visible={isModalVisible}
        onClose={() => setTimeout(() => setIsModalVisible(false), 0)}
        onEdit={handleEditRole}
        onBan={handleBanToggle}
        isBanned={selectedUser?.usuario.activo === false}
        isSanctioned={selectedUser?.jugador.sancionado === true}
        user={selectedUser ? selectedUser.usuario : null}
        onPenalize={handleSancionar}
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  contentContainer: {
    gap: 8,
  },
  statusContainer: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  jugadorInfo: {
    marginTop: 8,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 8,
    gap: 4,
  },
});
