import { Tabs } from 'expo-router';
import { useAuth } from '@/src/context/authContext';
import { useUserContext } from '@/src/context/userContext';
import {
  HomeIcon,
  PerfilIcon,
  LoginIcon,
  CompletarPerfilIcon,
} from '@/src/constants/icons';

export default function TabsLayout() {
  const { authUser } = useAuth();
  const { usuario } = useUserContext();

  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name='perfil-helper'
        options={{
          title: !authUser ? 'Login' : !usuario ? 'Completar perfil' : 'Perfil',
          tabBarIcon: ({ color, size }) =>
            !authUser ? (
              <LoginIcon color={color} size={size} />
            ) : !usuario ? (
              <CompletarPerfilIcon color={color} size={size} />
            ) : (
              <PerfilIcon color={color} size={size} />
            ),
        }}
      />
    </Tabs>
  );
}
