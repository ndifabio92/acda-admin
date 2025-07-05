import { FC, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { LoginFormValues } from '../../types/ui/loginForm';
import { authService } from '../../services/auth.service';
import { useToast } from '../hooks/useToast';
import { AuthProviderProps, AuthState, UserAuth } from '../../types/api/auth';

const AUTH_STORAGE_KEY = '@acda:auth';

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { error: errorToast } = useToast();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedAuth) {
          const user = JSON.parse(storedAuth) as UserAuth;
          setAuthState({ user, loading: false });
        } else {
          setAuthState({ user: null, loading: false });
        }
      } catch (error) {
        console.error('Error loading auth:', error);
        setAuthState({ user: null, loading: false });
      }
    };

    loadStoredAuth();
  }, []);

  const signIn = async (payload: LoginFormValues) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true }));

      const user = await authService.login(payload);
      if (!user) {
        errorToast('Error al iniciar sesión');
        setAuthState({ user: null, loading: false });
        return;
      }

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      setAuthState({ user, loading: false });
    } catch (error) {
      setAuthState({ user: null, loading: false });
      errorToast('Error al iniciar sesión');
      throw error;
    }
  };

  const signOut = async () => {
    setAuthState((prev) => ({ ...prev, loading: true }));
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthState({ user: null, loading: false });
  };

  const value = { ...authState, signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
