import { FC } from 'react';
import { Divider, Typography, TypographyProps } from '@mui/material';
import { titleStyles } from './Title.styles';

interface TitleProps {
  text: string;
  variant?: TypographyProps['variant'];
}

const Title: FC<TitleProps> = ({ text, variant = 'h3' }) => {
  return (
    <>
      <Typography variant={variant} component="h1" sx={titleStyles.title}>
        {text}
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />
    </>
  );
};

export default Title;
