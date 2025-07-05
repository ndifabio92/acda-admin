import { SxProps, Theme } from '@mui/material';

interface IStyles {
  edit: SxProps<Theme>;
  textField: SxProps<Theme>;
  container: SxProps<Theme>;
  labelContainer: SxProps<Theme>;
  contentContainer: SxProps<Theme>;
}

export const Styles: IStyles = {
  edit: {
    fontWeight: 600,
    color: 'black',
    marginBottom: 3,
    position: 'relative',
    typography: {
      backgroundColor: 'primary.100',
    },
  },
  textField: {
    width: '120px',
    mr: 1,
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '& input[type=number]': {
      MozAppearance: 'textfield',
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: 1,
    width: 'fit-content',
  },
  labelContainer: {
    bgcolor: 'primary.100',
    color: 'white',
    px: 3,
    py: 2,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  contentContainer: {
    px: 3,
    py: 2,
    display: 'flex',
    flexDirection: 'column',
  },
};
