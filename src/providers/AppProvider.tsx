import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from '../context/auth/AuthProvider';
import { ToastProvider } from '../context/toast/ToastProvider';
import theme from '../styles/theme';

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <AuthProvider>{children}</AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};
