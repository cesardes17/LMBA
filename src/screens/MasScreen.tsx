import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { useUserContext } from '../context/userContext';
import RouteList from '../components/navigation/RouteList';
import StyledText from '../components/common/StyledText';

// Definición de roles
type Rol =
  | 'Organizador'
  | 'Coorganizador'
  | 'Árbtiro'
  | 'Capitán'
  | 'Jugador'
  | 'Espectador'
  | '*-logged'
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
    nombre: 'Administrar Usuarios',
    descripcion: 'Gestiona los usuarios de la aplicación',
    rolesPermitidos: ['Organizador', 'Coorganizador'],
  },
  {
    key: 'adminJugadores',
    ruta: '/(admin)/listadoJugadores',
    nombre: 'Administrar Jugadores',
    descripcion: 'Gestiona los jugadores de la aplicación',
    rolesPermitidos: ['Organizador', 'Coorganizador'],
  },
  {
    key: 'panelSolicitudes',
    ruta: 'PanelSolicitudes',
    nombre: 'Panel de solicitudes',
    descripcion: 'Revisa y gestiona las solicitudes',
    rolesPermitidos: ['*-logged'],
  },
  {
    key: 'ajustesApp',
    ruta: '/(commonPages)/ajustes',
    nombre: 'Ajustes',
    descripcion: 'Personaliza la aplicación',
    rolesPermitidos: ['*'],
  },
];

export default function MasScreen() {
  const { usuario } = useUserContext();

  const rutasVisibles = rutas.filter((ruta) => {
    // Si la ruta permite acceso público (*), mostrarla siempre
    if (ruta.rolesPermitidos.includes('*')) {
      return true;
    }

    // Si el usuario no está logueado y la ruta no es pública, no mostrarla
    if (!usuario || !usuario.rol_nombre) {
      return false;
    }

    // Si el usuario está logueado, mostrar rutas públicas, las específicas de su rol
    // y las marcadas como *-logged
    return (
      ruta.rolesPermitidos.includes('*-logged') ||
      ruta.rolesPermitidos.includes(usuario.rol_nombre as Rol)
    );
  });

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <RouteList
        rutas={rutasVisibles}
        onPress={(ruta) => router.navigate(ruta)}
      />
      {!usuario && (
        <StyledText style={{ textAlign: 'center' }}>
          Si quieres mas opciones, puedes registrarte como usuario
        </StyledText>
      )}
    </View>
  );
}
