/**
 * Interfaz que representa un usuario en la base de datos
 * @interface Usuario
 */
export interface Usuario {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  rol_id: number;
  rol_nombre: string;
  creado_en: string;
  activo: boolean;
}

/**
 * Interfaz que representa un jugador en la base de datos
 * @interface Jugador
 */
export interface Jugador {
  id: string;
  usuario_id: string;
  altura_cm: number;
  peso_kg: number;
  posicion_preferida: string;
  dorsal_preferido: number;
  descripcion: string;
  foto_name: string;
  sancion: number;
}
