import StyledText from '@/src/components/common/StyledText';
import PageContainer from '@/src/components/layout/PageContainer';
import HeaderConfig from '@/src/components/navigation/HeaderConfig';
import { View, StyleSheet } from 'react-native';
import StyledButton from '@/src/components/common/StyledButton';
import { router } from 'expo-router';

export default function SinPermisosScreen() {
  return (
    <PageContainer>
      <View style={styles.container}>
        <HeaderConfig title='Acceso Restringido' />
        <StyledText style={styles.title}>
          No tienes permisos suficientes
        </StyledText>
        <StyledText style={styles.description}>
          No tienes los permisos necesarios para acceder a esta sección. Si
          crees que deberías tener acceso, contacta con un administrador.
        </StyledText>
        <StyledButton
          title='Volver al inicio'
          onPress={() => router.replace('/')}
          variant='default'
        />
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
  },
});
