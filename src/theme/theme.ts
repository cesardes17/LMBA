import { colors } from './colors';

interface ThemeColors {
  background: string;
  color: string;
  colorIcon: string;
  inactiveIconColor: string;
  borderColor: string;
  textColor: string;
  // Button
  buttonbackgroundColor: string;
  buttonTextColor: string;
  buttonBorderColor: string;
  // Inputs
  inputBackgroundColor: string;
  inputBorderColor: string;
  inputTextColor: string;
  inputFocusedBackgroundColor: string;
  inputErrorBackgroundColor?: string;
  inputErrorBorderColor?: string;
  inputErrorTextColor?: string;
}

interface ThemeType {
  light: ThemeColors;
  dark: ThemeColors;
}

export const themes: ThemeType = {
  light: {
    background: colors.lightBackground,
    color: colors.color500,
    colorIcon: colors.color700,
    inactiveIconColor: colors.color500,
    borderColor: colors.color800,
    textColor: colors.color950,
    buttonbackgroundColor: colors.color200,
    buttonTextColor: colors.color950,
    buttonBorderColor: colors.color950,
    inputBackgroundColor: colors.color050,
    inputBorderColor: colors.color500,
    inputTextColor: colors.color950,
    inputFocusedBackgroundColor: colors.color200,
  },
  dark: {
    background: colors.darkBackground,
    color: colors.color500,
    colorIcon: colors.color500,
    inactiveIconColor: colors.color700,
    borderColor: colors.color300,
    textColor: colors.color200,
    buttonbackgroundColor: colors.color200,
    buttonTextColor: colors.color950,
    buttonBorderColor: colors.color950,
    inputBackgroundColor: colors.color050,
    inputBorderColor: colors.color500,
    inputTextColor: colors.color950,
    inputFocusedBackgroundColor: colors.color200,
    inputErrorBackgroundColor: colors.errorLight,
    inputErrorBorderColor: colors.errorStrong,
    inputErrorTextColor: colors.errorText,
  },
};

export type ThemeNames = keyof typeof themes;
export type Theme = typeof themes.light | typeof themes.dark;