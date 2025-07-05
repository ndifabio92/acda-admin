import { Box, Container, Paper, Typography } from '@mui/material';
import { useAuth } from '../../context/hooks/useAuth';
import { LoginFormValues } from '../../types/ui/loginForm';
import { LoginForm } from './LoginForm';

const Login = () => {
  const { signIn } = useAuth();
  const onSubmit = async (data: LoginFormValues) => {
    await signIn(data);
  };

  return (
    <Container component={'main'} maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 3,
        }}
      >
        <Paper
          sx={{
            padding: 4,
            width: '100%',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              component="img"
              src="/icons/acda-escudo-icon.png"
              alt="ACDA Logo"
              sx={{
                width: '30%',
                mb: 1,
              }}
            />
            <Typography component={'h2'} variant="h5" fontWeight={'bold'}>
              Asociación Civil Deportiva Airsoft
            </Typography>
            <Typography component={'h4'} variant="body2" color="text.secondary">
              Administrador
            </Typography>
          </Box>
          <LoginForm onSubmit={onSubmit} />
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
