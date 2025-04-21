import PageContainer from '@/src/components/layout/PageContainer';
import LoginScreen from '@/src/screens/auth/LoginScreen';
import { View } from 'react-native';

export default function LoginPage() {
  return (
    <PageContainer
      title='Inicia Sesión'
      showBackButton={true}
      backLabel='Inicio'
      backRoute='/'
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoginScreen />
      </View>
    </PageContainer>
  );
}
