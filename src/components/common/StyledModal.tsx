import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import StyledButton from './StyledButton';

interface StyledModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isForm?: boolean;
  onSaveForm?: () => void;
}

export default function StyledModal({
  visible,
  onClose,
  children,
  isForm = false,
  onSaveForm,
}: StyledModalProps) {
  const { theme } = useTheme();

  return (
    <Modal
      visible={visible}
      animationType='fade'
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.overlay]}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalContent,
                {
                  backgroundColor: theme.cardBackground,
                  shadowColor: theme.primary + '33',
                },
              ]}
            >
              {children}
              <View style={[styles.footer, !isForm && styles.centerFooter]}>
                <StyledButton
                  title='Cerrar'
                  onPress={onClose}
                  variant='danger'
                  size='small'
                />
                {isForm && (
                  <StyledButton
                    title='Guardar'
                    onPress={() => onSaveForm && onSaveForm()}
                    size='small'
                  />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 320,
    padding: 24,
    borderRadius: 16,
    elevation: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  centerFooter: {
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 8, // Reducido de 10 a 8
    paddingHorizontal: 24, // Reducido de 32 a 24
    borderRadius: 16, // Reducido de 24 a 16
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100, // Reducido de 120 a 100
  },
});
