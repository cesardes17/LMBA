import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { useUserContext } from '../context/userContext';
import RouteList from '../components/navigation/RouteList';

// Definición de roles
type Rol =
  | 'Organizador'
  | 'Coorganizador'
  | 'Árbtiro'
  | 'Capitán'
  | 'Jugador'
  | 'Espectador'
  | '*';

// Definición de la estructura de cada ruta
interface RutaConfig {
  key: string;
  ruta: string;
  nombre: string;
  descripcion: string;
  rolesPermitidos: Rol[];
}

// Array de rutas configurables
const rutas: RutaConfig[] = [
  {
    key: 'adminUsuarios',
    ruta: '/(admin)/listadoUsuarios',
    nombre: 'Administrar usuarios',
    descripcion: 'Gestiona los usuarios de la aplicación',
    rolesPermitidos: ['Organizador', 'Coorganizador'],
  },
  {
    key: 'panelSolicitudes',
    ruta: 'PanelSolicitudes',
    nombre: 'Panel de solicitudes',
    descripcion: 'Revisa y gestiona las solicitudes',
    rolesPermitidos: ['*'],
  },
];

export default function MasScreen() {
  const { usuario } = useUserContext();

  if (!usuario || !usuario.rol_nombre) {
    router.replace('/');
    return null;
  }

  const rutasVisibles = rutas.filter(
    (ruta) =>
      ruta.rolesPermitidos.includes('*') ||
      ruta.rolesPermitidos.includes(usuario.rol_nombre as Rol)
  );

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <RouteList
        rutas={rutasVisibles}
        onPress={(ruta) => router.navigate(ruta)}
      />
    </View>
  );
}
