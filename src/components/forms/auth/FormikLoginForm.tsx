import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import FormikTextInput from '../inputs/FomrikTextInput';
import StyledButton from '../../common/StyledButton';
import { loginSchema } from '../../../schemas/auth';
import { useAuth } from '@/src/context/authContext';
import { router } from 'expo-router';

interface FormikRegistroFormProps {
  setIsLoading: (loading: boolean) => void;
}

export default function FormikLoginForm({
  setIsLoading,
}: FormikRegistroFormProps) {
  const { login } = useAuth();
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      setIsLoading(true);
      console.log(values);
      await login(values.email, values.password);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      router.replace('/');
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
      >
        {({ handleSubmit }) => (
          <View style={{ paddingHorizontal: 16 }}>
            <FormikTextInput
              name='email'
              placeholder='Introduce tu email'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
            />
            <FormikTextInput
              name='password'
              placeholder='Introduce tu contraseña'
              secureTextEntry={true}
              autoComplete='off'
              autoCapitalize='none'
              textContentType='oneTimeCode' // This prevents the password suggestion
            />

            <StyledButton title='Iniciar sesión' onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </>
  );
}
