import PageContainer from '@/src/components/layout/PageContainer';
import HeaderConfig from '@/src/components/navigation/HeaderConfig';
import LoginScreen from '@/src/screens/auth/LoginScreen';
import { View } from 'react-native';

export default function LoginPage() {
  return (
    <PageContainer>
      <HeaderConfig title='Inicia Sesión' />
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
