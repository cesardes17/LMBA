import PerfilCard from '@/src/components/auth/userInfo';
import StyledButton from '@/src/components/common/StyledButton';
import { useAuth } from '@/src/context/authContext';
import { useUserContext } from '@/src/context/userContext';
import { router } from 'expo-router';
import { View } from 'react-native';

export default function PerfilScreen() {
  const { usuario } = useUserContext();
  const { logout } = useAuth();
  return (
    <View>
      <PerfilCard usuario={usuario} />
      <StyledButton
        onPress={() => {
          logout();
          router.replace('/');
        }}
        title='Cerrar Sesión'
      />
    </View>
  );
}
