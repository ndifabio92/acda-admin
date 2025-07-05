import * as Yup from 'yup';

export const subscriptionSchema = Yup.object().shape({
  value: Yup.number()
    .required('El precio es requerido')
    .integer()
    .min(1, 'El precio no puede ser menor a 1'),
});
