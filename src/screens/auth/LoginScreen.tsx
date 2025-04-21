import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import StyledButton from '../../components/common/StyledButton';
import { router } from 'expo-router';
import FormikLoginForm from '@/src/components/forms/auth/FormikLoginForm';

export default function LoginScreen() {
  const [isLoading, setIsLoading] = React.useState(false);

  if (isLoading) {
    return (
      <View>
        <Text>Cargando...</Text>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <FormikLoginForm setIsLoading={setIsLoading} />

      <View style={styles.separator} />

      <Text style={{ marginBottom: 16 }}>¿No tienes una cuenta?</Text>

      <StyledButton
        title='Registrarse'
        onPress={() => router.replace('/registro')}
        variant='outline'
      />
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
