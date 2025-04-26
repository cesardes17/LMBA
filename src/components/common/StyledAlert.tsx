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
        backgroundColor: `${theme.error}15`,
        borderColor: theme.error,
        textColor: theme.error,
      },
      warning: {
        backgroundColor: `${theme.warning}15`,
        borderColor: theme.warning,
        textColor: theme.warning,
      },
      success: {
        backgroundColor: `${theme.success}15`,
        borderColor: theme.success,
        textColor: theme.success,
      },
      info: {
        backgroundColor: `${theme.info}15`,
        borderColor: theme.info,
        textColor: theme.info,
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
