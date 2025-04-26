import React from 'react';
import { StyleSheet, View } from 'react-native';
import StyledButton from '../../components/common/StyledButton';
import { router } from 'expo-router';
import FormikLoginForm from '@/src/components/forms/auth/FormikLoginForm';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import StyledText from '@/src/components/common/StyledText';
import { useResponsiveWidth } from '@/src/hooks/useWidth';

export default function LoginScreen() {
  const [isLoading, setIsLoading] = React.useState(false);
  const responsiveWidth = useResponsiveWidth();

  if (isLoading) {
    return <StyledActivityIndicator message='Cargando...' />;
  }

  return (
    <View style={[styles.center, { width: '100%' }]}>
      <View style={{ width: responsiveWidth }}>
        <FormikLoginForm setIsLoading={setIsLoading} />

        <View style={styles.separator} />

        <StyledText style={{ marginBottom: 16 }}>
          ¿No tienes una cuenta?
        </StyledText>

        <StyledButton
          title='Registrarse'
          onPress={() => router.replace('/registro')}
          variant='outline'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  separator: {
    minWidth: '80%',
    height: 2,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
});
