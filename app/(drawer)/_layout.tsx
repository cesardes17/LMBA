import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useAuth } from '@/src/context/authContext';
import { useUserContext } from '@/src/context/userContext';

export default function Layout() {
  const { authUser } = useAuth();
  const { usuario } = useUserContext();
  return (
    <GestureHandlerRootView>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: '#0000ff',
        }}
      >
        <Drawer.Screen name='index' options={{ title: 'Inicio' }} />
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
