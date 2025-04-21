import { AuthSupabase } from '@/src/api/authSupabase';

interface RegisterParams {
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

export const AuthService = {
  /**
   * Registra un usuario en el sistema (auth)
   * @param email
   * @param password
   * @returns error o user
   */
  async register({ email, password }: RegisterParams) {
    const { data, error } = await AuthSupabase.signUp(email, password);

    if (error) {
      // Puedes personalizar errores aquí si quieres
      return { error: error.message };
    }

    return { user: data.user };
  },

  /**
   * Inicia sesión con credenciales
   */
  async login({ email, password }: LoginParams) {
    const { data, error } = await AuthSupabase.signIn(email, password);

    if (error) {
      return { error: error.message };
    }

    return { user: data.user };
  },

  /**
   * Cierra la sesión del usuario
   */
  async logout() {
    const { error } = await AuthSupabase.signOut();

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  },

  /**
   * Devuelve la sesión actual (si existe)
   */
  async getSession() {
    const { data, error } = await AuthSupabase.getSession();

    if (error) {
      return { error: error.message };
    }

    return { session: data.session };
  },

  /**
   * Devuelve el usuario actual (si existe)
   */
  async getCurrentUser() {
    const { data, error } = await AuthSupabase.getUser();

    if (error) {
      return { error: error.message };
    }

    return { user: data.user };
  },
};
