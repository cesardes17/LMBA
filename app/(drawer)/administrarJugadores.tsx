import PageContainer from '@/src/components/layout/PageContainer';
import { useUserContext } from '@/src/context/userContext';
import ListadoJugadoresScreen from '@/src/screens/admin/ListadoJugadoresScreen';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function ListadoJugadoresPage() {
  const { usuario } = useUserContext();

  const redirigir =
    !usuario ||
    (usuario.rol_nombre !== 'Organizador' &&
      usuario.rol_nombre !== 'Coorganizador');

  useEffect(() => {
    if (redirigir) {
      router.replace('/');
    }
  }, [redirigir]);

  if (redirigir) {
    return null;
  }

  return (
    <PageContainer>
      <ListadoJugadoresScreen />
    </PageContainer>
  );
}
