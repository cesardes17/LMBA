import { SelectableCardGroup } from '@/src/components/common/SelectableCardGroup';
import StyledText from '@/src/components/common/StyledText';
import { useTheme } from '@/src/hooks/useTheme';
import { ScrollView } from 'react-native';
import { useResponsiveWidth } from '@/src/hooks/useWidth';

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

export default function AjustesScreen() {
  const { themePreference, setThemePreference } = useTheme();
  const responsiveWidth = useResponsiveWidth();

  return (
    <ScrollView
      style={{ padding: 16, gap: 6 }}
      contentContainerStyle={{
        width: responsiveWidth,
        alignSelf: 'center',
      }}
    >
      <StyledText style={{ textAlign: 'center' }}>
        Selecciona el tema de la aplicación aquí:
      </StyledText>
      <SelectableCardGroup
        options={themeOptions}
        selectedId={themePreference}
        onSelect={(id) => setThemePreference(id as 'light' | 'dark' | 'system')}
      />
    </ScrollView>
  );
}
