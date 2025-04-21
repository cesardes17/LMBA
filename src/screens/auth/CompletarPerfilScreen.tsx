import FormikCompletarPerfilForm from '@/src/components/forms/auth/FormikCompletarPerfilForm';
import { useAuth } from '@/src/context/authContext';
import { useUserContext } from '@/src/context/userContext';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function CompletarPerfilScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const { usuario, loading } = useUserContext();
  const { authUser, authloading } = useAuth();

  useEffect(() => {
    if (authUser && usuario && !loading && !authloading) {
      // If user has a complete profile, redirect to profile screen
      router.replace('/');
    }
  }, [authUser, usuario, loading, authloading]);

  if (!authUser) {
    return null;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Creando Perfil...</Text>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenido, Completa el registro: {authUser.email}</Text>
      <FormikCompletarPerfilForm setLoading={setIsLoading} />
    </View>
  );
}
