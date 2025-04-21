import PageContainer from '@/src/components/layout/PageContainer';
import HeaderConfig from '@/src/components/navigation/HeaderConfig';
import CompletarPerfilScreen from '@/src/screens/auth/CompletarPerfilScreen';

export default function CompletarPerfilPAge() {
  return (
    <PageContainer>
      <HeaderConfig title='Completa Tu Perfil' />
      <CompletarPerfilScreen />
    </PageContainer>
  );
}
