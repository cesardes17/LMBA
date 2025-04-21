import { Rol } from '../types/models/Rol';
import { databaseService } from './databaseService';

const tabla = 'roles';
export const rolesService = {
  async getRolesRegistros(): Promise<{
    data: Rol[] | null;
    error: Error | null;
  }> {
    try {
      const { data, error, status } = await databaseService.getByField<Rol>(
        tabla,
        'disponible_en_registro',
        'true'
      );
      if (status === 'error' && error) {
        throw new Error(error.message);
      }
      if (!data) {
        return { data: null, error: null };
      }
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
};
