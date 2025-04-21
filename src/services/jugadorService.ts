import { CompletarPerfilJugador } from '../types/auth';
import { Jugador } from '../types/models/Usuario';
import { databaseService } from './databaseService';

const tabla = 'jugadores';
export const jugadorService = {
  async createJugador(jugadorData: CompletarPerfilJugador): Promise<{
    data: Jugador | null;
    error: Error | null;
    status: 'success' | 'error';
  }> {
    try {
      const { data, error, status } = await databaseService.insert<
        CompletarPerfilJugador,
        Jugador
      >(tabla, jugadorData);
      if (status === 'error' && error) {
        throw new Error(error.message);
      }
      if (!data) {
        throw new Error('No se pudo crear el jugador');
      }

      return { data: data[0], error: null, status: 'success' };
    } catch (error) {
      return { data: null, error: error as Error, status: 'error' };
    }
  },
};
