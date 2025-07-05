import { AxiosError } from 'axios';
import { LoginFormValues } from '../types/ui/loginForm';
import { authApi } from './base.service';
import { UserAuth } from '../types/api/auth';

interface ApiError {
  message: string;
  statusCode: number;
}

export const authService = {
  login: async (credentials: LoginFormValues): Promise<UserAuth | null> => {
    try {
      const response = await authApi.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const apiError = error.response.data as ApiError;
        throw new Error(apiError.message || 'Error en la autenticación');
      }
      throw new Error('Error de conexión con el servidor');
    }
  },
};
