import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('El correo es requerido').email('Ingresa un correo válido'),
  password: Yup.string().required('La contraseña es requerida'),
});
