import { Usuario } from '@/src/types/models/Usuario';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import StyledText from '../common/StyledText';

interface UsuarioCardProps {
  usuario: Usuario;
  onEdit: (usuario: Usuario) => void;
  onBan: (usuario: Usuario) => void;
}

export const UserCardList: React.FC<UsuarioCardProps> = ({
  usuario,
  onEdit,
  onBan,
}) => {
  const { theme } = useTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBackground,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.infoContainer}>
        <StyledText style={[styles.name, { color: theme.textPrimary }]}>
          {usuario.nombre} {usuario.apellidos}
        </StyledText>
        <StyledText style={[styles.email, { color: theme.textSecondary }]}>
          {usuario.email}
        </StyledText>
        <View style={styles.detailsRow}>
          <StyledText style={[styles.role, { color: theme.textSecondary }]}>
            Rol:{' '}
            <StyledText style={[styles.value, { color: theme.textPrimary }]}>
              {usuario.rol_nombre}
            </StyledText>
          </StyledText>
          <StyledText style={[styles.date, { color: theme.textSecondary }]}>
            Creado:{' '}
            <StyledText style={[styles.value, { color: theme.textPrimary }]}>
              {formatDate(usuario.creado_en)}
            </StyledText>
          </StyledText>
        </View>
        <View style={styles.statusContainer}>
          <StyledText
            style={[
              styles.status,
              {
                backgroundColor: usuario.activo
                  ? theme.success + '22'
                  : theme.error + '22',
                color: usuario.activo ? theme.success : theme.error,
                borderColor: usuario.activo ? theme.success : theme.error,
              },
            ]}
          >
            {usuario.activo ? 'Activo' : 'Inactivo'}
          </StyledText>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: theme.button.default.background,
              borderColor: theme.button.default.border,
            },
          ]}
          onPress={() => onEdit(usuario)}
        >
          <StyledText
            style={[styles.buttonText, { color: theme.button.default.text }]}
          >
            Editar
          </StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: usuario.activo
                ? theme.button.danger.background
                : theme.button.default.background,
              borderColor: usuario.activo
                ? theme.button.danger.border
                : theme.button.default.border,
            },
          ]}
          onPress={() => onBan(usuario)}
        >
          <StyledText
            style={[
              styles.buttonText,
              {
                color: usuario.activo
                  ? theme.button.danger.text
                  : theme.button.default.text,
              },
            ]}
          >
            {usuario.activo ? 'Banear' : 'Activar'}
          </StyledText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoContainer: {
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  role: {
    fontSize: 14,
  },
  date: {
    fontSize: 14,
  },
  value: {
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  status: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    overflow: 'hidden',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 14,
  },
});
