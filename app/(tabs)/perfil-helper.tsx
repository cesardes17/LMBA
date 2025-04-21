import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/context/authContext';
import { useUserContext } from '@/src/context/userContext';
import { ActivityIndicator, View, Text } from 'react-native';
import PageContainer from '@/src/components/layout/PageContainer';
import PerfilScreen from '@/src/screens/user/PerfilScreen';

export default function PerfilHelper() {
  const { authUser, authloading } = useAuth();
  const { usuario, loading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (authloading || loading) return;

    if (!authUser) {
      router.replace('/(auth)/login');
    } else if (!usuario) {
      router.replace('/(auth)/completar-perfil');
    }
  }, [authUser, authloading, usuario, loading, router]);

  if (!authUser || !usuario) {
    return null;
  }

  if (authloading || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  return (
    <PageContainer title='Perfil' showBackButton={false} backLabel='I'>
      <PerfilScreen />
    </PageContainer>
  );
}
