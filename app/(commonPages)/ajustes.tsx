import PageContainer from '@/src/components/layout/PageContainer';
import HeaderConfig from '@/src/components/navigation/HeaderConfig';
import AjustesScreen from '@/src/screens/AjustesScreen';

export default function AjustesPage() {
  return (
    <PageContainer>
      <HeaderConfig
        title='Ajustes'
        backLabel='Más'
        backRoute='/(tabs)/navigation'
      />
      <AjustesScreen />
    </PageContainer>
  );
}
