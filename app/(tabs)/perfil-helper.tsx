import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/context/authContext';
import { useUserContext } from '@/src/context/userContext';
import PageContainer from '@/src/components/layout/PageContainer';
import PerfilScreen from '@/src/screens/user/PerfilScreen';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';

export default function PerfilHelper() {
  const { authUser, authloading, logoutInProgress } = useAuth();
  const { usuario, loading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (authloading || loading || logoutInProgress) return;

    if (!authUser) {
      router.replace('/(auth)/login');
    } else if (!usuario) {
      router.replace('/(auth)/completar-perfil');
    }
  }, [authUser, authloading, usuario, loading, logoutInProgress, router]);

  if (!authUser || !usuario) {
    return null;
  }

  if (authloading || loading) {
    return <StyledActivityIndicator message='Cargando...' />;
  }

  return (
    <PageContainer>
      <PerfilScreen />
    </PageContainer>
  );
}
