import PageContainer from '@/src/components/layout/PageContainer';
import RegistroScreen from '../../src/screens/auth/RegistroScreen';
import HeaderConfig from '@/src/components/navigation/HeaderConfig';

export default function RegistroPage() {
  return (
    <PageContainer>
      <HeaderConfig title='Crea Una Cuenta' />
      <RegistroScreen />
    </PageContainer>
  );
}
