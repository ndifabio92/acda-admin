import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoginFormValues } from '../../types/ui/loginForm';
import { loginSchema } from '../../types/validations/login.schema';

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => Promise<void>;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={handleFormSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Box sx={{ mb: 2 }}>
            <Typography component={'h4'} variant="body2" color="text.primary">
              <label htmlFor="email">Correo electrónico</label>
            </Typography>
            <Field
              as={TextField}
              fullWidth
              margin="normal"
              id="email"
              name="email"
              type="email"
              autoFocus
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography component={'h4'} variant="body2" color="text.primary">
              <label htmlFor="password">Contraseña</label>
            </Typography>
            <Field
              as={TextField}
              margin="normal"
              fullWidth
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{ my: 3, mb: 2, py: 1 }}
            fullWidth
            disabled={loading || isSubmitting}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar sesion'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
