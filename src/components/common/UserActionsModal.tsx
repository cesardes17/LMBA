import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import StyledText from './StyledText';
import { Usuario } from '@/src/types/models/Usuario';
import { useTheme } from '@/src/hooks/useTheme';

interface UserActionsModalProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onBan: () => void;
  onPenalize?: () => void; // Nueva prop opcional para la función de sanción
  isBanned: boolean;
  user: Usuario | null;
}

export function UserActionsModal({
  visible,
  onClose,
  onEdit,
  onBan,
  onPenalize,
  isBanned,
  user,
}: UserActionsModalProps) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Using direct value instead of theme.backdrop
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: theme.cardBackground,
      borderRadius: 12,
      padding: 16,
      width: width * 0.8,
      maxWidth: 400,
      shadowColor: '#000', // Using direct value instead of theme.shadow
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    header: {
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      paddingBottom: 12,
      marginBottom: 12,
    },
    headerText: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    action: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      minWidth: '100%',
      marginTop: 8,
    },
    text: {
      fontSize: 16,
      textAlign: 'center',
    },
    banButton: {
      backgroundColor: theme.error,
    },
    banText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
    unbanButton: {
      backgroundColor: theme.error + '15',
    },
    unbanText: {
      color: theme.error,
      fontWeight: 'bold',
    },
    penalizeButton: {
      backgroundColor: theme.warning + '15',
    },
    penalizeText: {
      color: theme.warning,
      fontWeight: 'bold',
    },
  });

  return (
    <Modal transparent visible={visible} animationType='fade'>
      <TouchableOpacity style={styles.backdrop} onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.header}>
            <StyledText style={styles.headerText}>
              {user?.email || 'Usuario'}
            </StyledText>
          </View>
          <TouchableOpacity
            style={styles.action}
            onPress={onEdit}
            activeOpacity={0.7}
          >
            <StyledText style={styles.text}>Editar rol</StyledText>
          </TouchableOpacity>

          {user?.rol_nombre === 'Jugador' && onPenalize && (
            <TouchableOpacity
              style={[styles.action, styles.penalizeButton]}
              onPress={onPenalize}
              activeOpacity={0.7}
            >
              <StyledText style={[styles.text, styles.penalizeText]}>
                Sancionar jugador
              </StyledText>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.action,
              !isBanned ? styles.banButton : styles.unbanButton,
            ]}
            onPress={onBan}
          >
            <StyledText
              style={[
                styles.text,
                !isBanned ? styles.banText : styles.unbanText,
              ]}
            >
              {isBanned ? 'Desbanear' : 'Banear'} usuario
            </StyledText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const { width } = Dimensions.get('window');
