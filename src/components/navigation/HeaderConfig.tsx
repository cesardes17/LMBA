import { Stack, useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/hooks/useTheme';
import StyledText from '../common/StyledText';

interface HeaderConfigProps {
  title: string;
  backLabel?: string;
  backRoute?: string;
}

export default function HeaderConfig({
  title,
  backLabel = 'Inicio',
  backRoute = '/',
}: HeaderConfigProps) {
  const { theme } = useTheme();

  return (
    <Stack.Screen
      options={{
        headerShown: true,
        title: title,
        headerStyle: {
          backgroundColor: theme.backgroundNavigation,
        },
        headerTintColor: theme.textPrimary,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: theme.textPrimary,
        },
        headerLeft: () => (
          <CustomBackButton
            label={backLabel}
            route={backRoute}
            color={theme.textPrimary}
          />
        ),
      }}
    />
  );
}

interface CustomBackButtonProps {
  route?: string;
  label?: string;
  color?: string;
}

function CustomBackButton({
  route,
  label,
  color = '#000',
}: CustomBackButtonProps) {
  const router = useRouter();

  const goBack = () => {
    if (route) {
      router.replace(route);
    } else {
      router.back();
    }
  };

  return (
    <Pressable style={stylesCustomBackButton.button} onPress={goBack}>
      <Ionicons name='arrow-back' size={24} color={color} />
      {label && (
        <StyledText style={[stylesCustomBackButton.label]}>{label}</StyledText>
      )}
    </Pressable>
  );
}

const stylesCustomBackButton = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 16,
    marginLeft: 4,
  },
});
