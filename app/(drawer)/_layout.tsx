import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useAuth } from '@/src/context/authContext';
import { useUserContext } from '@/src/context/userContext';
import { useTheme } from '@/src/hooks/useTheme';

export default function Layout() {
  const { authUser } = useAuth();
  const { usuario } = useUserContext();
  const { theme } = useTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerType: 'front',
          swipeEdgeWidth: 100,
          headerTintColor: theme.textPrimary, // <- esto cambia el color del icono del Drawer

          drawerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.textPrimary,
            textAlign: 'center',
          },
          drawerActiveTintColor: theme.activeElement,
          drawerInactiveTintColor: theme.inactiveElement,
        }}
      >
        <Drawer.Screen name='index' options={{ title: 'Inicio' }} />
        <Drawer.Screen name='partidos' options={{ title: 'Partidos' }} />
        <Drawer.Screen
          name='clasificacion'
          options={{ title: 'Clasificación' }}
        />
        <Drawer.Screen
          name='perfil-helper'
          options={{
            title: !authUser
              ? 'Login'
              : !usuario
                ? 'Completar perfil'
                : 'Perfil',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
