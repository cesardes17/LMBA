import { useEffect } from 'react';
import { router } from 'expo-router';

export default function AdministrarUsuarios() {
  useEffect(() => {
    router.replace('/listadoUsuarios');
  }, []);

  return null;
}
