// src/hooks/useTheme.ts
import { useThemeContext } from '@/src/context/themeContext';

export const useTheme = () => {
  const { theme, themePreference, setThemePreference, isDark } =
    useThemeContext();
  return { theme, themePreference, setThemePreference, isDark };
};
