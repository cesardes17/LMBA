import { useTheme } from '@/src/hooks/useTheme';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native';

interface PageContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function PageContainer({ children, style }: PageContainerProps) {
  const { isDark, theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View
        style={[
          styles.container,
          { backgroundColor: theme.backgroundColor },
          style,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
