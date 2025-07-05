import { useContext } from 'react';
import { AuthContextType } from '../../types/api/auth';
import { AuthContext } from '../auth/AuthContext';

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authContext;
};
