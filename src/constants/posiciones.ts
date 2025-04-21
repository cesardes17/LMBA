// src/constants/posiciones.ts
import { Option } from '@/src/components/common/SelectableCardGroup';
import { PosicionPreferida } from '@/src/types/enums/Posicion';

export const POSICIONES_OPCIONES: Option[] = [
  {
    id: PosicionPreferida.BASE,
    title: 'Base',
    description: 'Dirige el juego y organiza al equipo.',
  },
  {
    id: PosicionPreferida.ESCOLTA,
    title: 'Escolta',
    description: 'Jugador rápido con buen tiro exterior.',
  },
  {
    id: PosicionPreferida.ALERO,
    title: 'Alero',
    description: 'Versátil en defensa y ataque.',
  },
  {
    id: PosicionPreferida.ALA_PIVOT,
    title: 'Ala-Pívot',
    description: 'Fuerte cerca del aro, con capacidad defensiva.',
  },
  {
    id: PosicionPreferida.PIVOT,
    title: 'Pívot',
    description: 'El más alto y físico del equipo, domina en la pintura.',
  },
];
