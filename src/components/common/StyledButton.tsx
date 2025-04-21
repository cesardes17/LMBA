import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import StyledText from './StyledText';

interface StyledButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'default' | 'outline';
}

export default function StyledButton({
  title,
  onPress,
  disabled = false,
  variant = 'default',
}: StyledButtonProps) {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const getButtonStyle = () => {
    if (disabled) return theme.button.disabled;
    if (isPressed) return theme.button.active;
    if (variant === 'outline') return theme.button.outline;
    return theme.button.default;
  };

  const buttonStyle = getButtonStyle();

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: buttonStyle.background,
          borderColor: buttonStyle.border,
          borderWidth: variant === 'outline' ? 2 : 1,
        },
        // Aplica sombra si está activa y se ha definido una sombra en el tema
        isPressed && !disabled && buttonStyle.shadow
          ? {
              shadowColor: buttonStyle.shadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }
          : null,
      ]}
    >
      <StyledText style={[styles.text, { color: buttonStyle.text }]}>
        {title}
      </StyledText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
