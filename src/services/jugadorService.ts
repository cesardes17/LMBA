import { CompletarPerfilJugador } from '../types/auth';
import { Jugador } from '../types/models/Usuario';
import { databaseService } from './databaseService';
import { StorageSupabase } from '../api/storageSupabase';

const bucket = 'fotojugadores';
const tabla = 'jugadores';

export const jugadorService = {
  async createJugador(
    jugadorData: CompletarPerfilJugador,
    imagenJugador: Blob
  ): Promise<{
    data: Jugador | null;
    error: Error | null;
    status: 'success' | 'error';
  }> {
    try {
      // Primero subimos la imagen para obtener la URL
      console.log('Subiendo imagen...');
      const nombreArchivo = `${jugadorData.usuario_id}.jpg`;
      const { data: dataStorage, error: errorStorage } =
        await StorageSupabase.uploadImage(bucket, nombreArchivo, imagenJugador);

      if (errorStorage) {
        throw new Error(`Error al subir la imagen: ${errorStorage}`);
      }

      if (!dataStorage) {
        throw new Error('No se pudo obtener la URL de la imagen');
      }

      // Creamos el jugador con la URL de la imagen ya disponible
      const jugadorDataCompleto = {
        ...jugadorData,
        foto_url: dataStorage,
      };

      const { data, error, status } = await databaseService.insert<
        CompletarPerfilJugador & { foto_url: string },
        Jugador
      >(tabla, jugadorDataCompleto);

      if (status === 'error' && error) {
        // Si falla la creación del jugador, eliminamos la imagen subida
        await StorageSupabase.deleteImage(bucket, nombreArchivo);
        throw new Error(error.message);
      }

      if (!data) {
        // Si no hay datos, eliminamos la imagen subida
        await StorageSupabase.deleteImage(bucket, nombreArchivo);
        throw new Error('No se pudo crear el jugador');
      }

      return { data: data[0], error: null, status: 'success' };
    } catch (error) {
      return { data: null, error: error as Error, status: 'error' };
    }
  },
  async getJugadorByUsuarioId(
    usuarioId: string
  ): Promise<{ data: Jugador | null; error: Error | null }> {
    try {
      const { data, error } = await databaseService.getByField<Jugador>(
        tabla,
        'usuario_id',
        usuarioId
      );
      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        return { data: null, error: null };
      }

      const jugadorInfo: Jugador = data[0];

      const { data: dataStorage, error: errorStorage } =
        await StorageSupabase.getPublicUrl(bucket, data[0].foto_name);
      if (errorStorage) {
        throw new Error(`Error al obtener la imagen: ${errorStorage}`);
      }
      if (!dataStorage) {
        throw new Error('No se pudo obtener la URL de la imagen');
      }
      jugadorInfo.foto_name = dataStorage;
      console.log('jugadorInfo: ', jugadorInfo);
      return { data: jugadorInfo, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  async actualizarSancionJugador(
    id: number,
    sancionado: boolean
  ): Promise<{
    success: boolean;
    error: Error | null;
  }> {
    try {
      const { data, status, error } = await databaseService.updateById(
        tabla,
        id,
        { sancionado }
      );
      if (status === 'success' && data) {
        return { success: true, error: null };
      }
      if (status === 'error' && error) {
        throw new Error(error.message);
      }

      throw new Error('No se pudo actualizar el jugador');
    } catch (error) {
      return { success: false, error: error as Error };
    }
  },
};
