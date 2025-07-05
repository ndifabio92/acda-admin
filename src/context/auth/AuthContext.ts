import { createContext } from 'react';
import { AuthContextType } from '../../types/api/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
