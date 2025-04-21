import React from 'react';
import FormikRegistroForm from '../../components/forms/auth/FormikRegistroForm';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';

export default function RegistroScreen() {
  const [isLoading, setIsLoading] = React.useState(false);

  if (isLoading) {
    return <StyledActivityIndicator message='Cargando...' />;
  }

  return <FormikRegistroForm setIsLoading={setIsLoading} />;
}
