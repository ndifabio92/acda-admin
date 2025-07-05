import { Typography, Button, DialogActions, CircularProgress } from '@mui/material';
import Modal from './Modal';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  loading?: boolean;
};

export const ConfirmationModal = ({
  open,
  onClose,
  title,
  description,
  confirmText,
  onConfirm,
  loading = false,
}: Props) => {
  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="sm">
      <Typography variant="body1" sx={{ mb: 2 }}>
        {description}
      </Typography>
      <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
        {/* <Button variant="contained" onClick={onClose}>
          Cancelar
        </Button> */}
        <Button color="error" variant="outlined" onClick={onConfirm} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : confirmText}
        </Button>
      </DialogActions>
    </Modal>
  );
};
