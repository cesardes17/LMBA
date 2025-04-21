import PageContainer from '@/src/components/layout/PageContainer';
import RegistroScreen from '../../src/screens/auth/RegistroScreen';

export default function RegistroPage() {
  return (
    <PageContainer
      title='Crea una cuenta'
      showBackButton={true}
      backLabel='Inicio'
      backRoute='/'
    >
      <RegistroScreen />
    </PageContainer>
  );
}
