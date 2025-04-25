import PageContainer from '@/src/components/layout/PageContainer';
import HeaderConfig from '@/src/components/navigation/HeaderConfig';
import { useUserContext } from '@/src/context/userContext';
import ListadoJugadoresScreen from '@/src/screens/admin/ListadoJugadoresScreen';
import { router } from 'expo-router';

export default function ListadoUsuariosPage() {
  const { usuario } = useUserContext();

  if (
    !usuario ||
    (usuario.rol_nombre !== 'Organizador' &&
      usuario.rol_nombre !== 'Coorganizador')
  ) {
    return router.replace('/');
  }

  return (
    <PageContainer>
      <HeaderConfig title='Listado de Jugadores' />
      <ListadoJugadoresScreen />
    </PageContainer>
  );
}
