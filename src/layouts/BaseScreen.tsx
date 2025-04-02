import { View, StyleSheet, ViewProps, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

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
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View 
        style={[
          styles.container,
          withPadding && styles.padding,
          style
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
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  padding: {
    padding: 20,
  },
});