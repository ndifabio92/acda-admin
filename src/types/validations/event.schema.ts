import * as Yup from 'yup';
import { GameMode } from '../api/modeGame';
import dayjs from 'dayjs';

export const eventSchema = Yup.object().shape({
  title: Yup.string().required('El título es requerido'),
  subtitle: Yup.string().required('La Descripción es requerido'),
  dateGame: Yup.date()
    .required('La fecha del evento es requerida')
    .min(dayjs().startOf('day').toDate(), 'La fecha del evento no puede ser anterior a hoy'),
  modeGame: Yup.mixed<GameMode>()
    .oneOf(Object.values(GameMode))
    .required('El modo de juego es requerido'),
  duration: Yup.string().required('La duración es requerida'),
  location: Yup.string().required('La ubicación es requerida'),
  locationGps: Yup.string().required('La ubicación GPS es requerida'),
  registrationOpen: Yup.date()
    .required('La fecha de apertura de inscripciones es requerida')
    .max(Yup.ref('dateGame'), 'La fecha de apertura debe ser anterior a la fecha del evento'),
  registrationClosing: Yup.date()
    .required('La fecha de cierre de inscripciones es requerida')
    .min(
      Yup.ref('registrationOpen'),
      'La fecha de cierre debe ser posterior a la fecha de apertura'
    )
    .max(Yup.ref('dateGame'), 'La fecha de cierre debe ser anterior a la fecha del evento'),
  maximumQuotas: Yup.number()
    .required('El número máximo de cuotas es requerido')
    .integer()
    .min(1, 'El número máximo de cuotas debe ser al menos 1'),
  openingHours: Yup.string().required('El horario de apertura es requerido'),
  price: Yup.number()
    .required('El precio es requerido')
    .integer()
    .min(0, 'El precio no puede ser negativo'),
  partnerPrice: Yup.number()
    .required('El precio para socios es requerido')
    .integer()
    .min(0, 'El precio para socios no puede ser negativo'),
  image: Yup.mixed<File>()
    .required('La imagen es requerida')
    .test('fileFormat', 'Solo se permiten archivos JPG o PNG', (value) => {
      if (!value) return false;
      return value instanceof File && (value.type === 'image/jpeg' || value.type === 'image/png');
    }),
});
