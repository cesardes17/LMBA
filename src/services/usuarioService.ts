import { CompletarPerfilJugador, CompletarPerfilUsuario } from '../types/auth';
import { Usuario } from '../types/models/Usuario';
import { databaseService } from './databaseService';
import { jugadorService } from './jugadorService';

const rolesExcluidos: Record<number, number[]> = {
  1: [1], // organizador no ve organizadores
  2: [1, 2], // coorganizador no ve organizadores ni coorganizadores
};

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
    jugadorData: CompletarPerfilJugador | null,
    imagenJugador: Blob | null
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
      if (jugadorData && imagenJugador) {
        const { data, error, status } = await jugadorService.createJugador(
          jugadorData,
          imagenJugador
        );
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
  async getAllUsuarios(): Promise<{
    data: Usuario[] | null;
    error: Error | null;
  }> {
    try {
      const relationQuery = '*, roles(nombre)';
      const { data, error, status } =
        await databaseService.getWithRelations<any>('usuarios', relationQuery);
      if (status === 'error' && error) {
        throw new Error(error.message);
      }
      // Mapear para devolver un array de Usuario con rol_nombre
      const usuarios: Usuario[] = (data || []).map((u: any) => ({
        ...u,
        rol_nombre: u.roles?.nombre || '',
      }));
      return { data: usuarios, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  async updateBanStatus(id: string, banned: boolean) {
    try {
      const { data, error, status } = await databaseService.updateById(
        tabla,
        id,
        {
          activo: banned,
        }
      );
      if (status === 'error' && error) {
        throw new Error(error.message);
      }
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async updateUsuarioRol(id: string, rol_id: number) {
    try {
      const { data, error, status } = await databaseService.updateById(
        tabla,
        id,
        {
          rol_id: rol_id,
        }
      );
      if (status === 'error' && error) {
        throw new Error(error.message);
      }
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  async getPaginatedUsers(
    rolUsuarioActual: number,
    page: number,
    limit: number,
    search?: string
  ): Promise<Usuario[]> {
    const filters = [
      {
        field: 'rol_id',
        operator: 'not.in' as const,
        value: rolesExcluidos[rolUsuarioActual] || [],
      },
    ];

    const searchFields = ['nombre', 'apellidos', 'email'];

    const rawUsuarios = await databaseService.getPaginatedData<any>(tabla, {
      filters,
      page,
      limit,
      search,
      searchFields,
    });

    const usuarios: Usuario[] = rawUsuarios.map((u) => ({
      id: u.id,
      nombre: u.nombre,
      apellidos: u.apellidos,
      email: u.email,
      rol_id: u.rol_id,
      rol_nombre: u.roles?.nombre ?? '',
      creado_en: u.creado_en,
      activo: u.activo,
    }));

    return usuarios;
  },
};
