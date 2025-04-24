import { useRouter } from 'expo-router';
import { useAuth } from '@/src/context/authContext';
import { useUserContext } from '@/src/context/userContext';
import PageContainer from '@/src/components/layout/PageContainer';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import ListadoUsuariosScreen from '@/src/screens/admin/listadoUsuariosScreen';

export default function AdministrarUsuarios() {
  const router = useRouter();
  const { authUser } = useAuth();
  const { usuario, loading } = useUserContext();

  if (loading) {
    return <StyledActivityIndicator />;
  }

  if (
    !usuario ||
    !authUser ||
    !['Organizador', 'Coorganizador'].includes(usuario.rol_nombre)
  ) {
    return router.replace('/sinPermisos');
  }

  return (
    <PageContainer>
      <ListadoUsuariosScreen />
    </PageContainer>
  );
}
