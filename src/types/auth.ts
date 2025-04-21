import { Jugador, Usuario } from './models/Usuario';
export type CompletarPerfilUsuario = Omit<Usuario, 'creado_en' | 'activo'>;
export type CompletarPerfilJugador = Omit<Jugador, 'id'>;
