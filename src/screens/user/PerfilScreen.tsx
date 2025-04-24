import PerfilCard from '@/src/components/auth/userInfo';
import { SelectableCardGroup } from '@/src/components/common/SelectableCardGroup';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import StyledButton from '@/src/components/common/StyledButton';
import StyledText from '@/src/components/common/StyledText';
import { useAuth } from '@/src/context/authContext';
import { useUserContext } from '@/src/context/userContext';
import { useTheme } from '@/src/hooks/useTheme';
import { jugadorService } from '@/src/services/jugadorService';
import { Jugador } from '@/src/types/models/Usuario';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

const themeOptions = [
  {
    id: 'system',
    title: 'Sistema',
    description: 'Usar configuración del dispositivo',
  },
  {
    id: 'light',
    title: 'Claro',
    description: 'Tema claro para ambientes luminosos',
  },
  {
    id: 'dark',
    title: 'Oscuro',
    description: 'Tema oscuro para descansar la vista',
  },
];

export default function PerfilScreen() {
  const { usuario, loading } = useUserContext();
  const { logout } = useAuth();
  const { themePreference, setThemePreference } = useTheme();
  const [loadingPlayer, setLoadingPlayer] = useState<boolean>(false);
  const [jugador, setJugador] = useState<Jugador | null>(null);
  useEffect(() => {
    if (usuario?.rol_nombre === 'Jugador') {
      setLoadingPlayer(true);
      jugadorService
        .getJugadorByUsuarioId(usuario.id)
        .then(({ data, error }) => {
          if (error) {
            console.log(error);
            setLoadingPlayer(false);
            return;
          }
          if (!data) {
            setLoadingPlayer(false);

            return;
          }
          setJugador(data);
          setLoadingPlayer(false);
        });
    }
  }, [usuario]);

  if (loading || loadingPlayer) {
    return <StyledActivityIndicator />;
  }

  return (
    <ScrollView style={{ padding: 16, gap: 6 }}>
      <PerfilCard usuario={usuario} jugador={jugador} />
      <StyledText style={{ textAlign: 'center' }}>
        Selecciona el tema de la aplicación aquí:
      </StyledText>
      <SelectableCardGroup
        options={themeOptions}
        selectedId={themePreference}
        onSelect={(id) => setThemePreference(id as 'light' | 'dark' | 'system')}
      />
      <StyledButton
        onPress={async () => {
          await logout();
          router.replace('/');
        }}
        title='Cerrar Sesión'
        variant='danger'
      />
    </ScrollView>
  );
}
