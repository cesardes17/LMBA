import React, { useState } from 'react';
import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import StyledText from './StyledText';

interface StyledTextInputProps extends TextInputProps {
  error?: string;
}

export default function StyledTextInput({
  error,
  editable = true,
  style,
  onBlur,
  onFocus,
  ...rest
}: StyledTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const getInputState = () => {
    if (!editable) return 'disabled';
    if (error) return 'error';
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
        return {
          backgroundColor: '#fff',
          borderColor: '#007AFF',
          color: '#000',
          placeholderColor: '#aaa',
        };
      case 'error':
        return {
          backgroundColor: '#fff',
          borderColor: '#FF3B30',
          color: '#000',
          placeholderColor: '#aaa',
        };
      case 'disabled':
        return {
          backgroundColor: '#f0f0f0',
          borderColor: '#ccc',
          color: '#999',
          placeholderColor: '#ccc',
        };
      default:
        return {
          backgroundColor: '#fff',
          borderColor: '#ccc',
          color: '#000',
          placeholderColor: '#aaa',
        };
    }
  };

  const stateStyles = getInputStyleByState();

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: stateStyles.backgroundColor,
            borderColor: stateStyles.borderColor,
            color: stateStyles.color,
          },
          style,
        ]}
        placeholderTextColor={stateStyles.placeholderColor}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={editable}
        {...rest}
      />
      {error && <StyledText style={[styles.errorText]}>{error}</StyledText>}
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
    color: '#FF3B30',
    marginTop: 4,
    marginLeft: 16,
  },
});
