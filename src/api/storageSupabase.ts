import { supabase } from './supabase/supabaseClient';

export type ImageResponse = {
  data: string | null;
  error: string | null;
};

export type ImageDeleteResponse = {
  success: boolean;
  error: string | null;
};

interface UploadImageResponse extends ImageResponse {
  fileName: string | null;
}

export const StorageSupabase = {
  /**
   * Sube una imagen al bucket especificado.
   * @param bucket - Nombre del bucket donde se subirá la imagen.
   * @param path - Ruta donde guardar la imagen (ej: 'jugadores/userId.jpg').
   * @param file - Archivo tipo Blob (ej: de ImagePicker).
   * @returns {Promise<ImageResponse>} - Objeto que contiene la URL pública de la imagen subida o un mensaje de error.
   */
  async uploadImage(
    bucket: string,
    path: string,
    file: Blob
  ): Promise<UploadImageResponse> {
    try {
      // Obtener la extensión basada en el tipo MIME del Blob
      const mimeType = file.type;
      let fileExtension = '.jpg'; // Por defecto

      if (mimeType) {
        switch (mimeType.toLowerCase()) {
          case 'image/jpeg':
          case 'image/jpg':
            fileExtension = '.jpg';
            break;
          case 'image/png':
            fileExtension = '.png';
            break;
          case 'image/gif':
            fileExtension = '.gif';
            break;
          case 'image/webp':
            fileExtension = '.webp';
            break;
          // Podemos añadir más casos según necesitemos
        }
      }

      const randomFileName = `${crypto.randomUUID()}${fileExtension}`;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(randomFileName, file, {
          upsert: true,
          contentType: mimeType || 'image/jpeg',
        });

      if (error) throw new Error(error.message);

      const urlResponse = await this.getPublicUrl(bucket, randomFileName);

      return {
        ...urlResponse,
        fileName: error ? null : randomFileName,
      };
    } catch (error) {
      return {
        data: null,
        error: (error as Error).message,
        fileName: null,
      };
    }
  },

  /**
   * Obtiene la URL pública de una imagen en el bucket especificado.
   * @param bucket - Nombre del bucket donde se encuentra la imagen.
   * @param path - Ruta del archivo dentro del bucket.
   * @returns {Promise<ImageResponse>} - Objeto que contiene la URL pública de la imagen o un mensaje de error.
   */
  async getPublicUrl(bucket: string, name: string): Promise<ImageResponse> {
    try {
      const { data } = supabase.storage.from(bucket).getPublicUrl(name);

      if (!data.publicUrl) {
        throw new Error('No se pudo obtener la URL pública');
      }

      return { data: data.publicUrl, error: null };
    } catch (error) {
      console.error('Error al obtener la URL pública:', error);
      return { data: null, error: (error as Error).message };
    }
  },

  /**
   * Elimina una imagen del bucket especificado.
   * @param bucket - Nombre del bucket de donde se eliminará la imagen.
   * @param path - Ruta del archivo dentro del bucket.
   * @returns {Promise<ImageDeleteResponse>} - Objeto que indica si la eliminación fue exitosa o contiene un mensaje de error.
   */
  async deleteImage(
    bucket: string,
    path: string
  ): Promise<ImageDeleteResponse> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw new Error(error.message);
      if (!data) throw new Error('No se pudo eliminar la imagen');

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  },
};
