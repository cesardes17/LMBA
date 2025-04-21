import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

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
  const [isPressed, setIsPressed] = useState(false);

  const getButtonStyle = () => {
    if (disabled) {
      return {
        backgroundColor: '#e0e0e0',
        borderColor: '#c0c0c0',
        textColor: '#888',
      };
    }

    if (variant === 'outline') {
      return {
        backgroundColor: 'transparent',
        borderColor: '#007AFF',
        textColor: '#007AFF',
      };
    }

    if (isPressed) {
      return {
        backgroundColor: '#005BBB',
        borderColor: '#005BBB',
        textColor: '#fff',
      };
    }

    return {
      backgroundColor: '#007AFF',
      borderColor: '#007AFF',
      textColor: '#fff',
    };
  };

  const stylesByState = getButtonStyle();

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: stylesByState.backgroundColor,
          borderColor: stylesByState.borderColor,
          borderWidth: variant === 'outline' ? 2 : 1,
        },
        isPressed && !disabled && styles.shadow,
      ]}
    >
      <Text style={[styles.text, { color: stylesByState.textColor }]}>
        {title}
      </Text>
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
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
