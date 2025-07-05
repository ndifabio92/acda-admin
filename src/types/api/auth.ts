import { LoginFormValues } from '../ui/loginForm';

export interface AuthState {
  user: UserAuth | null;
  loading: boolean;
}

export interface AuthContextType extends AuthState {
  signIn: (user: LoginFormValues) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface UserAuth {
  jwt: string;
  role: string;
  email: string;
  name: string;
}
