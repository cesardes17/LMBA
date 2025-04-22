import { CompletarPerfilJugador, CompletarPerfilUsuario } from '../types/auth';
import { Usuario } from '../types/models/Usuario';
import { databaseService } from './databaseService';
import { jugadorService } from './jugadorService';

const tabla = 'usuarios';
export const usuarioService = {
  async getByEmail(
    email: string
  ): Promise<{ data: Usuario | null; error: Error | null }> {
    try {
      const { data, error, status } = await databaseService.callRpc<
        Usuario,
        { p_email: string }
      >('get_usuario_with_rol_by_email', { p_email: email });
      if (status === 'error' && error) {
        throw new Error(error.message);
      }
      if (!data) {
        return { data: null, error: null };
      }
      return { data: data[0] as Usuario, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  async getByUUID(uuid: string) {
    try {
      const { data, error, status } = await databaseService.callRpc<
        Usuario,
        { p_usuario_id: string }
      >('get_usuario_with_rol_by_uuid', { p_usuario_id: uuid });
      if (status === 'error' && error) {
        throw new Error(error.message);
      }
      if (!data) {
        return { data: null, error: null };
      }
      return { data: data[0] as Usuario, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  async createUsuario(
    usuarioData: CompletarPerfilUsuario,
    jugadorData: CompletarPerfilJugador | null
  ): Promise<{
    error: Error | null;
    status: 'success' | 'error';
  }> {
    try {
      const { data, error, status } = await databaseService.insert<
        CompletarPerfilUsuario,
        Usuario
      >(tabla, usuarioData);

      console.log('data: ', data);
      console.log('error: ', error);
      console.log('status: ', status);

      if (status === 'error' && error) {
        throw new Error(error.message);
      }
      if (!data) {
        throw new Error('No se pudo crear el usuario');
      }
      console.log('usuario creado correctamente: ', data[0]);
      if (jugadorData) {
        const { data, error, status } =
          await jugadorService.createJugador(jugadorData);
        console.log('data: ', data);
        console.log('error: ', error);
        console.log('status: ', status);
        if (status === 'error' && error) {
          throw new Error(error.message);
        }
        console.log('jugador creado correctamente');
      }

      return { error: null, status: 'success' };
    } catch (error) {
      return { error: error as Error, status: 'error' };
    }
  },
};
