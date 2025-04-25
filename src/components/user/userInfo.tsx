import { Jugador, Usuario } from '@/src/types/models/Usuario';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import StyledText from '../common/StyledText';
import EspectadorCard from './EspectadorCard';
import JugadorCard from './JugadorCard';

interface PerfilCardProps {
  usuario: Usuario | null;
  jugador: Jugador | null;
}

export default function PerfilCard({ usuario, jugador }: PerfilCardProps) {
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
        usuario.rol_nombre === 'Jugador' && jugador ? (
          <JugadorCard jugador={jugador} usuario={usuario} />
        ) : (
          <EspectadorCard usuario={usuario} />
        )
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
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: '100%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
});
