import axios from 'axios';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const auth = localStorage.getItem('@acda:auth');

  if (!auth) return config;
  const parseToken = JSON.parse(auth);
  const token = parseToken?.jwt;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    const method = response.config.method?.toUpperCase();
    if (method === 'POST' || method === 'PUT') {
      toast.success('Guardado con éxito');
    }

    if (method === 'DELETE') {
      toast.success('Eliminado con éxito');
    }
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        toast.error('Sesión expirada. Por favor, inicie sesión nuevamente.');
        localStorage.removeItem('@acda:auth');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      if (error.response.status === 500) {
        toast.error('Error Por favor, hable con el administrador.');
      }
    } else if (error.request) {
      toast.error('Error de conexión.');
    } else {
      toast.error('Ha ocurrido un error inesperado.');
    }
    return Promise.reject(error);
  }
);

export const authApi = axios.create({
  baseURL: API_URL,
});

export default api;
