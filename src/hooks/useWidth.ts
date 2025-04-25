import { useWindowDimensions, DimensionValue } from 'react-native';

export function useResponsiveWidth(): DimensionValue {
  const { width } = useWindowDimensions();

  if (width >= 1280) return '40%'; // Pantallas grandes
  if (width >= 1024) return '60%'; // Portátiles
  if (width >= 768) return '80%'; // Tablet
  return '100%'; // Móvil
}
