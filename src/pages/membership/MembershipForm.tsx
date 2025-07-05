import { useState } from 'react';
import { Membership } from '../../types/api/membership';
import { Formik, Form, Field } from 'formik';
import { membershipSchema } from '../../types/validations/membership.schema';
import dayjs from 'dayjs';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { formatDateTime, formatDisplayDate } from '../../shared/utils/dateFormater';

interface Props {
  onSubmit: (data: Membership) => Promise<void>;
  onClose: () => void;
  initialMembership?: Membership | null;
}

export const MembershipForm = ({ onSubmit, onClose, initialMembership }: Props) => {
  const [loading, setLoading] = useState(false);

  const initialValues: Membership = initialMembership || {
    id: 0,
    value: 0,
    startDate: dayjs().startOf('day').toDate(),
  };

  const handleSubmitFormik = async (values: Membership) => {
    setLoading(true);
    try {
      await onSubmit(values);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik<Membership>
      initialValues={initialValues}
      validationSchema={membershipSchema}
      onSubmit={handleSubmitFormik}
    >
      {({ isSubmitting, errors, touched, handleSubmit, values, setFieldValue }) => {
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              id="startDate"
              name="startDate"
              label="Fecha"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              error={touched.startDate && !!errors.startDate}
              helperText={
                (touched.startDate && errors.startDate) || formatDisplayDate(values.startDate)
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue(
                  'startDate',
                  e.target.value ? dayjs(e.target.value).startOf('day').toDate() : null
                )
              }
              value={formatDateTime(values.startDate)}
            />
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              id="value"
              name="value"
              label="Valor"
              type="number"
              error={touched.value && !!errors.value}
              helperText={touched.value && errors.value}
            />
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
