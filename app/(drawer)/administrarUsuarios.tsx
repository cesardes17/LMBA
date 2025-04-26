import { useEffect } from 'react';
import { router } from 'expo-router';
import PageContainer from '@/src/components/layout/PageContainer';
import { useUserContext } from '@/src/context/userContext';
import ListadoUsuariosScreen from '@/src/screens/admin/ListadoUsuariosScreen';

export default function ListadoUsuariosPage() {
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
      <ListadoUsuariosScreen />
    </PageContainer>
  );
}
