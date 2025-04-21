import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import StyledButton from '../../common/StyledButton';
import FormikTextInput from '../inputs/FomrikTextInput';
import { CompletarPerfilSchema } from '../../../schemas/auth';
import { usuarioService } from '../../../services/usuarioService';
import { router } from 'expo-router';
import { rolesService } from '@/src/services/rolesServices';
import { useAuth } from '@/src/context/authContext';
import { Option, SelectableCardGroup } from '../../common/SelectableCardGroup';
import {
  CompletarPerfilJugador,
  CompletarPerfilUsuario,
} from '@/src/types/auth';
import { PosicionPreferida } from '@/src/types/enums/Posicion';
import { POSICIONES_OPCIONES } from '@/src/constants/posiciones';
import { useUserContext } from '@/src/context/userContext';
import StyledText from '../../common/StyledText';

interface FormikSetupProfileFormProps {
  setLoading: (loading: boolean) => void;
}

export default function FormikCompletarPerfilForm({
  setLoading,
}: FormikSetupProfileFormProps) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<string>(''); // Nuevo estado para la posición
  const { authUser } = useAuth();
  const { refetchUsuario } = useUserContext();
  const [roles, setRoles] = useState<Option[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data, error } = await rolesService.getRolesRegistros();

        if (error) {
          console.error(error);
          setError(error);
          return;
        }
        if (!data) {
          console.error('No data returned');
          setError(new Error('No data returned'));
          return;
        }

        const options: Option[] = data.map((role) => ({
          id: role.id.toString(), // Convert number to string since Option.id is string
          title: role.nombre,
          description: role.descripcion || '',
        }));

        setRoles(options);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoles();
  }, [setError]);

  // Update initialValues to match the database fields
  const initialValues = {
    rol_id: '',
    nombre: '',
    apellidos: '',
    posicion_preferida: '',
    altura_cm: '',
    peso_kg: '',
    descripcion: '',
    dorsal_preferido: '',
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      setLoading(true);

      console.log('Form Values:', values);
      console.log('Selected Role:', selectedRole);

      if (!authUser) {
        throw new Error('no hay usuario');
      }

      const userData: CompletarPerfilUsuario = {
        id: authUser.id,
        email: authUser.email,
        nombre: values.nombre,
        apellidos: values.apellidos,
        rol_id: parseInt(selectedRole),
      };
      console.log('User Data:', userData);

      let jugadorData: CompletarPerfilJugador | null = null;
      if (selectedRole === '5') {
        jugadorData = {
          usuario_id: authUser.id,
          altura_cm: parseInt(values.altura_cm),
          peso_kg: parseInt(values.peso_kg),
          posicion_preferida: values.posicion_preferida as PosicionPreferida,
          dorsal_preferido: parseInt(values.dorsal_preferido),
          descripcion: values.descripcion, // Add the optional description
        };
        console.log('Player Data:', jugadorData);
      }
      console.log('Creando jugador');
      await usuarioService.createUsuario(userData, jugadorData);
      setLoading(true);
      setError(null);
      // TODO: Add API call here
    } catch (error) {
      console.error('Submit Error:', error);
      setError(error as Error);
    } finally {
      refetchUsuario();
      router.replace('/'); // Redirect to home page
      setLoading(false);
    }
  };

  if (error) {
    return <StyledText>Error: {error.message}</StyledText>;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={CompletarPerfilSchema}
    >
      {({ handleSubmit, setFieldValue }) => (
        <View style={{ paddingHorizontal: 16 }}>
          {step === 1 && (
            <>
              <StyledText style={{ marginBottom: 16 }}>
                Selecciona tu rol
              </StyledText>
              <SelectableCardGroup
                options={roles}
                selectedId={selectedRole}
                onSelect={(id) => {
                  setSelectedRole(id);
                  setFieldValue('rol_id', parseInt(id));
                }}
              />
              <StyledButton
                title='Siguiente'
                onPress={() => setStep(2)}
                disabled={!selectedRole}
              />
            </>
          )}
          {step === 2 && (
            <>
              <StyledText style={{ marginBottom: 16 }}>
                Información personal
              </StyledText>
              <FormikTextInput name='nombre' placeholder='Nombre' />
              <FormikTextInput name='apellidos' placeholder='Apellidos' />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 8,
                  marginTop: 16,
                }}
              >
                <StyledButton
                  title='Atrás'
                  onPress={() => setStep(1)}
                  variant='outline'
                />
                <StyledButton
                  title={selectedRole === '5' ? 'Siguiente' : 'Finalizar'}
                  onPress={() => {
                    if (selectedRole === '5') {
                      setStep(3);
                    } else {
                      handleSubmit();
                    }
                  }}
                />
              </View>
            </>
          )}
          {step === 3 && (
            <>
              <StyledText style={{ marginBottom: 16 }}>
                Información del jugador
              </StyledText>
              <FormikTextInput
                name='altura_cm'
                placeholder='Altura (cm)'
                keyboardType='numeric'
              />
              <FormikTextInput
                name='peso_kg'
                placeholder='Peso (kg)'
                keyboardType='numeric'
              />
              <FormikTextInput
                name='dorsal_preferido'
                placeholder='Dorsal preferido'
                keyboardType='numeric'
              />
              <FormikTextInput
                name='descripcion'
                placeholder='Descripción (opcional)'
                multiline
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 8,
                  marginTop: 16,
                }}
              >
                <StyledButton
                  title='Atrás'
                  onPress={() => setStep(2)}
                  variant='outline'
                />
                <StyledButton
                  title={'Siguiente'}
                  onPress={() => {
                    setStep(4);
                  }}
                />
              </View>
            </>
          )}
          {step === 4 && (
            <>
              <StyledText style={{ marginBottom: 16 }}>
                ¿Cual es tu posicion preferida?
              </StyledText>
              <SelectableCardGroup
                options={POSICIONES_OPCIONES}
                selectedId={selectedPosition}
                onSelect={(id) => {
                  setSelectedPosition(id);
                  setFieldValue('posicion_preferida', id as PosicionPreferida);
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 8,
                  marginTop: 16,
                }}
              >
                <StyledButton
                  title='Atrás'
                  onPress={() => setStep(3)}
                  variant='outline'
                />
                <StyledButton title='Finalizar' onPress={handleSubmit} />
              </View>
            </>
          )}
        </View>
      )}
    </Formik>
  );
}
