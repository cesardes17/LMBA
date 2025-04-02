import { View, StyleSheet, ViewProps, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';

interface BaseScreenProps extends ViewProps {
  children: React.ReactNode;
  withPadding?: boolean;
}

export default function BaseScreen({
  children,
  withPadding = true,
  style,
  ...props
}: BaseScreenProps) {
  const { colors, theme } = useTheme();
  console.log('theme: ', theme);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      <View
        style={[
          styles.container,
          withPadding && styles.padding,
          style,
          { backgroundColor: colors.background },
        ]}
        {...props}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: {
    padding: 20,
  },
});
