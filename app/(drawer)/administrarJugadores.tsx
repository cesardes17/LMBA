import { useEffect } from 'react';
import { router } from 'expo-router';

export default function AdministrarJugadores() {
  useEffect(() => {
    router.replace('/listadoJugadores');
  }, []);

  return null;
}
