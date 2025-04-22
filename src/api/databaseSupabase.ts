import { supabase } from './supabase/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';

export type DBResponse<T> = {
  data: T | null;
  error: PostgrestError | null;
};

export const DatabaseSupabase = {
  // Obtener todos los registros de una tabla
  async getAll<T>(table: string): Promise<DBResponse<T[]>> {
    const { data, error } = await supabase.from(table).select('*');
    return { data, error };
  },

  // Obtener por ID
  async getById<T>(
    table: string,
    column: string,
    id: string | number
  ): Promise<DBResponse<T>> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq(column, id)
      .single();
    return { data, error };
  },

  async insert<TInsert, TReturn>(
    table: string,
    payload: TInsert | TInsert[]
  ): Promise<DBResponse<TReturn[]>> {
    const { data, error } = await supabase.from(table).insert(payload).select(); // Esto devuelve los datos insertados
    return { data, error };
  },

  // Actualizar por ID
  async updateById<T>(
    table: string,
    id: string | number,
    updates: Partial<T>
  ): Promise<DBResponse<T>> {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Borrar por ID
  async deleteById(
    table: string,
    id: string | number
  ): Promise<DBResponse<null>> {
    const { error } = await supabase.from(table).delete().eq('id', id);
    return { data: null, error };
  },

  //obtener por campo
  async getByField<T>(
    table: string,
    field: string,
    value: string | number | boolean
  ): Promise<DBResponse<T[]>> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq(field, value);
    return { data, error };
  },
  // Llamar a una función RPC de Supabase
  async callRpc<T, P = any>(
    fnName: string,
    params?: P
  ): Promise<DBResponse<T>> {
    const { data, error } = await supabase.rpc(fnName, params);
    return { data, error };
  },
};
