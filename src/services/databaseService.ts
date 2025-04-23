import { DatabaseSupabase } from '@/src/api/databaseSupabase';
import {
  ServiceResponse,
  ServiceSingleResponse,
} from '../types/ServiceResponse';

type Operator = 'eq' | 'neq' | 'in' | 'not.in';

interface Filter {
  field: string;
  operator: Operator;
  value: any;
}

interface PaginatedOptions {
  filters?: Filter[];
  search?: string;
  searchFields?: string[];
  page: number;
  limit: number;
}

/**
 * Función auxiliar para manejar respuestas de array
 * @param operation - Promesa que devuelve datos en formato array y posible error
 * @returns Objeto con estructura ServiceResponse que incluye datos, error y estado
 * @template T - Tipo genérico de los datos
 */
const handleArrayResponse = async <T>(
  operation: Promise<{ data: T[] | null; error: any }>
): Promise<ServiceResponse<T>> => {
  try {
    const { data, error } = await operation;
    if (error) {
      throw new Error(error.message);
    }
    if (!data) {
      throw new Error('No data');
    }
    return { data, error: null, status: 'success' };
  } catch (error) {
    return { data: null, error: error as Error, status: 'error' };
  }
};

/**
 * Función auxiliar para manejar respuestas de objeto único
 * @param operation - Promesa que devuelve un único objeto y posible error
 * @returns Objeto con estructura ServiceSingleResponse que incluye datos, error y estado
 * @template T - Tipo genérico de los datos
 */
const handleSingleResponse = async <T>(
  operation: Promise<{ data: T | null; error: any }>
): Promise<ServiceSingleResponse<T>> => {
  try {
    const { data, error } = await operation;
    if (error) {
      throw new Error(error.message);
    }
    if (!data) {
      throw new Error('No data');
    }
    return { data, error: null, status: 'success' };
  } catch (error) {
    return { data: null, error: error as Error, status: 'error' };
  }
};

