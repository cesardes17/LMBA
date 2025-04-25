import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledText from './StyledText';
import { useTheme } from '@/src/hooks/useTheme';

interface StyledAlertProps {
  children: React.ReactNode;
  variant?: 'error' | 'warning' | 'success' | 'info';
}

export default function StyledAlert({
  children,
  variant = 'error',
}: StyledAlertProps) {
  const { theme } = useTheme();

  const getVariantStyles = () => {
    const styles = {
      error: {
        backgroundColor: '#FEF2F2',
        borderColor: '#FCA5A5',
        textColor: '#991B1B',
      },
      warning: {
        backgroundColor: '#FFFBEB',
        borderColor: '#FCD34D',
        textColor: '#92400E',
      },
      success: {
        backgroundColor: '#F0FDF4',
        borderColor: '#86EFAC',
        textColor: '#166534',
      },
      info: {
        backgroundColor: '#EFF6FF',
        borderColor: '#93C5FD',
        textColor: '#1E40AF',
      },
    };
    return styles[variant];
  };

  const variantStyles = getVariantStyles();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
        },
      ]}
    >
      <StyledText style={[styles.text, { color: variantStyles.textColor }]}>
        {children}
      </StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 8,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});
