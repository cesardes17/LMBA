import React, { useState } from 'react';
import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';

export default function StyledTextInput({
  editable = true,
  style,
  onBlur,
  onFocus,
  ...rest
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useTheme();

  const getInputState = () => {
    if (!editable) return 'disabled';
    if (isFocused) return 'focused';
    return 'default';
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const inputState = getInputState();

  const getInputStyleByState = () => {
    switch (inputState) {
      case 'focused':
        return theme.input.focused;
      case 'disabled':
        return theme.input.disabled;
      default:
        return theme.input.default;
    }
  };

  const stateStyles = getInputStyleByState();

  return (
    <View style={[styles.container]}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: stateStyles.background,
            borderColor: stateStyles.border,
            color: stateStyles.text,
          },
          style,
        ]}
        placeholderTextColor={stateStyles.placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={editable}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    marginVertical: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    minWidth: '100%',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 16,
  },
});
