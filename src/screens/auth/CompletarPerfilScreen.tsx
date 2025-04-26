import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import StyledText from '@/src/components/common/StyledText';
import FormikCompletarPerfilForm from '@/src/components/forms/auth/FormikCompletarPerfilForm';
import { useAuth } from '@/src/context/authContext';
import { useUserContext } from '@/src/context/userContext';
import { useResponsiveWidth } from '@/src/hooks/useWidth';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

export default function CompletarPerfilScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { usuario, loading } = useUserContext();
  const { authUser, authloading } = useAuth();
  const responsiveWidth = useResponsiveWidth();

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
    return <StyledActivityIndicator message='Creando Perfil...' />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <View style={{ width: responsiveWidth }}>
        <StyledText>
          Bienvenido, Completa el registro: {authUser.email}
        </StyledText>
        <FormikCompletarPerfilForm setLoading={setIsLoading} />
      </View>
    </View>
  );
}
