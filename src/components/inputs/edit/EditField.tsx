import { Box, Typography, IconButton, TextField, Tooltip } from '@mui/material';
import { Edit, InfoOutlined, Save } from '@mui/icons-material';
import { useState } from 'react';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { Styles } from './styles';

interface Props<T> {
  label?: string;
  onSubmit: (values: { value: number }) => void;
  startDate?: string;
  validationSchema?: Yup.ObjectSchema<{ value: number }>;
  currentValue: T;
  setCurrentValue: (value: T) => void;
  canEdit?: boolean;
}

interface FormContentProps {
  isEditing: boolean;
  handleEdit: () => void;
  handleSave: (values: { value: number }) => void;
  handleKeyDown: (event: React.KeyboardEvent, values: { value: number }) => void;
  startDate?: string;
  canEdit?: boolean;
}

const FormContent = ({
  isEditing,
  handleEdit,
  handleSave,
  handleKeyDown,
  startDate,
  canEdit,
}: FormContentProps) => {
  const { values, handleChange, handleBlur, errors, touched } = useFormikContext<{
    value: number;
  }>();

  return (
    <Form
      onSubmit={(e) => {
        if (!isEditing) {
          e.preventDefault();
        }
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        {isEditing ? (
          <TextField
            type="number"
            name="value"
            value={values.value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, values)}
            size="small"
            error={touched.value && Boolean(errors.value)}
            helperText={touched.value && errors.value}
            sx={Styles.textField}
          />
        ) : (
          <Typography variant="h4" fontWeight="bold" mr={1}>
            $ {values.value || 0}
          </Typography>
        )}
        {canEdit || canEdit === undefined ? (
          <IconButton
            size="small"
            onClick={(e) => {
              e.preventDefault();
              if (isEditing) {
                handleSave(values);
              } else {
                handleEdit();
              }
            }}
            type="button"
          >
            {isEditing ? <Save fontSize="medium" /> : <Edit fontSize="medium" />}
          </IconButton>
        ) : (
          <Tooltip title="No se puede modificar antes del 11 del mes en curso.">
            <InfoOutlined color="info" fontSize="medium" />
          </Tooltip>
        )}
      </Box>
      {startDate && (
        <Typography variant="caption" color="text.secondary">
          Vigente desde el {startDate}
        </Typography>
      )}
    </Form>
  );
};

export const EditField = <T extends { value?: number }>({
  label,
  onSubmit,
  startDate,
  validationSchema,
  currentValue,
  setCurrentValue,
  canEdit,
}: Props<T>) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (values: { value: number }) => {
    if (values.value === currentValue.value) {
      setIsEditing(false);
      return;
    }

    onSubmit(values);
    if (setCurrentValue && currentValue) {
      const updatedValue = {
        ...currentValue,
        value: values.value,
      };
      setCurrentValue(updatedValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, values: { value: number }) => {
    if (event.key === 'Enter') {
      handleSave(values);
    }
  };

  return (
    <Box sx={Styles.container}>
      <Box sx={Styles.labelContainer}>
        <Typography fontWeight="bold" fontSize="1.7rem">
          {label}
        </Typography>
      </Box>

      <Box sx={Styles.contentContainer}>
        <Formik
          initialValues={{ value: currentValue.value || 0 }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
          enableReinitialize
        >
          <FormContent
            canEdit={canEdit}
            isEditing={isEditing}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleKeyDown={handleKeyDown}
            startDate={startDate}
          />
        </Formik>
      </Box>
    </Box>
  );
};
