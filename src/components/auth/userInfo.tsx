import { Usuario } from '@/src/types/models/Usuario';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import StyledText from '../common/StyledText';
interface PerfilCardProps {
  usuario: Usuario | null;
}

export default function PerfilCard({ usuario }: PerfilCardProps) {
  const { theme } = useTheme();

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
      {usuario ? (
        <>
          <StyledText style={[styles.title, { color: theme.textPrimary }]}>
            Información del perfil:
          </StyledText>
          <StyledText style={{ color: theme.textPrimary }}>
            Nombre: {usuario.nombre}
          </StyledText>
          <StyledText style={{ color: theme.textPrimary }}>
            Apellidos: {usuario.apellidos}
          </StyledText>
          <StyledText style={{ color: theme.textPrimary }}>
            Rol: {usuario.rol_nombre}
          </StyledText>
        </>
      ) : (
        <StyledText style={[styles.title, { color: theme.textPrimary }]}>
          No hay información del perfil.
        </StyledText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
});
