// app/(admin)/listadoJugadores/index.tsx
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import PageContainer from '@/src/components/layout/PageContainer';
import HeaderConfig from '@/src/components/navigation/HeaderConfig';
import ListadoJugadoresScreen from '@/src/screens/admin/ListadoJugadoresScreen';
import { useUserContext } from '@/src/context/userContext';

export default function ListadoUsuariosPage() {
  const { usuario, loading } = useUserContext();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (
      !loading &&
      (!usuario ||
        (usuario.rol_nombre !== 'Organizador' &&
          usuario.rol_nombre !== 'Coorganizador'))
    ) {
      setShouldRedirect(true);
    }
  }, [usuario, loading]);

  useEffect(() => {
    if (shouldRedirect) {
      router.replace('/');
    }
  }, [shouldRedirect]);

  if (loading) {
    return <StyledActivityIndicator />;
  }

  if (shouldRedirect) {
    return null;
  }

  return (
    <PageContainer>
      <HeaderConfig title='Listado de Jugadores' />
      <ListadoJugadoresScreen />
    </PageContainer>
  );
}
