import PageContainer from '@/src/components/layout/PageContainer';
import { useUserContext } from '@/src/context/userContext';
import ListadoUsuariosScreen from '@/src/screens/admin/ListadoUsuariosScreen';
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
      <ListadoUsuariosScreen />
    </PageContainer>
  );
}
