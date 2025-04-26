import React from 'react';
import FormikRegistroForm from '../../components/forms/auth/FormikRegistroForm';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import { View } from 'react-native';
import { useResponsiveWidth } from '@/src/hooks/useWidth';

export default function RegistroScreen() {
  const [isLoading, setIsLoading] = React.useState(false);
  const responsiveWidth = useResponsiveWidth();

  if (isLoading) {
    return <StyledActivityIndicator message='Cargando...' />;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <View style={{ width: responsiveWidth }}>
        <FormikRegistroForm setIsLoading={setIsLoading} />
      </View>
    </View>
  );
}
