import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import StyledText from './StyledText';
import { useTheme } from '@/src/hooks/useTheme';
import { CloseIcon } from '@/src/constants/icons';
import { SelectableCardGroup } from './SelectableCardGroup';

interface RoleSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectRole: (roleId: number) => void;
  currentRoleId: number;
}

const ROLES = [
  {
    id: '2',
    title: 'Coorganizador',
    description: 'Ayuda en la organización y gestión de eventos',
  },
  {
    id: '3',
    title: 'Árbitro',
    description: 'Supervisa y arbitra los partidos',
  },
  {
    id: '6',
    title: 'Espectador',
    description: 'Visualiza y sigue los eventos',
  },
];

export function RoleSelectionModal({
  visible,
  onClose,
  onSelectRole,
  currentRoleId,
}: RoleSelectionModalProps) {
  const { theme } = useTheme();
  const { width } = Dimensions.get('window');

  const styles = StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: theme.cardBackground,
      borderRadius: 12,
      padding: 16,
      width: width * 0.8,
      maxWidth: 400,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
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
  });

  return (
    <Modal
      transparent
      visible={visible}
      animationType='fade'
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.container}>
            <TouchableOpacity
              onPress={onClose}
              style={{ alignSelf: 'flex-end' }}
            >
              <CloseIcon color={theme.textPrimary} />
            </TouchableOpacity>

            <View style={styles.header}>
              <StyledText style={styles.headerText}>Seleccionar Rol</StyledText>
            </View>

            <SelectableCardGroup
              options={ROLES}
              selectedId={currentRoleId.toString()}
              onSelect={(id) => onSelectRole(parseInt(id))}
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
