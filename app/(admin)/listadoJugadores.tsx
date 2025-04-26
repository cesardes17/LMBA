import { useEffect } from 'react';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import PageContainer from '@/src/components/layout/PageContainer';
import HeaderConfig from '@/src/components/navigation/HeaderConfig';
import ListadoJugadoresScreen from '@/src/screens/admin/ListadoJugadoresScreen';
import { useUserContext } from '@/src/context/userContext';

export default function ListadoJugadoresPage() {
  const { usuario, loading } = useUserContext();

  useEffect(() => {
    if (
      !loading &&
      (!usuario ||
        (usuario.rol_nombre !== 'Organizador' &&
          usuario.rol_nombre !== 'Coorganizador'))
    ) {
      router.replace('/');
    }
  }, [usuario, loading]);

  if (loading) {
    return <StyledActivityIndicator />;
  }

  if (
    !usuario ||
    (usuario.rol_nombre !== 'Organizador' &&
      usuario.rol_nombre !== 'Coorganizador')
  ) {
    return null;
  }

  return (
    <PageContainer>
      <HeaderConfig title='Listado de Jugadores' backLabel='Más' />
      <ListadoJugadoresScreen />
    </PageContainer>
  );
}
