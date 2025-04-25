import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import { useUserContext } from '@/src/context/userContext';
import { Redirect } from 'expo-router';
import { Platform } from 'react-native';

export default function IndexRoot() {
  const { loading } = useUserContext();

  if (loading) {
    return <StyledActivityIndicator />;
  }

  const ruta = Platform.OS === 'web' ? '/(drawer)/' : '/(tabs)/';

  return <Redirect href={ruta} />;
}
