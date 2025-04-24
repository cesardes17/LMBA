import { Jugador, Usuario } from './models/Usuario';
export type CompletarPerfilUsuario = Omit<
  Usuario,
  'creado_en' | 'activo' | 'rol_nombre'
>;
export type CompletarPerfilJugador = Omit<
  Jugador,
  'id' | 'foto_name' | 'sancion'
>;
