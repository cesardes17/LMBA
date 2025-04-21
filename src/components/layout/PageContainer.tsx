import { Stack } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface PageContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  title: string;
  showBackButton?: boolean;
  backLabel?: string;
  backRoute?: string;
}

export default function PageContainer({
  children,
  style,
  title,
  backLabel = '',
  backRoute = '',
  showBackButton = false,
}: PageContainerProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: title,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () =>
            showBackButton ? (
              <CustomBackButton label={backLabel} route={backRoute} />
            ) : null,
        }}
      />
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Puedes personalizarlo o eliminarlo si usas tema
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

interface CustomBackButtonProps {
  route?: string;
  label?: string;
}

function CustomBackButton({ route, label }: CustomBackButtonProps) {
  const router = useRouter();

  const goBack = () => {
    if (route) {
      router.replace(route);
    } else {
      router.back(); // retrocede a la página anterior
    }
  };

  return (
    <Pressable style={stylesCustomBackButton.button} onPress={goBack}>
      <Ionicons name='arrow-back' size={24} color='#fff' />
      {label && <Text style={stylesCustomBackButton.label}>{label}</Text>}
    </Pressable>
  );
}

const stylesCustomBackButton = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 4,
  },
});
