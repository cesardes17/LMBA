import { StorageSupabase } from '../api/storageSupabase';

interface StorageRespone {
  data: string | null;
  error: string | null;
  success: boolean;
}

export const ImageService = {
  async getPublicUrl(bucket: string, path: string): Promise<StorageRespone> {
    const { data, error } = await StorageSupabase.getPublicUrl(bucket, path);
    return { data, error, success: !error };
  },

  async uploadImage(
    bucket: string,
    path: string,
    file: File
  ): Promise<StorageRespone> {
    const { data, error } = await StorageSupabase.uploadImage(
      bucket,
      path,
      file
    );
    return { data, error, success: !error };
  },

  async deleteImage(bucket: string, path: string): Promise<StorageRespone> {
    const { success, error } = await StorageSupabase.deleteImage(bucket, path);
    return { data: null, error, success };
  },
};