export const databaseService = {
  /**
   * Obtiene todos los registros de una tabla
   * @param table - Nombre de la tabla de la base de datos
   * @returns Promesa que resuelve a un objeto ServiceResponse con array de datos, error y estado
   * @template T - Tipo genérico de los datos a obtener
   * @example
   * // Obtener todos los usuarios
   * const { data, error, status } = await databaseService.getAll<Usuario>('usuarios');
   * if (status === 'success') {
   *   console.log('Usuarios obtenidos:', data);
   * }
   */
  async getAll<T>(table: string): Promise<ServiceResponse<T>> {
    return handleArrayResponse(DatabaseSupabase.getAll<T>(table));
  },

  /**
   * Obtiene un registro específico por su identificador en una columna
   * @param table - Nombre de la tabla de la base de datos
   * @param column - Nombre de la columna por la que filtrar
   * @param id - Valor del identificador a buscar
   * @returns Promesa que resuelve a un objeto ServiceSingleResponse con datos, error y estado
   * @template T - Tipo genérico de los datos a obtener
   * @example
   * // Obtener un usuario por su email
   * const { data, error, status } = await databaseService.getById<Usuario>('usuarios', 'email', 'usuario@ejemplo.com');
   * if (status === 'success') {
   *   console.log('Usuario encontrado:', data);
   * }
   */
  async getById<T>(
    table: string,
    column: string,
    id: string | number
  ): Promise<ServiceSingleResponse<T>> {
    return handleSingleResponse(DatabaseSupabase.getById<T>(table, column, id));
  },

  /**
   * Inserta uno o varios registros en una tabla
   * @param table - Nombre de la tabla de la base de datos
   * @param payload - Objeto o array de objetos a insertar
   * @returns Promesa que resuelve a un objeto ServiceResponse con los datos insertados, error y estado
   * @template T - Tipo genérico de los datos a insertar
   * @example
   * // Insertar un nuevo usuario
   * const nuevoUsuario = { nombre: 'Juan', email: 'juan@ejemplo.com' };
   * const { data, error, status } = await databaseService.insert<Usuario>('usuarios', nuevoUsuario);
   * if (status === 'success') {
   *   console.log('Usuario insertado:', data);
   * }
   */
  async insert<TInsert, TReturn>(
    table: string,
    payload: TInsert | TInsert[]
  ): Promise<ServiceResponse<TReturn>> {
    return handleArrayResponse<TReturn>(
      DatabaseSupabase.insert<TInsert, TReturn>(table, payload)
    );
  },

  /**
   * Actualiza un registro específico por su identificador
   * @param table - Nombre de la tabla de la base de datos
   * @param id - Identificador del registro a actualizar
   * @param payload - Objeto con los campos a actualizar
   * @returns Promesa que resuelve a un objeto ServiceSingleResponse con los datos actualizados, error y estado
   * @template T - Tipo genérico de los datos a actualizar
   * @example
   * // Actualizar un usuario existente
   * const actualizacion = { nombre: 'Juan Actualizado' };
   * const { data, error, status } = await databaseService.updateById<Usuario>('usuarios', 1, actualizacion);
   * if (status === 'success') {
   *   console.log('Usuario actualizado:', data);
   * }
   */
  async updateById<T>(
    table: string,
    id: string | number,
    payload: Partial<T>
  ): Promise<ServiceSingleResponse<T>> {
    return handleSingleResponse(
      DatabaseSupabase.updateById<T>(table, id, payload)
    );
  },

  /**
   * Elimina un registro específico por su identificador
   * @param table - Nombre de la tabla de la base de datos
   * @param id - Identificador del registro a eliminar
   * @returns Promesa que resuelve a un objeto con estado y posible error
   * @example
   * // Eliminar un usuario
   * const { error, status } = await databaseService.deleteById('usuarios', 1);
   * if (status === 'success') {
   *   console.log('Usuario eliminado correctamente');
   * }
   */
  async deleteById(
    table: string,
    id: string | number
  ): Promise<{ data: null; error: Error | null; status: 'success' | 'error' }> {
    try {
      const { error } = await DatabaseSupabase.deleteById(table, id);
      if (error) {
        throw new Error(error.message);
      }
      return { data: null, error: null, status: 'success' };
    } catch (error) {
      return { data: null, error: error as Error, status: 'error' };
    }
  },

  /**
   * Obtiene todos los registros de una tabla que coincidan con un campo y valor específicos
   * @param table - Nombre de la tabla de la base de datos
   * @param field - Nombre del campo por el que filtrar
   * @param value - Valor a buscar en el campo
   * @returns Promesa que resuelve a un objeto ServiceResponse con array de datos, error y estado
   * @template T - Tipo genérico de los datos a obtener
   * @example
   * // Obtener todos los usuarios con rol "admin"
   * const { data, error, status } = await databaseService.getByField<Usuario>('usuarios', 'rol', 'admin');
   * if (status === 'success') {
   *   console.log('Administradores encontrados:', data);
   * }
   */
  async getByField<T>(
    table: string,
    field: string,
    value: string | number | boolean
  ): Promise<ServiceResponse<T>> {
    return handleArrayResponse(
      DatabaseSupabase.getByField<T>(table, field, value)
    );
  },

  /**
   * Llama a una función RPC definida en la base de datos
   * @param fnName - Nombre de la función RPC
   * @param params - Parámetros para la función RPC
   * @returns Promesa que resuelve a un objeto ServiceResponse con los datos, error y estado
   * @template T - Tipo genérico de los datos a obtener
   * @example
   * // Llamar a una función RPC llamada 'mi_funcion' con parámetros
   * const { data, error, status } = await databaseService.callRpc<MiTipo>('mi_funcion', { param1: valor });
   */
  async callRpc<T, P = any>(
    fnName: string,
    params?: P
  ): Promise<ServiceResponse<T>> {
    // Adapt the result to always be an array
    const rpcPromise = DatabaseSupabase.callRpc<T, P>(fnName, params).then(
      ({ data, error }) => ({
        data: Array.isArray(data)
          ? data
          : data !== null && data !== undefined
            ? [data]
            : null,
        error,
      })
    );
    return handleArrayResponse<T>(rpcPromise);
  },

  /**
   * Obtiene registros de una tabla junto con datos relacionados usando join
   * @param table - Nombre de la tabla principal
   * @param relationQuery - Query de relaciones (ej: '*, roles(*)')
   * @returns Promesa con los datos y error
   */
  async getWithRelations<T>(
    table: string,
    relationQuery: string
  ): Promise<ServiceResponse<T>> {
    return handleArrayResponse(
      DatabaseSupabase.getWithRelations<T>(table, relationQuery)
    );
  },
  /**
   * Obtiene datos paginados de una tabla con opciones de filtrado y búsqueda
   * @param table - Nombre de la tabla
   * @param options - Opciones de filtrado, búsqueda y paginación
   * @returns Promesa con los datos y error
   */
  async getPaginatedData<T>(
    table: string,
    options: PaginatedOptions
  ): Promise<T[]> {
    return await DatabaseSupabase.getPaginatedData<T>(table, options);
  },
};
