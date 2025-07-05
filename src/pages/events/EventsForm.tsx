import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { eventSchema } from '../../types/validations/event.schema';
import { Event } from '../../types/api/event';
import { GameMode } from '../../types/api/modeGame';
import { gameModeTranslations } from '../../shared/constants/translations';
import {
  formatDateTime,
  formatDateTimeForInput,
  formatDisplayDate,
  formatDisplayDateTime,
  parseDateTime,
} from '../../shared/utils/dateFormater';
import dayjs from 'dayjs';

interface Props {
  onSubmit: (data: Event) => Promise<void>;
  onClose: () => void;
  initialEvent?: Event | null;
}

export const EventsForm = ({ onSubmit, onClose, initialEvent }: Props) => {
  const [loading, setLoading] = useState(false);

  const initialValues: Event = initialEvent || {
    id: 0,
    title: '',
    subtitle: '',
    dateGame: dayjs().startOf('day').toDate(),
    duration: '00:00',
    location: '',
    locationGps: '',
    registrationClosing: dayjs().toDate(),
    registrationOpen: dayjs().toDate(),
    maximumQuotas: 1,
    openingHours: '00:00',
    price: 0,
    partnerPrice: 0,
    image: null as unknown as File,
    modeGame: GameMode.COURSE,
    isActive: true,
    isVisible: false,
    registered: false,
  };

  const handleSubmitFormik = async (values: Event) => {
    setLoading(true);
    try {
      await onSubmit(values);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik<Event>
      initialValues={initialValues}
      validationSchema={eventSchema}
      onSubmit={handleSubmitFormik}
    >
      {({
        isSubmitting,
        errors,
        touched,
        setFieldValue,
        values,
        handleSubmit,
        setFieldTouched,
      }) => {
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              id="title"
              name="title"
              label="Título"
              error={touched.title && !!errors.title}
              helperText={touched.title && errors.title}
            />
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              id="subtitle"
              name="subtitle"
              label="Descripción"
              multiline
              rows={4}
              error={touched.subtitle && !!errors.subtitle}
              helperText={touched.subtitle && errors.subtitle}
            />
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              id="dateGame"
              name="dateGame"
              label="Fecha del evento"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              error={touched.dateGame && !!errors.dateGame}
              helperText={
                (touched.dateGame && errors.dateGame) || formatDisplayDate(values.dateGame)
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue(
                  'dateGame',
                  e.target.value ? dayjs(e.target.value).startOf('day').toDate() : null
                )
              }
              value={formatDateTime(values.dateGame)}
            />
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              id="duration"
              name="duration"
              label="Duración"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              error={touched.duration && !!errors.duration}
              helperText={touched.duration && errors.duration}
            />
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              id="location"
              name="location"
              label="Ubicación"
              error={touched.location && !!errors.location}
              helperText={touched.location && errors.location}
            />
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              id="locationGps"
              name="locationGps"
              label="Ubicación GPS"
              error={touched.locationGps && !!errors.locationGps}
              helperText={touched.locationGps && errors.locationGps}
            />
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              id="registrationOpen"
              name="registrationOpen"
              label="Fecha de apertura de inscripciones"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              error={touched.registrationOpen && !!errors.registrationOpen}
              helperText={
                (touched.registrationOpen && errors.registrationOpen) ||
                formatDisplayDateTime(values.registrationOpen)
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue(
                  'registrationOpen',
                  e.target.value ? parseDateTime(e.target.value) : null
                )
              }
              value={formatDateTimeForInput(values.registrationOpen)}
            />
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              id="registrationClosing"
              name="registrationClosing"
              label="Fecha de cierre de inscripciones"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              error={touched.registrationClosing && !!errors.registrationClosing}
              helperText={
                (touched.registrationClosing && errors.registrationClosing) ||
                formatDisplayDateTime(values.registrationClosing)
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue(
                  'registrationClosing',
                  e.target.value ? parseDateTime(e.target.value) : null
                )
              }
              value={formatDateTimeForInput(values.registrationClosing)}
            />
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              id="maximumQuotas"
              name="maximumQuotas"
              label="Cupos máximos"
              type="number"
              error={touched.maximumQuotas && !!errors.maximumQuotas}
              helperText={touched.maximumQuotas && errors.maximumQuotas}
            />
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              id="openingHours"
              name="openingHours"
              label="Horario de apertura"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              error={touched.openingHours && !!errors.openingHours}
              helperText={touched.openingHours && errors.openingHours}
            />
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              id="price"
              name="price"
              label="Precio"
              type="number"
              error={touched.price && !!errors.price}
              helperText={touched.price && errors.price}
            />
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              id="partnerPrice"
              name="partnerPrice"
              label="Precio para socios"
              type="number"
              error={touched.partnerPrice && !!errors.partnerPrice}
              helperText={touched.partnerPrice && errors.partnerPrice}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="modeGame-label">Tipo de Juego</InputLabel>
              <Field
                as={Select}
                labelId="modeGame-label"
                id="modeGame"
                name="modeGame"
                label="Tipo de Juego"
                error={touched.modeGame && !!errors.modeGame}
              >
                {Object.values(GameMode).map((mode) => (
                  <MenuItem key={mode} value={mode}>
                    {gameModeTranslations[mode]}
                  </MenuItem>
                ))}
              </Field>
              <ErrorMessage name="modeGame" component="div" className="error-message" />
            </FormControl>

            <Box sx={{ mt: 2 }}>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/jpeg,image/png"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) {
                    setFieldValue('image', file);
                    setFieldTouched('image', true);
                  }
                }}
                style={{ display: 'none' }}
              />
              <label htmlFor="image">
                <Button variant="contained" component="span" fullWidth sx={{ mb: 1 }}>
                  {values.image && values.image instanceof File
                    ? values.image.name
                    : 'Seleccionar imagen'}
                </Button>
              </label>
              {touched.image && errors.image && (
                <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '3px' }}>
                  {typeof errors.image === 'string' ? errors.image : 'Error con la imagen'}
                </div>
              )}
            </Box>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={onClose}
                color="error"
                disabled={loading || isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading || isSubmitting}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Guardar'}
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
