import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { View, StyleSheet, Image } from 'react-native';
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
import ImagePicker from '../../common/ImagePicker';

interface FormikSetupProfileFormProps {
  setLoading: (loading: boolean) => void;
}

export default function FormikCompletarPerfilForm({
  setLoading,
}: FormikSetupProfileFormProps) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<string>(''); // Nuevo estado para la posición
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    imagen_perfil: '',
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      setLoading(true);

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

      let jugadorData: CompletarPerfilJugador | null = null;
      if (selectedRole === '5') {
        jugadorData = {
          usuario_id: authUser.id,
          altura_cm: parseInt(values.altura_cm),
          peso_kg: parseInt(values.peso_kg),
          posicion_preferida: values.posicion_preferida as PosicionPreferida,
          dorsal_preferido: parseInt(values.dorsal_preferido),
          descripcion: values.descripcion,
        };
      }

      // Convertir la URI de la imagen a Blob
      let imageBlob: Blob | null = null;
      if (selectedImage) {
        try {
          const response = await fetch(selectedImage);
          const blob = await response.blob();
          // Crear un objeto similar a File (aunque en React Native no existe File)
          imageBlob = new Blob([blob], {
            type: 'image/jpeg', // o el tipo MIME correspondiente
          });
        } catch (error) {
          console.error('Error al procesar la imagen:', error);
          throw new Error('Error al procesar la imagen');
        }
      }

      await usuarioService.createUsuario(userData, jugadorData, imageBlob);
      setError(null);
    } catch (error) {
      console.error('Submit Error:', error);
      setError(error as Error);
    } finally {
      refetchUsuario();
      router.replace('/');
      setLoading(false);
    }
  };

  if (error) {
    return <StyledText>Error: {error.message}</StyledText>;
  }

  const renderProgressIndicator = () => {
    const totalSteps = selectedRole === '5' ? 5 : 2;
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressStep,
                {
                  backgroundColor: index + 1 <= step ? '#4CAF50' : '#E0E0E0',
                },
              ]}
            />
          ))}
        </View>
        <StyledText style={styles.progressText}>
          Paso {step} de {totalSteps}
        </StyledText>
      </View>
    );
  };

  const renderFormContent = ({
    setFieldValue,
  }: {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void;
  }) => {
    switch (step) {
      case 1:
        return (
          <View style={styles.formContent}>
            <StyledText style={styles.stepTitle}>Selecciona tu rol</StyledText>
            <SelectableCardGroup
              options={roles}
              selectedId={selectedRole}
              onSelect={(id) => {
                setSelectedRole(id);
                setFieldValue('rol_id', parseInt(id));
              }}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.formContent}>
            <StyledText style={styles.stepTitle}>
              Información personal
            </StyledText>
            <FormikTextInput name='nombre' placeholder='Nombre' />
            <FormikTextInput name='apellidos' placeholder='Apellidos' />
          </View>
        );
      case 3:
        return selectedRole === '5' ? (
          <View style={styles.formContent}>
            <StyledText style={styles.stepTitle}>
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
          </View>
        ) : null;
      case 4:
        return (
          <View style={styles.formContent}>
            <StyledText style={styles.stepTitle}>
              ¿Cuál es tu posición preferida?
            </StyledText>
            <SelectableCardGroup
              options={POSICIONES_OPCIONES}
              selectedId={selectedPosition}
              onSelect={(id) => {
                setSelectedPosition(id);
                setFieldValue('posicion_preferida', id as PosicionPreferida);
              }}
            />
          </View>
        );
      case 5:
        return (
          <View style={styles.formContent}>
            <StyledText style={styles.stepTitle}>
              Selecciona tu imagen de perfil
            </StyledText>
            <View style={styles.imagePickerContainer}>
              {selectedImage ? (
                <View style={styles.imagePreviewContainer}>
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.imagePreview}
                    resizeMode='cover'
                  />
                  <ImagePicker
                    onImageSelected={(uri) => {
                      setSelectedImage(uri);
                      setFieldValue('imagen_perfil', uri);
                    }}
                    size='small'
                    variant='outline'
                  />
                </View>
              ) : (
                <ImagePicker
                  onImageSelected={(uri) => {
                    setSelectedImage(uri);
                    setFieldValue('imagen_perfil', uri);
                  }}
                  size='large'
                  variant='outline'
                />
              )}
              {selectedImage && (
                <StyledText style={styles.successText}>
                  Imagen seleccionada correctamente
                </StyledText>
              )}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const renderNavigationButtons = ({
    handleSubmit,
  }: {
    handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  }) => {
    const isLastStep = step === (selectedRole === '5' ? 5 : 2);

    return (
      <View style={styles.navigationButtons}>
        {step > 1 && (
          <StyledButton
            title='Atrás'
            onPress={() => setStep(step - 1)}
            variant='outline'
          />
        )}
        <StyledButton
          title={isLastStep ? 'Finalizar' : 'Siguiente'}
          onPress={() => {
            if (isLastStep) {
              handleSubmit();
            } else {
              setStep(step + 1);
            }
          }}
          disabled={
            (step === 1 && !selectedRole) ||
            (step === 4 && !selectedPosition) ||
            (step === 5 && !selectedImage)
          }
        />
      </View>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={CompletarPerfilSchema}
    >
      {(formikProps) => (
        <View style={styles.container}>
          {renderProgressIndicator()}
          {renderFormContent(formikProps)}
          {renderNavigationButtons(formikProps)}
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressStep: {
    flex: 1,
    height: 4,
    marginHorizontal: 2,
    borderRadius: 2,
  },
  progressText: {
    textAlign: 'center',
    marginTop: 8,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formContent: {
    flex: 1,

    marginVertical: 24,
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  successText: {
    marginTop: 8,
    color: '#4CAF50',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
    marginTop: 'auto',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    gap: 16,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
});
