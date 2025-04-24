import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { SubirImagenIcon } from '@/src/constants/icons';
import * as ExpoImagePicker from 'expo-image-picker';

interface ImagePickerProps {
  onImageSelected: (imageUri: string) => void;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'danger';
  size?: 'small' | 'default' | 'large';
}

export default function ImagePicker({
  onImageSelected,
  disabled = false,
  variant = 'default',
  size = 'default',
}: ImagePickerProps) {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const getButtonStyle = () => {
    if (disabled) return theme.button.disabled;
    if (variant === 'danger') {
      if (isPressed) return theme.button.dangerActive;
      return theme.button.danger;
    }
    if (isPressed) return theme.button.active;
    if (variant === 'outline') return theme.button.outline;
    return theme.button.default;
  };

  const buttonStyle = getButtonStyle();

  const sizeStyles = {
    small: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      minWidth: 100,
    },
    default: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      minWidth: 150,
    },
    large: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      minWidth: 200,
    },
  };

  const pickImage = async () => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <Pressable
      onPress={disabled ? undefined : pickImage}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      style={[
        styles.button,
        sizeStyles[size],
        {
          backgroundColor: buttonStyle.background,
          borderColor: buttonStyle.border,
          borderWidth: variant === 'outline' ? 2 : 1,
        },
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
      <SubirImagenIcon size={24} color={buttonStyle.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
