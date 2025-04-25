import PerfilCard from '@/src/components/user/userInfo';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import StyledButton from '@/src/components/common/StyledButton';
import { useAuth } from '@/src/context/authContext';
import { useUserContext } from '@/src/context/userContext';
import { jugadorService } from '@/src/services/jugadorService';
import { Jugador } from '@/src/types/models/Usuario';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useResponsiveWidth } from '@/src/hooks/useWidth';

export default function PerfilScreen() {
  const { usuario, loading } = useUserContext();
  const { logout } = useAuth();
  const [loadingPlayer, setLoadingPlayer] = useState<boolean>(false);
  const [jugador, setJugador] = useState<Jugador | null>(null);
  const responsiveWidth = useResponsiveWidth();

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
    <ScrollView
      style={{
        padding: 16,
        gap: 6,
        width: '100%',
        alignSelf: 'center',
      }}
      contentContainerStyle={{
        width: responsiveWidth,
        alignSelf: 'center',
      }}
    >
      <PerfilCard usuario={usuario} jugador={jugador} />
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
