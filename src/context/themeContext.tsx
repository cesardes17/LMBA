// src/context/themeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, ColorSchemeName, useColorScheme } from 'react-native';
import { Theme, darkTheme, lightTheme } from '@/src/theme/theme';

type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  theme: Theme;
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const THEME_KEY = 'user_theme_preference';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme(); // light | dark | null
  const [themePreference, setThemePreferenceState] =
    useState<ThemePreference>('system');
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  const applyTheme = (
    preference: ThemePreference,
    scheme: ColorSchemeName | null
  ) => {
    if (preference === 'system') {
      setIsDark(scheme === 'dark');
    } else {
      setIsDark(preference === 'dark');
    }
  };

  const setThemePreference = async (preference: ThemePreference) => {
    await AsyncStorage.setItem(THEME_KEY, preference);
    setThemePreferenceState(preference);
    applyTheme(preference, Appearance.getColorScheme());
  };

  // Cargar preferencia guardada
  useEffect(() => {
    const loadThemePreference = async () => {
      const stored = await AsyncStorage.getItem(THEME_KEY);
      const pref: ThemePreference =
        stored === 'light' || stored === 'dark' ? stored : 'system';
      setThemePreferenceState(pref);
      applyTheme(pref, systemColorScheme);
    };
    loadThemePreference();
  }, [systemColorScheme]);

  // Detectar cambios en el sistema si la preferencia es system
  useEffect(() => {
    if (themePreference === 'system') {
      const listener = Appearance.addChangeListener(({ colorScheme }) => {
        applyTheme('system', colorScheme);
      });
      return () => listener.remove();
    }
  }, [themePreference]);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{ theme, themePreference, setThemePreference, isDark }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext debe usarse dentro de ThemeProvider');
  }
  return context;
};
