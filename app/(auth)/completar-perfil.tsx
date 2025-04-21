import PageContainer from '@/src/components/layout/PageContainer';
import CompletarPerfilScreen from '@/src/screens/auth/CompletarPerfilScreen';

export default function CompletarPerfilPAge() {
  return (
    <PageContainer
      title='Completa Tu Perfil'
      showBackButton={true}
      backLabel='Inicio'
      backRoute='/'
    >
      <CompletarPerfilScreen />
    </PageContainer>
  );
}
