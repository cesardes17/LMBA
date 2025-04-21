import PerfilCard from '@/src/components/auth/userInfo';
import { SelectableCardGroup } from '@/src/components/common/SelectableCardGroup';
import StyledButton from '@/src/components/common/StyledButton';
import { useAuth } from '@/src/context/authContext';
import { useUserContext } from '@/src/context/userContext';
import { useTheme } from '@/src/hooks/useTheme';
import { router } from 'expo-router';
import { View } from 'react-native';

const themeOptions = [
  {
    id: 'system',
    title: 'Sistema',
    description: 'Usar configuración del dispositivo',
  },
  {
    id: 'light',
    title: 'Claro',
    description: 'Tema claro para ambientes luminosos',
  },
  {
    id: 'dark',
    title: 'Oscuro',
    description: 'Tema oscuro para descansar la vista',
  },
];

export default function PerfilScreen() {
  const { usuario } = useUserContext();
  const { logout } = useAuth();
  const { themePreference, setThemePreference } = useTheme();

  return (
    <View style={{ padding: 16, gap: 24 }}>
      <PerfilCard usuario={usuario} />

      <StyledButton
        onPress={async () => {
          await logout();
          router.replace('/');
        }}
        title='Cerrar Sesión'
      />

      <SelectableCardGroup
        options={themeOptions}
        selectedId={themePreference}
        onSelect={(id) => setThemePreference(id as 'light' | 'dark' | 'system')}
      />
    </View>
  );
}
