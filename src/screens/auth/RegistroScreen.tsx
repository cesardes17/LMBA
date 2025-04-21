import React from 'react';
import FormikRegistroForm from '../../components/forms/auth/FormikRegistroForm';
import { ActivityIndicator, Text, View } from 'react-native';

export default function RegistroScreen() {
  const [isLoading, setIsLoading] = React.useState(false);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  return <FormikRegistroForm setIsLoading={setIsLoading} />;
}
