import { SxProps, Theme } from '@mui/material';

interface TitleStyles {
  title: SxProps<Theme>;
}

export const titleStyles: TitleStyles = {
  title: {
    fontWeight: 600,
    color: 'black',
    marginBottom: 3,
    position: 'relative',
    // '&::after': {
    //   content: '""',
    //   position: 'absolute',
    //   left: 0,
    //   bottom: -8,
    //   width: 60,
    //   height: 4,
    //   backgroundColor: 'primary.main',
    //   borderRadius: 2,
    // },
  },
};
